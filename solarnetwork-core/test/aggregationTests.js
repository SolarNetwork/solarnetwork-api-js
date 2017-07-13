'use strict';

import test from 'ava';

import {default as Aggregations, Aggregation } from 'aggregation';

test('core:aggregation:create', t => {
	const obj = new Aggregation('foo', 1);
    t.truthy(obj);
    t.is(obj.name, 'foo');
    t.is(obj.level, 1);
});

test('core:aggregation:compare:lt', t => {
	const left = new Aggregation('foo', 1);
	const right = new Aggregation('bar', 2);
    t.is(left.compareTo(right), -1);
});

test('core:aggregation:compare:lt', t => {
	const left = new Aggregation('foo', 2);
	const right = new Aggregation('bar', 1);
    t.is(left.compareTo(right), 1);
});

test('core:aggregation:compare:eq', t => {
	const left = new Aggregation('foo', 1);
	const right = new Aggregation('bar', 1);
    t.is(left.compareTo(right), 0);
});

test('core:aggregation:aggregations', t => {
	t.is(Aggregations.MINUTE.name, 'Minute');
	t.is(Aggregations.FIVE_MINUTE.name, 'FiveMinute');
	t.is(Aggregations.TEN_MINUTE.name, 'TenMinute');
	t.is(Aggregations.FIFTEEN_MINUTE.name, 'FifteenMinute');
	t.is(Aggregations.THIRTY_MINUTE.name, 'ThirtyMinute');
	t.is(Aggregations.HOUR.name, 'Hour');
	t.is(Aggregations.HOUR_OF_DAY.name, 'HourOfDay');
	t.is(Aggregations.SEASONAL_HOUR_OF_DAY.name, 'SeasonalHourOfDay');
	t.is(Aggregations.DAY.name, 'Day');
	t.is(Aggregations.DAY_OF_WEEK.name, 'DayOfWeek');
	t.is(Aggregations.SEASONAL_DAY_OF_WEEK.name, 'SeasonalDayOfWeek');
	t.is(Aggregations.WEEK.name, 'Week');
	t.is(Aggregations.WEEK_OF_YEAR.name, 'WeekOfYear');
	t.is(Aggregations.MONTH.name, 'Month');
	t.is(Aggregations.RUNNING_TOTAL.name, 'RunningTotal');
});
