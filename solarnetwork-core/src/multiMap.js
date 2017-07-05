/**
 * A case-insensitive multi-value map object.
 *
 * @class
 */
class MultiMap {
	constructor() {
		this.mappings = {}; // map of lower-case header names to {name:X, val:[]} values
		this.mappingNames = []; // to keep insertion order
	}

	add(key, value) {
		return addValue(this, key, value);
	}

	put(key, value) {
		return addValue(this, key, value, true);
	}

	putAll(values) {
		for ( let key in values ) {
			if ( values.hasOwnProperty(key) ) {
                addValue(this, key, values[key], true);
            }
		}
		return this;
	}

	value(key) {
		const keyLc = key.toLowerCase();
		const mapping = this.mappings[keyLc];
		return (mapping ? mapping.val : undefined);
	}

	firstValue(key) {
		const values = this.value(key);
		return (values && values.length > 0 ? values[0] : undefined);
	}

	clear() {
		this.mappingNames.length = 0;
		this.mappings = {};
		return this;
	}

	size() {
		return this.mappingNames.length;
	}

	isEmpty() {
		return this.size() < 1;
	}

	containsKey(key) {
		return (this.value(key) !== undefined);
	}

	keySet() {
		const result = [];
		const len = this.size();
		for ( let i = 0; i < len; i += 1 ) {
			result.push(this.mappings[this.mappingNames[i]].key);
		}
		return result;
	}
}

function addValue(map, key, value, replace) {
	const keyLc = key.toLowerCase();
	let mapping = map.mappings[keyLc];
	if ( !mapping ) {
		mapping = {key:key, val:[]};
		map.mappings[keyLc] = mapping;
		map.mappingNames.push(keyLc);
	}
	if ( replace ) {
		mapping.val.length = 0;
	}
	if ( Array.isArray(value) ) {
		const len = value.length;
		for ( let i = 0; i < len; i += 1 ) {
			mapping.val.push(value[i]);
		}
	} else {
		mapping.val.push(value);
	}
	return map;
}

export default MultiMap;
