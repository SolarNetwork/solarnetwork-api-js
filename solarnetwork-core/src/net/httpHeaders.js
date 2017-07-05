import MultiMap from 'multiMap';

const HttpMethod = Object.freeze({
	GET: 'GET',
	HEAD: 'HEAD',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
	OPTIONS: 'OPTIONS',
	TRACE: 'TRACE',
});

class HttpHeaders extends MultiMap {
	constructor() {
		super();
	}

}

Object.defineProperties(HttpHeaders, {
	'CONTENT_MD5':		{ value: 'Content-MD5' },
	'CONTENT_TYPE': 	{ value: 'Content-Type' },
	'DATE':				{ value: 'Date' },
	'DIGEST':			{ value: 'Digest' },
	'HOST': 			{ value: 'Host' },
	'X_SN_DATE': 		{ value: 'X-SN-Date' },
});

export { HttpMethod };
export default HttpHeaders;
