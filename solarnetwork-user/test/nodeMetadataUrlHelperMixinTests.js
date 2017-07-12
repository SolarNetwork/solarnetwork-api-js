'use strict';

import test from 'ava';

import { NodeMetadataUrlHelper } from 'nodeMetadataUrlHelperMixin'

test('user:nodeMetadataUrlHelperMixin:create', t => {
	const helper = new NodeMetadataUrlHelper();
	t.truthy(helper);
});

test('user:userNodeUrlHelperMixin:viewNodeMetadataUrl', t => {
	const helper = new NodeMetadataUrlHelper();
	helper.nodeId = 123;
	t.is(helper.viewNodeMetadataUrl(), 
		'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes/meta/123');
	t.is(helper.viewNodeMetadataUrl(234), 
		'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes/meta/234');
});
