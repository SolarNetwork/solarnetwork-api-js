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
        if ( new.target === LocationPrecision ) {
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

}

const LocationPrecisions = Object.freeze({
	LAT_LONG: new LocationPrecision('LatLong', 1),

	BLOCK: new LocationPrecision('Block', 5),

	STREET: new LocationPrecision('Street', 10),

	POSTAL_CODE: new LocationPrecision('PostalCode', 20),

	LOCALITY: new LocationPrecision('Locality', 30),

	STATE: new LocationPrecision('StateOrProvince', 40),

	REGION: new LocationPrecision('Region', 50),

	TIME_ZONE: new LocationPrecision('TimeZone', 60),

	COUNTRY: new LocationPrecision('Country', 70),
});

export default LocationPrecisions;