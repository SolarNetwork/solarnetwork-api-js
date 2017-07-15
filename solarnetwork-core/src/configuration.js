function createGetter(me, prop) {
	return function() { return me.map[prop]; };
}

function createSetter(me, prop) {
	return function(value) { me.map[prop] = value; };
}

function createProperty(me, prop) {
	Object.defineProperty(me, prop, {
		enumerable : true,
		configurable : true,
		get : createGetter(me, prop),
		set : createSetter(me, prop)
	});
}

/**
 * A configuration utility object.
 *
 * Properties can be get/set by using the {@link Configuration#value} function.
 */
class Configuration {

	/**
	 * Constructor.
	 *
	 * For any properties passed on <code>initialMap</code>, {@link Configutration#value} will
	 * be called so those properties are defined on this instance.
	 *
	 * @param {Object} initialMap the optional initial properties to store
	 * @preserve
	 */
	constructor(initialMap) {
		this.map = {};
		if ( initialMap !== undefined ) {
			this.values(initialMap);
		}
	}

	/**
	 * Test if a key is truthy.
	 *
	 * @param {String} key the key to test
	 * @returns {Boolean} <code>true</code> if the key is enabled
	 * @preserve
	 */
	enabled(key) {
		if ( key === undefined ) {
			return false;
		}
		return !!this.map[key];
	}

	/**
	 * Set or toggle the enabled status of a given key.
	 *
	 * <p>If the <em>enabled</em> parameter is not passed, then the enabled
	 * status will be toggled to its opposite value.</p>
	 *
	 * @param {String} key they key to set
	 * @param {Boolean} enabled the optional enabled value to set
	 * @returns {sn.Configuration} this object to allow method chaining
	 * @preserve
	 */
	toggle(key, enabled) {
		var val = enabled;
		if ( key === undefined ) {
			return this;
		}
		if ( val === undefined ) {
			// in 1-argument mode, toggle current value
			val = (this.map[key] === undefined);
		}
		return this.value(key, (val === true ? true : null));
	}

	/**
	 * Get or set a configuration value.
	 *
	 * @param {String} key The key to get or set the value for
	 * @param {Object} [newValue] If defined, the new value to set for the given <code>key</code>.
	 *                            If <code>null</code> then the value will be removed.
	 * @returns {Object} If called as a getter, the associated value for the given <code>key</code>,
	 *                   otherwise this object.
	 * @preserve
	 */
	value(key, newValue) {
		if ( arguments.length === 1 ) {
			return this.map[key];
		}
		if ( newValue === null ) {
			delete this.map[key];
			if ( this.hasOwnProperty(key) ) {
				delete this[key];
			}
		} else {
			this.map[key] = newValue;
			if ( !this.hasOwnProperty(key) ) {
				createProperty(this, key);
			}
		}
		return this;
	}

	/**
	 * Get or set multiple properties.
	 * 
	 * @param {Object} [newMap] a map of values to set
	 * @returns {Object} if called as a getter, all properties of this object copied into a simple object;
	 *                   otherwise this object
	 * @preserve
	 */
	values(newMap) {
		if ( newMap ) {
			for ( let prop in newMap ) {
				if ( newMap.hasOwnProperty(prop) ) {
					this.value(prop, newMap[prop]);
				}
			}
			return this;
		}
		return Object.assign({}, this.map);
	}

}

export default Configuration;
