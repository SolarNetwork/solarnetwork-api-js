'use strict';

import test from 'ava';

import Environment from 'environment'

test('core:environment:create', t => {
	const env = new Environment();
	t.truthy(env);
	t.is(env.protocol(), 'https');
	t.is(env.host(), 'data.solarnetwork.net');
});

test('core:environment:createWithConfig', t => {
	const env = new Environment({host:'example.com', protocol:'http'});
	t.truthy(env);
	t.is(env.protocol(), 'http');
	t.is(env.host(), 'example.com');
});
