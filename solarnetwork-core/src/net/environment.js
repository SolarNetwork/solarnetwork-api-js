import Configuration from 'configuration';

/**
 * An environment configuration utility object.
 *
 * This extends {@code Configuration} to add support for standard properties
 * needed to access the SolarNetwork API, such as host and protocol values.
 *
 * @class
 * @param {Object} initialMap the initial properties to store (optional)
 * @preserve
 */
class Environment extends Configuration {

	/**
	 * Constructor.
	 *
	 * This will define the following default properties, if not supplied on the
	 * {@code config} argument:
	 *
	 * <dl>
	 * <dt>host</dt><dd><code>data.solarnetwork.net</code></dd>
	 * <dt>protocol</dt><dd><code>https</code></dd>
	 * <dt>port</dt><dd><code>443</code></dd>
	 * </dl>
	 *
	 * @param {Object} [config] an optional set of properties to start with
	 * @preserve
	 */
	constructor(config) {
		super(Object.assign({
			protocol: 'https',
			host: 'data.solarnetwork.net',
			port: '443',
		}, config));
	}

    /**
	 * Check if TLS is in use via the {@code https} protocol.
	 *
     * @returns {boolean} {@code true} if the {@code protocol} is set to {@code https}
     */
	useTls() {
		return (this.value('protocol') === 'https');
	}

}

export default Environment;
