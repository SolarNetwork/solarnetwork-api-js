'use strict';

import test from 'ava';

import UrlHelper from 'net/urlHelper';
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

