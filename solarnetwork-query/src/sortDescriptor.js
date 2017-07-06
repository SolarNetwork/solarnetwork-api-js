/**
 * A description of a sort applied to a property of a collection.
 */
class SortDescriptor {

    /**
     * 
     * @param {string} key the property to sort on
     * @param {boolean} [descending] {@code true} to sort in descending order, {@code false} for ascending
     */
    constructor(key, descending) {
        this._key = key;
        this._descending = !!descending;
    }

    /**
     * Get the sort property name.
     * 
     * @returns {string} the sort key
     */
    get key() {
        return this._key;
    }

    /**
     * Get the sorting direction.
     * 
     * @returns {boolean} {@code true} if descending order, {@code false} for ascending
     */
    get descending() {
        return this._descending;
    }

}

export default SortDescriptor;
