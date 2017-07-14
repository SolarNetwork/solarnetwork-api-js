import ComparableEnum from 'comparableEnum';

/**
 * A location precision object for use with defining named geographic precision.
 */
export class LocationPrecision extends ComparableEnum {

    /**
     * Constructor.
     * 
     * @param {string} name the unique name for this precision 
     * @param {number} precision a relative precision value for this precision 
     */
    constructor(name, precision) {
        super(name, precision);
        if ( this.constructor === LocationPrecision ) {
            Object.freeze(this);
        }
    }

    /**
     * Get the relative precision value.
     * 
     * This is an alias for {@link #name}.
     * 
     * @returns {number} the precision
     */
    get precision() {
        return this.value;
    }

	/**
	 * Get the {@link LocationPrecisions} values.
	 * 
	 * @inheritdoc
	 */
	static enumValues() {
		return LocationPrecisionValues;
	}
}

const LocationPrecisionValues = Object.freeze([
    new LocationPrecision('LatLong', 1),
    new LocationPrecision('Block', 5),
    new LocationPrecision('Street', 10),
    new LocationPrecision('PostalCode', 20),
    new LocationPrecision('Locality', 30),
    new LocationPrecision('StateOrProvince', 40),
    new LocationPrecision('Region', 50),
    new LocationPrecision('TimeZone', 60),
    new LocationPrecision('Country', 70),
]);

const LocationPrecisions = LocationPrecision.enumsValue(LocationPrecisionValues);

export default LocationPrecisions;
