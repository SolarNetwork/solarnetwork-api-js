'use strict';

import test from 'ava';

import Aggregation from 'aggregation';

test('query:aggregation:constants', t => {
	t.is(Aggregation.MINUTE, 'Minute');
	t.is(Aggregation.FIVE_MINUTE, 'FiveMinute');
	t.is(Aggregation.TEN_MINUTE, 'TenMinute');
	t.is(Aggregation.FIFTEEN_MINUTE, 'FifteenMinute');
	t.is(Aggregation.THIRTY_MINUTE, 'ThirtyMinute');
	t.is(Aggregation.HOUR, 'Hour');
	t.is(Aggregation.HOUR_OF_DAY, 'HourOfDay');
	t.is(Aggregation.SEASONAL_HOUR_OF_DAY, 'SeasonalHourOfDay');
	t.is(Aggregation.DAY, 'Day');
	t.is(Aggregation.DAY_OF_WEEK, 'DayOfWeek');
	t.is(Aggregation.SEASONAL_DAY_OF_WEEK, 'SeasonalDayOfWeek');
	t.is(Aggregation.WEEK, 'Week');
	t.is(Aggregation.WEEK_OF_YEAR, 'WeekOfYear');
	t.is(Aggregation.MONTH, 'Month');
	t.is(Aggregation.RUNNING_TOTAL, 'RunningTotal');
});
