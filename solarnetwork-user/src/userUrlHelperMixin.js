export const DefaultSolarUserPath = '/solaruser';

export const SolarUserPathKey = 'solarUserPath';

export const SolarUserApiPathV1 = '/api/v1/sec';

/**
 * A mixin class that adds SolarUser specific support to <code>UrlHelper}.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @preserve
 */
const UserUrlHelperMixin = (superclass) => class extends superclass {

	/**
	 * Get the base URL to the SolarUser v1 REST API.
	 * 
	 * The returned URL uses the configured environment to resolve
	 * the <code>hostUrl</code> and a <code>solarUserPath</code> context path.
	 * If the context path is not available, it will default to 
	 * <code>/solaruser</code>.
	 * 
	 * @returns {string} the base URL to SolarUser
	 * @preserve
	 */
	baseUrl() {
		const path = this.env(SolarUserPathKey) || DefaultSolarUserPath;
		return super.baseUrl() + path + SolarUserApiPathV1;
	}

	/**
	 * Generate a URL to get a list of all active nodes for the user account.
	 *
	 * @return {string} the URL to access the user's active nodes
	 * @preserve
	 */
	viewNodesUrl() {
		return this.baseUrl() + '/nodes';
	}

	/**
	 * Generate a URL to get a list of all pending nodes for the user account.
	 *
	 * @return {string} the URL to access the user's pending nodes
	 * @preserve
	 */
	viewPendingNodesUrl() {
		return this.baseUrl() + '/nodes/pending';
	}

	/**
	 * Generate a URL to get a list of all archived nodes for the user account.
	 *
	 * @return {string} the URL to access the user's archived nodes
	 * @preserve
	 */
	viewArchivedNodesUrl() {
		return this.baseUrl() + '/nodes/archived';
	}

	/**
	 * Generate a URL to update the archived status of a set of nodes via a <code>POST</code> request.
	 *
	 * @param {number|number[]} nodeId a specific node ID, or array of node IDs, to update; if not provided the 
	 *                                   <code>nodeIds</code> property of this class will be used
	 * @param {boolean} archived <code>true</code> to mark the nodes as archived; <code>false</code> to un-mark
	 *                           and return to normal status
	 * @return {string} the URL to update the nodes archived status
	 * @preserve
	 */
	updateNodeArchivedStatusUrl(nodeId, archived) {
		const nodeIds = Array.isArray(nodeId) ? nodeId : nodeId ? [nodeId] : this.nodeIds;
		let result = this.baseUrl() + '/nodes/archived?nodeIds='
			+nodeIds.join(',') +'&archived='
			+(archived ? 'true' : 'false');
		return result;
	}

};

export default UserUrlHelperMixin;
