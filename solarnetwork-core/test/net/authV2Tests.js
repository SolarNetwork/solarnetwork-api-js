'use strict';

import test from 'ava';

import Base64 from 'crypto-js/enc-base64';
import Hex from 'crypto-js/enc-hex';
import SHA256 from 'crypto-js/sha256';
import { HttpMethod, default as HttpHeaders } from 'net/httpHeaders';

import AuthV2 from 'net/authV2';

const TEST_TOKEN_ID = 'test-token-id';
const TEST_TOKEN_SECRET = 'test-token-secret'

function getTestDate() {
	return new Date('Tue, 25 Apr 2017 14:30:00 GMT');
}

test('core:net:authV2:simpleGet', t => {
	const builder = new AuthV2(TEST_TOKEN_ID);
	builder.date(getTestDate()).host('localhost').path('/api/test');

	const canonicalRequestData = builder.buildCanonicalRequestData();
	t.is(canonicalRequestData,
		"GET\n/api/test\n\ndate:Tue, 25 Apr 2017 14:30:00 GMT\nhost:localhost\ndate;host\n"
		+ AuthV2.EMPTY_STRING_SHA256_HEX);

	const result = builder.build(TEST_TOKEN_SECRET);
	t.is(result, "SNWS2 Credential=test-token-id,SignedHeaders=date;host,Signature=4739139d3d370f147b6585795c309b1c6d7d7f59943081f7dd943f689cfa59a3");
});

test('core:net:authV2:xSnDate', t => {
	const reqDate = getTestDate();
	const builder = new AuthV2(TEST_TOKEN_ID);
	builder.date(reqDate).host('localhost').path('/api/test').header('X-SN-Date', reqDate.toUTCString());

	const canonicalRequestData = builder.buildCanonicalRequestData();
	t.is(canonicalRequestData,
		"GET\n/api/test\n\nhost:localhost\nx-sn-date:Tue, 25 Apr 2017 14:30:00 GMT\nhost;x-sn-date\n"
		+ AuthV2.EMPTY_STRING_SHA256_HEX);

	const result = builder.build(TEST_TOKEN_SECRET);
	t.is(result, "SNWS2 Credential=test-token-id,SignedHeaders=host;x-sn-date,Signature=c14fe9f67560fb9a37d2aa7c40b40c260a5936f999877e2469b8ddb1da7c0eb9");
});

test('core:net:authV2:queryParams', t => {
	const reqDate = getTestDate();
	const params = {foo: 'bar', bim: 'bam'};

	const builder = new AuthV2(TEST_TOKEN_ID);
	builder.date(reqDate).host('localhost').path('/api/query').queryParams(params);

	const canonicalRequestData = builder.buildCanonicalRequestData();
	t.is(canonicalRequestData,
		"GET\n/api/query\nbim=bam&foo=bar\ndate:Tue, 25 Apr 2017 14:30:00 GMT\nhost:localhost\ndate;host\n"
		+ AuthV2.EMPTY_STRING_SHA256_HEX);

	const result = builder.build(TEST_TOKEN_SECRET);
	t.is(result, "SNWS2 Credential=test-token-id,SignedHeaders=date;host,Signature=c597ed8061d9d12e12ead3d8d6fc03b28a877e8639548f31556b4760be09a4b8");
});

test('core:net:authV2:simplePost', t => {
	const reqDate = getTestDate();
	const reqBodySha256Hex = "226e49e13d16e5e8aa0d62e58cd63361bf097d3e2b2444aa3044334628a2e8de";
	const reqBodySha256 = Hex.parse(reqBodySha256Hex);
	const reqBodySha256Base64 = Base64.stringify(reqBodySha256);

	const builder = new AuthV2(TEST_TOKEN_ID);
	builder.date(reqDate).host("localhost").method(HttpMethod.POST).path("/api/post")
			.header(HttpHeaders.DIGEST, "sha-256=" + reqBodySha256Base64)
			.header(HttpHeaders.CONTENT_TYPE, 'application/json;charset=UTF-8')
			.contentSHA256(reqBodySha256);

	const canonicalRequestData = builder.buildCanonicalRequestData();
	t.is(canonicalRequestData,
		"POST\n/api/post\n\ncontent-type:application/json;charset=UTF-8\n"
		+ "date:Tue, 25 Apr 2017 14:30:00 GMT\n"
		+ "digest:sha-256=" + reqBodySha256Base64
		+ "\nhost:localhost\ncontent-type;date;digest;host\n" + reqBodySha256Hex);

	const result = builder.build(TEST_TOKEN_SECRET);
	t.is(result, "SNWS2 Credential=test-token-id,SignedHeaders=content-type;date;digest;host,Signature=ad609dd757c1f7f08a519919ab5e109ec61477cf612c6a0d29cac66d54c3987e");
});
