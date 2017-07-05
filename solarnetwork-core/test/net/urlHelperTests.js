'use strict';

import test from 'ava';

import UrlHelper from 'net/urlHelper';

test('core:net:urlHelper:create', t => {
	const helper = new UrlHelper();
	t.truthy(helper);
});

test('core:net:urlHelper:hostURL', t => {
    const helper = new UrlHelper();
    t.is(helper.hostUrl(), 'https://data.solarnetwork.net');
});
