import test from 'ava';

import { NodeDatumUrlHelper } from 'datum/nodeDatumUrlHelperMixin';

test('query:nodeDatumUrlHelperMixin:create', t => {
	const helper = new NodeDatumUrlHelper();
	t.truthy(helper);
});

test('query:nodeDatumUrlHelperMixin:baseUrl', t => {
	const helper = new NodeDatumUrlHelper();
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/solarquery/api/v1/sec');
});

test('query:nodeDatumUrlHelperMixin:reportableintervalUrl', t => {
    const helper = new NodeDatumUrlHelper();
    helper.nodeId = 123;

    t.is(helper.reportableIntervalUrl(),
        'https://data.solarnetwork.net/solarquery/api/v1/sec/range/interval'
            +'?nodeId=123');

    t.is(helper.reportableIntervalUrl(null, 234),
        'https://data.solarnetwork.net/solarquery/api/v1/sec/range/interval'
            +'?nodeId=234',
        'argument node ID used');        
});

test('query:nodeDatumUrlHelperMixin:reportableintervalUrl:sources', t => {
    const helper = new NodeDatumUrlHelper();
    helper.nodeId = 123;
    helper.sourceId = 'abc';

    t.is(helper.reportableIntervalUrl(),
        'https://data.solarnetwork.net/solarquery/api/v1/sec/range/interval'
        +'?nodeId=123&sourceIds=abc');

    t.is(helper.reportableIntervalUrl([]),
        'https://data.solarnetwork.net/solarquery/api/v1/sec/range/interval'
            +'?nodeId=123',
        'argument empty source IDs used');        

    t.is(helper.reportableIntervalUrl(['one','two']),
        'https://data.solarnetwork.net/solarquery/api/v1/sec/range/interval'
            +'?nodeId=123&sourceIds=one,two',
        'argument source IDs used');        

    t.is(helper.reportableIntervalUrl(['&one','=two']),
        'https://data.solarnetwork.net/solarquery/api/v1/sec/range/interval'
            +'?nodeId=123&sourceIds=%26one,%3Dtwo',
        'source IDs URI escaped');        
});
