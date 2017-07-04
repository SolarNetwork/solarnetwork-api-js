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
	'CONTENT_TYPE': 	{ value: 'Content-Type' },
	'HOST': 			{ value: 'Host' },
});

export { HttpMethod };
export default HttpHeaders;
