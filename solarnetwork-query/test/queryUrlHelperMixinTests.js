import test from 'ava';

import UrlHelper from 'net/urlHelper';
import QueryUrlHelperMixin  from 'queryUrlHelperMixin';
import { SolarQueryPathKey, SolarQueryPublicPathKey } from 'queryUrlHelperMixin';

class QueryUrlHelper extends QueryUrlHelperMixin(UrlHelper) {

}

test('query:queryUrlHelperMixin:create', t => {
	const helper = new QueryUrlHelper();
	t.truthy(helper);
});

test('query:queryUrlHelperMixin:baseUrl', t => {
	const helper = new QueryUrlHelper();
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/solarquery/api/v1/sec');
});

test('query:queryUrlHelperMixin:baseUrl:customEnvironment', t => {
    const env = {};
    env[SolarQueryPathKey] = '/fooquery';
    env[SolarQueryPublicPathKey] = true;
	const helper = new QueryUrlHelper(env);
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/fooquery/api/v1/pub');

    helper.env(SolarQueryPublicPathKey, false);
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/fooquery/api/v1/sec');
});
