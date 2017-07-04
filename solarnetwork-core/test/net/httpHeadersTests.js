'use strict';

import test from 'ava';

import HttpHeaders from 'net/httpHeaders';

test('core:net:httpHeaders:create', t => {
	const headers = new HttpHeaders();
	t.truthy(headers);
});

test('core:net:httpHeaders:constants', t => {
	t.is(HttpHeaders.CONTENT_TYPE, 'Content-Type');
	t.is(HttpHeaders.HOST, 'Host');
});
