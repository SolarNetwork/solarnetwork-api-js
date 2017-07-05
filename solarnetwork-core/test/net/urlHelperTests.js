'use strict';

import test from 'ava';

import Environment from 'net/environment';
import UrlHelper from 'net/urlHelper';

test('core:net:urlHelper:create', t => {
	const helper = new UrlHelper();
	t.truthy(helper);
});

test('core:net:urlHelper:hostUrl', t => {
    const helper = new UrlHelper();
    t.is(helper.hostUrl(), 'https://data.solarnetwork.net');
});

test('core:net:nodeUrlHelper:hostUrl:http', t => {
    const env = new Environment({
			protocol: 'http',
		});
	const helper = new UrlHelper(env);
    t.is(helper.hostUrl(), 'http://data.solarnetwork.net');
});

test('core:net:nodeUrlHelper:hostUrl:customHost', t => {
    const env = new Environment({
			host: 'foo.example.com:8443',
		});
	const helper = new UrlHelper(env);
    t.is(helper.hostUrl(), 'https://foo.example.com:8443');
});

test('core:net:nodeUrlHelper:hostUrl:customPort', t => {
    const env = new Environment({
			port: 8443,
		});
	const helper = new UrlHelper(env);
    t.is(helper.hostUrl(), 'https://data.solarnetwork.net:8443');
});

test('core:net:nodeUrlHelper:resolveTemplateUrl', t => {
    const result = UrlHelper.resolveTemplateUrl('/some/{mode}/path?foo={foo}', {
        mode: 'crazy',
        foo: 'bar',
    });
    t.is(result, '/some/crazy/path?foo=bar');
});

test('core:net:nodeUrlHelper:resolveTemplateUrl:uirEncoded', t => {
    const result = UrlHelper.resolveTemplateUrl('/some/{mode}/path?foo={foo}', {
        mode: 'crazy/cool',
        foo: 'bar&grille',
    });
    t.is(result, '/some/crazy%2Fcool/path?foo=bar%26grille');
});
