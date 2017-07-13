import test from 'ava';

import {default as LocationPrecisions, LocationPrecision } from 'locationPrecision';

test('core:locationPrecision:create', t => {
	const obj = new LocationPrecision('foo', 1);
    t.truthy(obj);
    t.is(obj.name, 'foo');
    t.is(obj.precision, 1);
});

test('core:locationPrecision:compare:lt', t => {
	const left = new LocationPrecision('foo', 1);
	const right = new LocationPrecision('bar', 2);
    t.is(left.compareTo(right), -1);
});

test('core:locationPrecision:compare:lt', t => {
	const left = new LocationPrecision('foo', 2);
	const right = new LocationPrecision('bar', 1);
    t.is(left.compareTo(right), 1);
});

test('core:locationPrecision:compare:eq', t => {
	const left = new LocationPrecision('foo', 1);
	const right = new LocationPrecision('bar', 1);
    t.is(left.compareTo(right), 0);
});

test('core:locationPrecisions', t => {
    t.is(LocationPrecisions.BLOCK.name, 'Block');
    t.is(LocationPrecisions.COUNTRY.name, 'Country');
    t.is(LocationPrecisions.LAT_LONG.name, 'LatLong');
    t.is(LocationPrecisions.LOCALITY.name, 'Locality');
    t.is(LocationPrecisions.POSTAL_CODE.name, 'PostalCode');
    t.is(LocationPrecisions.REGION.name, 'Region');
    t.is(LocationPrecisions.STATE.name, 'StateOrProvince');
    t.is(LocationPrecisions.STREET.name, 'Street');
    t.is(LocationPrecisions.TIME_ZONE.name, 'TimeZone');
});