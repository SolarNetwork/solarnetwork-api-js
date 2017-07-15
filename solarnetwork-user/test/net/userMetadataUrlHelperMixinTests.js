import test from 'ava';

import { UserMetadataUrlHelper } from 'net/userMetadataUrlHelperMixin'

test('user:net:userUrlHelperMixin:create', t => {
	const helper = new UserMetadataUrlHelper();
	t.truthy(helper);
});

test('user:net:viewUserMetadataUrl:noUser', t => {
	const helper = new UserMetadataUrlHelper();
	const result = helper.viewUserMetadataUrl();
	t.is(result, 'https://data.solarnetwork.net/solaruser/api/v1/sec/users/meta');
});

test('user:net:viewUserMetadataUrl:helperUser', t => {
	const helper = new UserMetadataUrlHelper();
	helper.userId = 123;
	const result = helper.viewUserMetadataUrl();
	t.is(result, 'https://data.solarnetwork.net/solaruser/api/v1/sec/users/meta?userId=123');
});

test('user:net:viewUserMetadataUrl:helperUsers', t => {
	const helper = new UserMetadataUrlHelper();
	helper.userIds = [123, 234];
	const result = helper.viewUserMetadataUrl();
	t.is(result, 'https://data.solarnetwork.net/solaruser/api/v1/sec/users/meta?userIds=123,234');
});

test('user:net:viewUserMetadataUrl:argOverridesHelperUsers', t => {
	const helper = new UserMetadataUrlHelper();
	helper.userId = 123;
	const result = helper.viewUserMetadataUrl(234);
	t.is(result, 'https://data.solarnetwork.net/solaruser/api/v1/sec/users/meta?userId=234');
});

test('user:net:viewUserMetadataUrl:argUsers', t => {
	const helper = new UserMetadataUrlHelper();
	const result = helper.viewUserMetadataUrl([123, 234]);
	t.is(result, 'https://data.solarnetwork.net/solaruser/api/v1/sec/users/meta?userIds=123,234');
});

test('user:net:viewUserMetadataUrl:argUsers', t => {
	const helper = new UserMetadataUrlHelper();
	helper.userId = 123;
	const result = helper.viewUserMetadataUrl(null);
	t.is(result, 'https://data.solarnetwork.net/solaruser/api/v1/sec/users/meta');
});
