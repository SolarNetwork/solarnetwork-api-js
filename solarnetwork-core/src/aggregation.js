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
	
	/**
	 * Get the {@link Aggregations} values.
	 * 
	 * @inheritdoc
	 */
	static enumValues() {
		return AggregationValues;
	}

}

const AggregationValues = Object.freeze([
	new Aggregation('Minute', 60),
	new Aggregation('FiveMinute', 60 * 5),
	new Aggregation('TenMinute', 60 * 10),
	new Aggregation('FifteenMinute', 60 * 15),
	new Aggregation('ThirtyMinute', 60 * 30),
	new Aggregation('Hour', 3600),
	new Aggregation('HourOfDay', 3600),
	new Aggregation('SeasonalHourOfDay', 3600),
	new Aggregation('Day', 86400),
	new Aggregation('DayOfWeek', 86400),
	new Aggregation('SeasonalDayOfWeek', 86400),
	new Aggregation('Week', 604800),
	new Aggregation('WeekOfYear', 604800),
	new Aggregation('Month', 2419200),
	new Aggregation('RunningTotal', Number.MAX_SAFE_INTEGER),
]);

const Aggregations = Aggregation.enumsValue(AggregationValues);

export default Aggregations;
