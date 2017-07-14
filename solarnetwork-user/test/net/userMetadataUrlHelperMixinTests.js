import test from 'ava';

import { UserMetadataUrlHelper } from 'net/userMetadataUrlHelperMixin'

test('user:net:userUrlHelperMixin:create', t => {
	const helper = new UserMetadataUrlHelper();
	t.truthy(helper);
});
