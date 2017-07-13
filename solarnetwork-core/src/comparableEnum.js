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
        if ( new.target === ComparableEnum ) {
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
}

export default ComparableEnum;
