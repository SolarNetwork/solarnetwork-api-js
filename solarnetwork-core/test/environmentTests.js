'use strict';

import test from 'ava';

import environment from 'environment'

test('core:environment:create', t => {
	const env = environment();
	t.truthy(env);
});
