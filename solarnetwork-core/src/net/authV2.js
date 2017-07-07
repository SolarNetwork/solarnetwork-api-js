import MultiMap from 'multiMap';
import Hex from 'crypto-js/enc-hex';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import SHA256 from 'crypto-js/sha256';
import Environment from 'net/environment';
import { HttpMethod, default as HttpHeaders } from 'net/httpHeaders';
import { urlQueryParse } from 'net/urlQuery';
import { parse as uriParse } from 'uri-js';

/**
 * A builder object for the SNWS2 HTTP authorization scheme.
 *

 * @class
 * @preserve
 */
class AuthorizationV2Builder {
	constructor(token, environment) {
		this.tokenId = token;
		this.environment = (environment || new Environment());
		this.reset();
	}

	reset() {
		this.contentDigest = null;
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
	 * Compute and cache the signing key.
	 *
	 * Signing keys are derived from the token secret and valid for 7 days, so
	 * this method can be used to compute a signing key so that {@link #build()}
	 * can be called later. The signing date will be set to whatever date is
	 * currently configured via {@link #date(Date)}, which defaults to the
	 * current time for newly created builder instances.
	 *
	 * @param {String} tokenSecret the secret to sign the digest with
	 * @return this object
	 */
	saveSigningKey(tokenSecret) {
		this.signingKey = this.computeSigningKey(tokenSecret);
		return this;
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
	 * Set the host, path, and query parameters via a URL string.
	 * 
	 * @param {string} url the URL value to use
	 */
	url(url) {
		const uri = uriParse(url);
		let host = uri.host;
		if ( uri.scheme === 'https' || (uri.port && uri.port !== 80) ) {
			host += ':' + (uri.port || '443');
		}
		if ( uri.query ) {
			this.queryParams(urlQueryParse(uri.query));
		}
		return this.host(host).path(uri.path);
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
	 * Set the authorization request date.
	 *
	 * @param val {Date} the date to use; typically the current time, e.g. {@code new Date()}
	 * @return this object
	 */
	date(val) {
		this.requestDate = (val ? val : new Date());
		return this;
	}

	/**
	 * Get the authorization request date as a HTTP header value.
	 * 
	 * @returns {string} the request date as a string
	 */
	get requestDateHeaderValue() {
		return this.requestDate.toUTCString();
	}

	/**
	 * Set a HTTP header value.
	 *
	 * This is a shortcut for calling {@code HttpHeaders#put(headerName, val)}.
	 *
	 * @param {String} headerName the header name to set
	 * @param {String} headerValue the header value to set
	 * @return this object
	 */
	header(headerName, headerValue) {
		this.httpHeaders.put(headerName, headerValue);
		return this;
	}

	/**
	 * Set the HTTP headers to use with the request.
	 *
	 * The headers object must include all headers necessary by the
	 * authentication scheme, and any additional headers also configured via
	 * {@link #signedHttpHeaders(signedHeaderNames)}.
	 *
	 * @param {HttpHeaders} headers the HTTP headers to use
	 * @return this object
	 */
	headers(headers) {
		this.httpHeaders = headers;
		return this;
	}

	/**
	 * Set the HTTP {@code GET} query parameters, or {@code POST} form-encoded
	 * parameters.
	 *
	 * @param {Object} params the parameters to use, as either a {@code MultiMap} or simple {@code Object}
	 * @return this object
	 */
	queryParams(params) {
		if ( params instanceof MultiMap ) {
			this.parameters = params;
		} else {
			this.parameters.putAll(params);
		}
		return this;
	}

	/**
	 * Set additional HTTP header names to sign with the authentication.
	 *
	 * @param {Array} signedHeaderNames additional HTTP header names to include in the signature
	 * @return this object
	 */
	signedHttpHeaders(signedHeaderNames) {
		this.signedHeaderNames = signedHeaderNames;
		return this;
	}

	/**
	 * Set the HTTP request body content SHA-256 digest value.
	 *
	 * @param {String|WordArray} digest the digest value to use; if a String it is assumed to be Hex encoded
	 * @return this object
	 */
	contentSHA256(digest) {
		var contentDigest;
		if ( typeof digest === 'string' ) {
			contentDigest = Hex.parse(digest);
		} else {
			contentDigest = digest;
		}
		this.contentDigest = contentDigest;
		return this;
	}

	canonicalQueryParameters() {
		const keys = this.parameters.keySet();
		if ( keys.length < 1 ) {
			return '';
		}
		keys.sort();
		const len = keys.length;
		var first = true,
			result = '';
		for ( let i = 0; i < len; i += 1 ) {
			let key = keys[i];
			let vals = this.parameters.value(key);
			const valsLen = vals.length;
			for ( let j = 0; j < valsLen; j += 1 ) {
				if ( first ) {
					first = false;
				} else {
					result += '&';
				}
				result += _encodeURIComponent(key) + '=' + _encodeURIComponent(vals[j]);
			}
		}
		return result;
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
		return (this.contentDigest
			? Hex.stringify(this.contentDigest)
			: AuthorizationV2Builder.EMPTY_STRING_SHA256_HEX);
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

    buildWithKey(theSigningKey) {
        const sortedHeaderNames = this.canonicalHeaderNames();
        const canonicalReq = this.computeCanonicalRequestData(sortedHeaderNames);
        const signatureData = this.computeSignatureData(canonicalReq);
        const signature = Hex.stringify(HmacSHA256(signatureData, theSigningKey));
        let result = 'SNWS2 Credential=' + this.tokenId
            + ',SignedHeaders=' + sortedHeaderNames.join(';')
            + ',Signature=' +signature;
        return result;
    }

    /**
     * Compute a HTTP {@code Authorization} header value from the configured
     * properties on the builder, computing a new signing key based on the
	 * configured {@link #date(Date)}.
     *
     * @return the SNWS2 HTTP Authorization header value.
	 * @preserve
     */
	build(tokenSecret) {
        const theSigningKey = this.computeSigningKey(tokenSecret);
        return this.buildWithKey(theSigningKey);
	}


	/**
	 * Compute a HTTP {@code Authorization} header value from the configured
	 * properties on the builder, using a signing key configured from a previous
	 * call to {@link #saveSigningKey(String)}.
	 *
	 * @return the SNWS2 HTTP Authorization header value.
	 * @preserve
	 */
	buildWithSavedKey() {
		return this.buildWithKey(this.signingKey);
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
	if ( httpHeaders.containsKey(HttpHeaders.X_SN_DATE) ) {
		headerNames.push(HttpHeaders.X_SN_DATE);
	} else {
		headerNames.push(HttpHeaders.DATE);
	}
	if ( httpHeaders.containsKey(HttpHeaders.CONTENT_MD5) ) {
		headerNames.push(HttpHeaders.CONTENT_MD5);
	}
	if ( httpHeaders.containsKey(HttpHeaders.CONTENT_TYPE) ) {
		headerNames.push(HttpHeaders.CONTENT_TYPE);
	}
	if ( httpHeaders.containsKey(HttpHeaders.DIGEST) ) {
		headerNames.push(HttpHeaders.DIGEST);
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

function _hexEscapeChar(c) {
	return '%' + c.charCodeAt(0).toString(16);
}

function _encodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, _hexEscapeChar);
}

Object.defineProperties(AuthorizationV2Builder, {
	EMPTY_STRING_SHA256_HEX: 	{ value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
	SNWS2_AUTH_SCHEME: 			{ value: 'SNWS2' },
});

export default AuthorizationV2Builder;
