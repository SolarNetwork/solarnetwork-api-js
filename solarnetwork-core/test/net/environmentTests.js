'use strict';

import test from 'ava';

import Environment from 'net/environment'

test('core:net:environment:create', t => {
	const env = new Environment();
	t.truthy(env);
	t.is(env.protocol, 'https');
	t.is(env.host, 'data.solarnetwork.net');
	t.is(env.port, 443);
});

test('core:net:environment:createWithConfig', t => {
	const env = new Environment({host:'example.com', protocol:'http'});
	t.truthy(env);
	t.is(env.protocol, 'http');
	t.is(env.host, 'example.com');
	t.is(env.port, 80);
});

test('core:net:environment:useTls', t => {
    const env = new Environment();
    t.true(env.useTls());
    env.protocol = 'http';
    t.false(env.useTls());
});

