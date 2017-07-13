/**
 * A location precision object for use with defining named geographic precision.
 */
export class LocationPrecision {

    /**
     * Constructor.
     * 
     * @param {string} name the unique name for this precision 
     * @param {number} precision a relative precision value for this precision 
     */
    constructor(name, precision) {
        this._name = name;
        this._precision = precision;
    }

    /**
     * Get the associated name.
     * 
     * @returns {string} the name
     */
    get name() {
        return this._name;
    }

    /**
     * Get the relative precision value.
     */
    get precision() {
        return this._precision;
    }

    /**
     * Compare two LocationPrecision objects based on their <code>precision</code> values.
     * 
     * @param {LocationPrecision} other the object to compare to
     * @returns {number} <code>-1</code> if this precision is less than <code>other</code>, 
     *                   <code>1</code> if this precision is greater trhan <code>other</code>,
     *                   <code>0</code> otherwise (when the precisions are equal) 
     */
    comparePrecision(other) {
        return this._precision < other.precision ? -1 : this._precision > other.precision ? 1 : 0;
    }
}

export default Object.freeze({
	LAT_LONG: Object.freeze(new LocationPrecision('LatLong', 1)),

	BLOCK: Object.freeze(new LocationPrecision('Block', 5)),

	STREET: Object.freeze(new LocationPrecision('Street', 10)),

	POSTAL_CODE: Object.freeze(new LocationPrecision('PostalCode', 20)),

	LOCALITY: Object.freeze(new LocationPrecision('Locality', 30)),

	STATE: Object.freeze(new LocationPrecision('StateOrProvince', 40)),

	REGION: Object.freeze(new LocationPrecision('Region', 50)),

	TIME_ZONE: Object.freeze(new LocationPrecision('TimeZone', 60)),

	COUNTRY: Object.freeze(new LocationPrecision('Country', 70)),
});
