import MultiMap from 'multiMap';
import Hex from 'crypto-js/enc-hex';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import SHA256 from 'crypto-js/sha256';
import Environment from 'net/environment';
import { HttpMethod, default as HttpHeaders } from 'net/httpHeaders';

class AuthorizationV2Builder {
	constructor(token, environment) {
		this.tokenId = token;
		this.environment = (environment || new Environment());
		this.reset();
	}

	reset() {
		this.contentSHA256 = null;
		this.httpHeaders = new HttpHeaders();
		this.parameters = new MultiMap();
		this.signedHeaderNames = [];
		var host = this.environment.host;
		if ( this.environment.protocol === 'https' || this.environment.port != 80 ) {
			host += ':' +this.environment.port;
		}
		return this.method(HttpMethod.GET).host(host).path('/').date(new Date());
	}

	/**
	 * Set the HTTP method (verb) to use.
	 *
	 * @param val {String} the method to use; see the {@code HttpMethod} enum for possible values
	 * @return this object
	 */
	method(val) {
		this.httpMethod = val;
		return this;
	}

	/**
	 * Set the HTTP host.
	 *
	 * This is a shortcut for calling {@code HttpHeaders#put(HttpHeaders.HOST, val)}.
	 *
	 * @param val {String} the HTTP host value to use
	 * @return this object
	 */
	host(val) {
		this.httpHeaders.put(HttpHeaders.HOST, val);
		return this;
	}

	/**
	 * Set the HTTP request path to use.
	 *
	 * @param val {String} the request path to use
	 * @return this object
	 */
	path(val) {
		this.requestPath = val;
		return this;
	}

	/**
	 * Set the HTTP content type.
	 *
	 * This is a shortcut for calling {@code HttpHeaders#put(HttpHeaders.CONTENT_TYPE, val)}.
	 *
	 * @param val {String} the HTTP content type value to use
	 * @return this object
	 */
	contentType(val) {
		this.httpHeaders.put(HttpHeaders.CONTENT_TYPE, val);
		return this;
	}

	/**
	 * Set the authorization date.
	 *
	 * @param val {Date} the date to use; typically the current time, e.g. {@code new Date()}
	 * @return this object
	 */
	date(val) {
		this.requestDate = (val ? val : new Date());
		return this;
	}

	canonicalQueryParameters() {
		// TODO
		return '';
	}

	canonicalHeaders(sortedLowercaseHeaderNames) {
		var result = '',
			headerName,
			headerValue;
		const len = sortedLowercaseHeaderNames.length;
		for ( let i = 0; i < len; i += 1 ) {
			headerName = sortedLowercaseHeaderNames[i];
			if ( "date" === headerName ||  "x-sn-date" === headerName ) {
				headerValue = this.requestDate.toUTCString();
			} else {
				headerValue = this.httpHeaders.firstValue(headerName);
			}
			result += headerName +':' + (headerValue ? headerValue.trim() : '') + '\n';
		}
		return result;
	}

	canonicalSignedHeaderNames(sortedLowercaseHeaderNames) {
		return sortedLowercaseHeaderNames.join(';');
	}

	canonicalContentSHA256() {
		// TODO
		return AuthorizationV2Builder.EMPTY_STRING_SHA256_HEX;
	}

	canonicalHeaderNames() {
		return sortedHeaderNames(this.httpHeaders, this.signedHeaderNames);
	}

	buildCanonicalRequestData() {
		return this.computeCanonicalRequestData(this.canonicalHeaderNames());
	}

	computeCanonicalRequestData(sortedLowercaseHeaderNames) {
		// 1: HTTP verb
		var result = this.httpMethod +'\n';

		// 2: Canonical URI
		result += this.requestPath + '\n';

		// 3: Canonical query string
		result += this.canonicalQueryParameters() + '\n';

		// 4: Canonical headers
		result += this.canonicalHeaders(sortedLowercaseHeaderNames); // already includes newline

		// 5: Signed header names
		result += this.canonicalSignedHeaderNames(sortedLowercaseHeaderNames) + '\n';

		// 6: Content SHA256, hex encoded
		result += this.canonicalContentSHA256();

		return result;
	}

	computeSigningKey(secretKey) {
		const dateString = iso8601Date(this.requestDate);
		const key = HmacSHA256('snws2_request', HmacSHA256(dateString, 'SNWS2' + secretKey));
		return key;
	}

	computeSignatureData(canonicalRequestData) {
		/*- signature data is like:

		 	SNWS2-HMAC-SHA256\n
		 	20170301T120000Z\n
		 	Hex(SHA256(canonicalRequestData))
		*/
		return "SNWS2-HMAC-SHA256\n" + iso8601Date(this.requestDate, true) + "\n"
				+ Hex.stringify(SHA256(canonicalRequestData));
	}

	build(tokenSecret) {
		const sortedHeaderNames = this.canonicalHeaderNames();
		const theSigningKey = this.computeSigningKey(tokenSecret);
		const canonicalReq = this.computeCanonicalRequestData(sortedHeaderNames);
		const signatureData = this.computeSignatureData(canonicalReq);
		const signature = Hex.stringify(HmacSHA256(signatureData, theSigningKey));
		var result = 'SNWS2 Credential=' + this.tokenId
			+ ',SignedHeaders=' + sortedHeaderNames.join(';')
			+ ',Signature=' +signature;
		return result;
	}
}

function lowercaseSortedArray(headerNames) {
	const sortedHeaderNames = [];
	const len = headerNames.length;
	for ( let i = 0; i < len; i += 1 ) {
		sortedHeaderNames.push(headerNames[i].toLowerCase());
	}
	sortedHeaderNames.sort();
	return sortedHeaderNames;
}

function sortedHeaderNames(httpHeaders, signedHeaderNames) {
	var headerNames = [];
	headerNames.push(HttpHeaders.HOST);
	if ( httpHeaders.containsKey("X-SN-Date") ) {
		headerNames.push("X-SN-Date");
	} else {
		headerNames.push("Date");
	}
	if ( httpHeaders.containsKey("Content-MD5") ) {
		headerNames.push("Content-MD5");
	}
	if ( httpHeaders.containsKey(HttpHeaders.CONTENT_TYPE) ) {
		headerNames.push(HttpHeaders.CONTENT_TYPE);
	}
	if ( httpHeaders.containsKey("Digest") ) {
		headerNames.push("Digest");
	}
	if ( signedHeaderNames ) {
		headerNames = headerNames.concat(signedHeaderNames);
	}
	return lowercaseSortedArray(headerNames);
}

function iso8601Date(date, includeTime) {
	return ''+date.getUTCFullYear()
			+(date.getUTCMonth() < 9 ? '0' : '') +(date.getUTCMonth()+1)
			+(date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate()
			+(includeTime ?
				'T'
				+(date.getUTCHours() < 10 ? '0' : '') + date.getUTCHours()
				+(date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes()
				+(date.getUTCSeconds() < 10 ? '0' : '') +date.getUTCSeconds()
				+'Z'
				: '');
}

Object.defineProperties(AuthorizationV2Builder, {
	EMPTY_STRING_SHA256_HEX: { value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
});

export default AuthorizationV2Builder;
