export const DefaultSolarUserPath = '/solaruser';

export const SolarUserPathKey = 'solarUserPath';

export const SolarUserApiPathV1 = '/api/v1/sec';

/**
 * A mixin class that adds SolarUser specific support to {@code UrlHelper}.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @preserve
 */
const UserUrlHelperMixin = (superclass) => class extends superclass {

	/**
	 * Get the base URL to the SolarUser v1 REST API.
	 * 
	 * The returned URL uses the configured environment to resolve
	 * the {@code hostUrl} and a {@code solarUserPath} context path.
	 * If the context path is not available, it will default to 
	 * {@code /solaruser}.
	 * 
	 * @returns {string} the base URL to SolarUser
	 * @preserve
	 */
	baseUrl() {
		const path = this.env(SolarUserPathKey) || DefaultSolarUserPath;
		return super.baseUrl() + path + SolarUserApiPathV1;
	}

	/**
	 * Generate a SolarUser {@code /nodes} URL.
	 *
	 * @return {string} the URL to access the active user's nodes
	 * @preserve
	 */
	viewNodesUrl() {
		return this.baseUrl() + '/nodes';
	}

};

export default UserUrlHelperMixin;
