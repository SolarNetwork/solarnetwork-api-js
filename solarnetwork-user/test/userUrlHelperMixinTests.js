'use strict';

import test from 'ava';

import UrlHelper from 'net/urlHelper';
import NodeUrlHelperMixin from 'net/nodeUrlHelperMixin'
import UserUrlHelperMixin from 'userUrlHelperMixin'

class UserUrlHelper extends UserUrlHelperMixin(UrlHelper) {

}

test('user:userUrlHelperMixin:create', t => {
	const helper = new UserUrlHelper();
	t.truthy(helper);
});

test('user:userUrlHelperMixin:baseUrl', t => {
	const helper = new UserUrlHelper();
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/solaruser/api/v1/sec');
});

test('user:userUrlHelperMixin:viewNodesUrl', t => {
	const helper = new UserUrlHelper();
	t.is(helper.viewNodesUrl(), 'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes');
});

class UserNodeUrlHelper extends UserUrlHelperMixin(NodeUrlHelperMixin(UrlHelper)) {
	
}

test('user:userNodeUrlHelperMixin:baseUrl', t => {
	const helper = new UserNodeUrlHelper();
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/solaruser/api/v1/sec');
});

test('user:userNodeUrlHelperMixin:nodeId', t => {
	const helper = new UserNodeUrlHelper();
	helper.nodeId = 123;
	t.deepEqual(helper.nodeIds, [123]);
});
