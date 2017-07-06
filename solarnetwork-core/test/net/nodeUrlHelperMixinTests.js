'use strict';

import test from 'ava';

import UrlHelper from 'net/urlHelper';
import NodeUrlHelperMixin from 'net/nodeUrlHelperMixin';

class NodeUrlHelper extends NodeUrlHelperMixin(UrlHelper) {

}

test('core:net:nodeUrlHelperMixin:create', t => {
	const helper = new NodeUrlHelper();
	t.truthy(helper);
});

test('core:net:nodeUrlHelperMixin:nodeId', t => {
	const helper = new NodeUrlHelper();
	helper.nodeId = 123;
	t.is(helper.nodeId, 123);
});

test('core:net:nodeUrlHelperMixin:nodeIds', t => {
    const helper = new NodeUrlHelper();
	helper.nodeIds = [123, 234];
	t.is(helper.nodeId, 123);
	t.deepEqual(helper.nodeIds, [123, 234]);
});

test('core:net:nodeUrlHelperMixin:nodeIds:resetNodeId', t => {
	const helper = new NodeUrlHelper();
	helper.nodeIds = [123, 234];
	t.deepEqual(helper.nodeIds, [123, 234]);
	helper.nodeId = 456;
	t.deepEqual(helper.nodeIds, [456], 'nodeIds array reset to just nodeId');
});
