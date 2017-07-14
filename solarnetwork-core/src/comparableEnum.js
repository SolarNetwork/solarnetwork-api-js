/**
 * An immutable enum-like object with an associated comparable value.
 */
class ComparableEnum {

    /**
     * Constructor.
     * 
     * @param {string} name the name
     * @param {number} value the comparable value
     */
    constructor(name, value) {
        this._name = name;
        this._value = value;
        if ( this.constructor === ComparableEnum ) {
            Object.freeze(this);
        }
    }

    /**
     * Get the enum name.
     * 
     * @returns {string} the  name
     */
    get name() {
        return this._name;
    }

    /**
     * Get the comparable value.
     * 
     * @returns {number} the value
     */
    get value() {
        return this._value;
    }

    /**
     * Compare two ComparableEnum objects based on their <code>value</code> values.
     * 
     * @param {ComparableEnum} other the object to compare to
     * @returns {number} <code>-1</code> if <code>this.value</code> is less than <code>other.value</code>, 
     *                   <code>1</code> if <code>this.value</code> is greater than <code>other.value</code>,
     *                   <code>0</code> otherwise (when the values are equal) 
     */
    compareTo(other) {
        return this.value < other.value ? -1 : this.value > other.value ? 1 : 0;
    }

    /**
     * Get all enum values.
     * 
     * This method must be overridden by subclasses to return something meaningful.
     * This implementation returns an empty array.
     * 
     * @returns {ComparableEnum[]} get all enum values
     */
    static enumValues() {
        return [];
    }

    /**
     * Compute a complete set of enum values based on a minimum enum and/or set of enums.
     * 
     * If <code>cache</code> is provided, then results computed via <code>minAggregation</code> 
     * will be cached there, and subsequent calls will returned the cached result when appropriate.
     * 
     * @param {ComparableEnum} [minEnum] a minimum enum value
     * @param {Map<string, Set<ComparableEnum>>} [cache] a cache of computed values
     * @returns {Set<ComparableEnum>|null} the computed set, or <code>null</code> if no values match
     */
    static minimumEnumSet(minEnum, cache) {
        if ( !minEnum ) {
            return null;
        }
        let result = (cache ? cache.get(minEnum.name) : undefined);
        if ( result ) {
            return result;
        }
        result = new Set();
        for ( const agg of minEnum.constructor.enumValues() ) {
            if ( agg.compareTo(minEnum) > -1 ) {
                result.add(agg);
            }
        }
        if ( cache ) {
            cache.set(minEnum.name, result);
        }
        return (result.size > 0 ? result : null);
    }

    /**
     * This method takes an array of enums and turns them into a mapped object, using the enum
     * <code>name</code> as object property names.
     * 
     * @param {ComparableEnum[]} enums the enum list to turn into a value object
     * @returns {Object} an object with enum <code>name</code> properties with associated enum values 
     */
    static enumsValue(enums) {
        return Object.freeze(enums.reduce((obj, e) => {
            obj[e.name] = e;
            return obj;
        }, {}));
    }
}

export default ComparableEnum;
