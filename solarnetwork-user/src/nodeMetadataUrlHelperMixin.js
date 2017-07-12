import UrlHelper from 'net/urlHelper';
import NodeUrlHelperMixin from 'net/nodeUrlHelperMixin';
import UserUrlHelperMixin from 'userUrlHelperMixin'

/**
 * A mixin class that adds SolarNode metadata support to <code>UrlHelper</code>.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @preserve
 */
const NodeMetadataUrlHelperMixin = (superclass) => class extends superclass {

	/**
	 * Generate a URL for viewing the configured node's metadata.
	 *
	 * @param {number} [nodeId] a specific node ID to use; if not provided the <code>nodeId</code> property of this class will be used
	 * @returns {string} the URL
	 */
	viewNodeMetadataUrl(nodeId) {
		return (this.baseUrl() +'/nodes/meta/' 
			+(nodeId || this.nodeId));
	}

};

export default NodeMetadataUrlHelperMixin;

/**
 * A concrete {@link UrlHelper} with the {@link NodeMetadataUrlHelperMixin},  {@link UserUrlHelperMixin}, and
 * {@link #NodeUrlHelperMixin} mixins.
 * 
 * @class
 * @preserve
 */
export class NodeMetadataUrlHelper extends NodeMetadataUrlHelperMixin(UserUrlHelperMixin(NodeUrlHelperMixin(UrlHelper))) {

}
