import test from 'ava';

import Pagination from 'pagination';
import SortDescriptor from 'sortDescriptor';

import { DatumMetadataUrlHelper } from 'net/datumMetadataUrlHelperMixin'

test('core:net:datumMetadataUrlHelperMixin:create', t => {
	const helper = new DatumMetadataUrlHelper();
	t.truthy(helper);
});

test('core:net:datumMetadataUrlHelperMixin:viewDatumMetadataUrl:empty', t => {
    const helper = new DatumMetadataUrlHelper();
    const result = helper.viewDatumMetadataUrl();
	t.is(result, 'https://data.solarnetwork.net/solarquery/api/v1/sec/datum/meta/null');
});

test('core:net:datumMetadataUrlHelperMixin:viewDatumMetadataUrl:nodeIdParam', t => {
	const helper = new DatumMetadataUrlHelper();
	helper.nodeId = 123;
    const result = helper.viewDatumMetadataUrl();
	t.is(result, 'https://data.solarnetwork.net/solarquery/api/v1/sec/datum/meta/123');
});

test('core:net:datumMetadataUrlHelperMixin:viewDatumMetadataUrl:nodeIdArgOverrideParam', t => {
	const helper = new DatumMetadataUrlHelper();
	helper.nodeId = 123;
    const result = helper.viewDatumMetadataUrl(234);
	t.is(result, 'https://data.solarnetwork.net/solarquery/api/v1/sec/datum/meta/234');
});

test('core:net:datumMetadataUrlHelperMixin:viewDatumMetadataUrl:sourceIdParam', t => {
	const helper = new DatumMetadataUrlHelper();
	helper.sourceId = 'foo';
    const result = helper.viewDatumMetadataUrl();
	t.is(result, 'https://data.solarnetwork.net/solarquery/api/v1/sec/datum/meta/null?sourceId=foo');
});

test('core:net:datumMetadataUrlHelperMixin:viewDatumMetadataUrl:nodeAndSourceIdParams', t => {
	const helper = new DatumMetadataUrlHelper();
	helper.nodeId = 123;
	helper.sourceId = 'foo';
    const result = helper.viewDatumMetadataUrl();
	t.is(result, 'https://data.solarnetwork.net/solarquery/api/v1/sec/datum/meta/123?sourceId=foo');
});

test('core:net:datumMetadataUrlHelperMixin:viewDatumMetadataUrl:sourceIdArgOverrideParam', t => {
	const helper = new DatumMetadataUrlHelper();
	helper.sourceId = 'foo';
    const result = helper.viewDatumMetadataUrl(123, 'bar');
	t.is(result, 'https://data.solarnetwork.net/solarquery/api/v1/sec/datum/meta/123?sourceId=bar');
});

test('core:net:datumMetadataUrlHelperMixin:viewDatumMetadataUrl:sourceIdArgNullOverrideParam', t => {
	const helper = new DatumMetadataUrlHelper();
	helper.sourceId = 'foo';
    const result = helper.viewDatumMetadataUrl(123, null);
	t.is(result, 'https://data.solarnetwork.net/solarquery/api/v1/sec/datum/meta/123');
});