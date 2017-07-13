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

test('user:userUrlHelperMixin:viewPendingNodesUrl', t => {
	const helper = new UserUrlHelper();
	t.is(helper.viewPendingNodesUrl(), 'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes/pending');
});

test('user:userUrlHelperMixin:viewArchivedNodesUrl', t => {
	const helper = new UserUrlHelper();
	t.is(helper.viewArchivedNodesUrl(), 'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes/archived');
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

test('user:userUrlHelperMixin:updateNodeArchivedStatusUrl', t => {
	const helper = new UserNodeUrlHelper();
	helper.nodeId = 123;
	t.is(helper.updateNodeArchivedStatusUrl(), 
		'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes/archived?'
		+'nodeIds=123&archived=false');
	t.is(helper.updateNodeArchivedStatusUrl(234), 
		'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes/archived?'
		+'nodeIds=234&archived=false');
	t.is(helper.updateNodeArchivedStatusUrl([234, 456]), 
		'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes/archived?'
		+'nodeIds=234,456&archived=false');
	t.is(helper.updateNodeArchivedStatusUrl(234, true), 
		'https://data.solarnetwork.net/solaruser/api/v1/sec/nodes/archived?'
		+'nodeIds=234&archived=true');
});
