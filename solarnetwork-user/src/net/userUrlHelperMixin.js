/** The SolarUser default path. */
export const SolarUserDefaultPath = '/solaruser';

/** The {@link UrlHelper} parameters key for the SolarUser path. */
export const SolarUserPathKey = 'solarUserPath';

/** The SolarUser REST API path. */
export const SolarUserApiPathV1 = '/api/v1/sec';

/** The {@link UrlHelper} parameters key that holds the <code>userId</code>. */
export const UserIdsKey = 'userIds';

/**
 * A mixin class that adds SolarUser specific support to <code>UrlHelper</code>.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @mixin
 * @property {number} userId the first available user ID from the <code>userIds</code> property;
 *                           setting this replaces any existing user IDs with an array of just that value
 * @property {number[]} userIds an array of user IDs, set on the <code>userIds</code> parameter
 */
const UserUrlHelperMixin = (superclass) => class extends superclass {

    /**
     * Get the default user ID.
     * 
     * This gets the first available user ID from the <code>userIds</code> property.
     * 
     * @returns {number} the default user ID, or <code>null</code>
	 * @memberof UserUrlHelperMixin#
     */
    get userId() {
        const userIds = this.parameter(UserIdsKey);
        return (Array.isArray(userIds) && userIds.length > 0 ? userIds[0] : null);
    }

    /**
     * Set the user ID.
     * 
     * This will set the <code>userIds</code> property to a new array of just the given value.
     * 
     * @param {number} userId the user ID to set
	 * @memberof UserUrlHelperMixin#
     */
    set userId(userId) {
        this.parameter(UserIdsKey, [userId]);
    }

    get userIds() {
        return this.parameter(UserIdsKey);
    }

    set userIds(userIds) {
        this.parameter(UserIdsKey, userIds);
    }

	/**
	 * Get the base URL to the SolarUser v1 REST API.
	 * 
	 * The returned URL uses the configured environment to resolve
	 * the <code>hostUrl</code> and a <code>solarUserPath</code> context path.
	 * If the context path is not available, it will default to 
	 * <code>/solaruser</code>.
	 * 
	 * @returns {string} the base URL to SolarUser
	 * @memberof UserUrlHelperMixin#
	 */
	baseUrl() {
		const path = this.env(SolarUserPathKey) || SolarUserDefaultPath;
		return super.baseUrl() + path + SolarUserApiPathV1;
	}

	/**
	 * Generate a URL to get a list of all active nodes for the user account.
	 *
	 * @return {string} the URL to access the user's active nodes
	 * @memberof UserUrlHelperMixin#
	 */
	viewNodesUrl() {
		return this.baseUrl() + '/nodes';
	}

	/**
	 * Generate a URL to get a list of all pending nodes for the user account.
	 *
	 * @return {string} the URL to access the user's pending nodes
	 * @memberof UserUrlHelperMixin#
	 */
	viewPendingNodesUrl() {
		return this.baseUrl() + '/nodes/pending';
	}

	/**
	 * Generate a URL to get a list of all archived nodes for the user account.
	 *
	 * @return {string} the URL to access the user's archived nodes
	 * @memberof UserUrlHelperMixin#
	 */
	viewArchivedNodesUrl() {
		return this.baseUrl() + '/nodes/archived';
	}

	/**
	 * Generate a URL to update the archived status of a set of nodes via a <code>POST</code> request.
	 *
	 * @param {number|number[]|null} nodeId a specific node ID, or array of node IDs, to update; if not provided the 
	 *                                      <code>nodeIds</code> property of this class will be used
	 * @param {boolean} archived <code>true</code> to mark the nodes as archived; <code>false</code> to un-mark
	 *                           and return to normal status
	 * @return {string} the URL to update the nodes archived status
	 * @memberof UserUrlHelperMixin#
	 */
	updateNodeArchivedStatusUrl(nodeId, archived) {
		const nodeIds = Array.isArray(nodeId) ? nodeId : nodeId ? [nodeId] : this.nodeIds;
		let result = this.baseUrl() + '/nodes/archived?nodeIds='
			+nodeIds.join(',') +'&archived='
			+(archived ? 'true' : 'false');
		return result;
	}

}

export default UserUrlHelperMixin;
