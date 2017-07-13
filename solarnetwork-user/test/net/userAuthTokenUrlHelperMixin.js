'use strict';

import test from 'ava';

import UrlHelper from 'net/urlHelper';
import UserUrlHelperMixin from 'net/userUrlHelperMixin'
import UserAuthTokenUrlHelperMixin from 'net/userAuthTokenUrlHelperMixin'

class UserAuthTokenUrlHelper extends UserAuthTokenUrlHelperMixin(UserUrlHelperMixin(UrlHelper)) {

}

test('user:userAuthTokenUrlHelperMixin:create', t => {
	const helper = new UserAuthTokenUrlHelper();
	t.truthy(helper);
});
