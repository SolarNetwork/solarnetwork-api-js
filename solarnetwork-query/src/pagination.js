/**
 * A pagination criteria object.
 */
class Pagination {

    /**
     * Construct a pagination object.
     * 
     * @param {number} max the maximum number of results to return 
     * @param {number} [offset] the 0-based starting offset 
     */
    constructor(max, offset) {
        this._max = (max > 0 ? +max : 0);
        this._offset = (offset > 0 ? +offset : 0);
    }

    /**
     * Get the maximum number of results to return.
     * 
     * @returns {number} the maximum number of results
     */
    get max() {
        return this._max;
    }

    /**
     * Get the results starting offset.
     * 
     * The first available result starts at offset {@code 0}. Note this is 
     * a raw offset value, not a "page" offset.
     * 
     * @returns {number} the starting result offset
     */
    get offset() {
        return this._offset;
    }

    /**
     * Copy constructor with a new {@code offset} value.
     * 
     * @param {number} offset the new offset to use
     * @return {Pagination} a new instance
     */
    withOffset(offset) {
        return new Pagination(this.max, offset);
    }

}

export default Pagination;
