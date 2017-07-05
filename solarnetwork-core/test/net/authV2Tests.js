'use strict';

import test from 'ava';

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
	t.is(canonicalRequestData, "GET\n/api/test\n\ndate:Tue, 25 Apr 2017 14:30:00 GMT\nhost:localhost\ndate;host\n"
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
