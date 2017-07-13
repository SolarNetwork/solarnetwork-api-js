import ComparableEnum from 'comparableEnum';

/**
 * A named aggregation.
 */
export class Aggregation extends ComparableEnum {

	/**
     * Constructor.
     * 
     * @param {string} name the unique name for this precision 
     * @param {number} level a relative aggregation level value 
     */
    constructor(name, level) {
		super(name, level);
		if ( new.target === Aggregation ) {
			Object.freeze(this);
		}
    }

    /**
     * Get the aggregate level value.
	 * 
	 * This is an alias for {@link #value}.
     */
    get level() {
        return this.value;
    }

}

/**
 * Enum of SolarQuery aggregation levels.
 */
const Aggregations = Object.freeze({
	MINUTE: new Aggregation('Minute', 60),
	FIVE_MINUTE: new Aggregation('FiveMinute', 60 * 5),
	TEN_MINUTE: new Aggregation('TenMinute', 60 * 10),
	FIFTEEN_MINUTE: new Aggregation('FifteenMinute', 60 * 15),
	THIRTY_MINUTE: new Aggregation('ThirtyMinute', 60 * 30),
	HOUR: new Aggregation('Hour', 3600),
	HOUR_OF_DAY: new Aggregation('HourOfDay', 3600),
	SEASONAL_HOUR_OF_DAY: new Aggregation('SeasonalHourOfDay', 3600),
	DAY: new Aggregation('Day', 86400),
	DAY_OF_WEEK: new Aggregation('DayOfWeek', 86400),
	SEASONAL_DAY_OF_WEEK: new Aggregation('SeasonalDayOfWeek', 86400),
	WEEK: new Aggregation('Week', 604800),
	WEEK_OF_YEAR: new Aggregation('WeekOfYear', 604800),
	MONTH: new Aggregation('Month', 2419200),
	RUNNING_TOTAL: new Aggregation('RunningTotal', Number.MAX_SAFE_INTEGER),
});

export default Aggregations;
