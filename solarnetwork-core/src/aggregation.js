/**
 * Enum of SolarQuery aggregation levels.
 */
const Aggregation = Object.freeze({
	MINUTE: 'Minute',
	FIVE_MINUTE: 'FiveMinute',
	TEN_MINUTE: 'TenMinute',
	FIFTEEN_MINUTE: 'FifteenMinute',
	THIRTY_MINUTE: 'ThirtyMinute',
	HOUR: 'Hour',
	HOUR_OF_DAY: 'HourOfDay',
	SEASONAL_HOUR_OF_DAY: 'SeasonalHourOfDay',
	DAY: 'Day',
	DAY_OF_WEEK: 'DayOfWeek',
	SEASONAL_DAY_OF_WEEK: 'SeasonalDayOfWeek',
	WEEK: 'Week',
	WEEK_OF_YEAR: 'WeekOfYear',
	MONTH: 'Month',
	RUNNING_TOTAL: 'RunningTotal',
});

export default Aggregation;
