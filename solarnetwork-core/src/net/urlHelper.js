import Environment from 'net/environment';

/**
 * A utility class for helping to compose SolarNet URLs for the REST API.
 *
 * @class
 * @preserve
 */
class UrlHelper {

    /**
     * Constructor.
     *
     * @param {Environment} [environment] the optional initial environment to use
     * @preserve
     */
    constructor(environment) {
        this.environment = (environment || new Environment());
    }

    /**
     * Get a URL for just the SolarNet host, without any path.
     *
     * @returns {String} the URL to the SolarNet host
	 * @preserve
     */
    hostUrl() {
        const tls = this.environment.useTls();
        const port = +this.environment.value('port');
		let url = 'http' +(tls ? 's' : '') +'://' +this.environment.value('host');
        if ( (tls && port > 0 && port !== 443) || (!tls && port > 0 && port !== 80) ) {
            url += ':' +port;
        }
        return url;
	}

}

export default UrlHelper;
