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

    /**
     * Replace occurances of URL template variables with values from a parameter object.
     * 
     * URL template variables are specified as <code>{<em>name</em>}</code>. The variable
     * will be replaced by the value associated with property <code>name</code> in the
     * provided parameter object. The value will be URI encoded.
     * 
     * @param {String} template a URL template
     * @param {Object} params an object whose properties should serve as tempalte variables
     * @preserve
     */
    static resolveTemplateUrl(template, params) {
        return template.replace(/\{([^}]+)\}/g, function(match, variableName) {
            let variableValue = params[variableName];
            return (variableValue !== undefined ? encodeURIComponent(variableValue) : '');
        });
    }

}

export default UrlHelper;
