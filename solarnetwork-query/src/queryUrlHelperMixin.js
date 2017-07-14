export const SolarQueryDefaultPath = '/solarquery';

export const SolarQueryPathKey = 'solarQueryPath';

export const SolarQueryApiPathV1 = '/api/v1';

export const SolarQueryPublicPathKey = 'publicQuery';

/**
 * A mixin class that adds SolarQuery specific support to {@code UrlHelper}.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @preserve
 */
const QueryUrlHelperMixin = (superclass) => class extends superclass {

	/**
	 * Get the base URL to the SolarQuery v1 REST API.
	 * 
	 * The returned URL uses the configured environment to resolve
	 * the {@code hostUrl}, the {@code solarQueryPath} context path,
     * and the {@code publicQuery} boolean flag. If the context path is not 
     * available, it will default to {@code /solarquery}.
	 * 
	 * @returns {string} the base URL to SolarQuery
	 * @preserve
	 */
	baseUrl() {
		const path = this.env(SolarQueryPathKey) || SolarQueryDefaultPath;
        const isPubPath = !!this.env(SolarQueryPublicPathKey);
		return this.hostUrl() + path + SolarQueryApiPathV1
            +(isPubPath ? '/pub' : '/sec');
	}

};

export default QueryUrlHelperMixin;
