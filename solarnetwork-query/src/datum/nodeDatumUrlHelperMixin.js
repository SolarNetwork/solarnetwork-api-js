import UrlHelper from 'net/urlHelper';
import NodeUrlHelperMixin from 'net/nodeUrlHelperMixin';
import QueryUrlHelperMixin from 'queryUrlHelperMixin';

/**
 * A mixin class that adds SolarNode datum query support to {@code UrlHelper}.
 *
 * This mixin extends the {@link QueryUrlHelperMixin} and {@link NodeUrlHelperMixin} mixins.
 *
 * @param {UrlHelper} superclass the UrlHelper class to mix onto
 * @preserve
 */
const NodeDatumUrlHelperMixin = (superclass) => class extends QueryUrlHelperMixin(NodeUrlHelperMixin(superclass)) {

	/**
	 * Generate a URL for the "reportable interval" for a node, optionally limited to a specific set of source IDs.
	 *
     * If no source IDs are provided, then the reportable interval query will return an interval for
     * all available sources.
     *
	 * @param {string[]} sourceIds an array of source IDs to limit query to; if not provided the <code>sourceIds</code> property of this class will be used
	 * @param {number} [nodeId] a specific node ID to use; if not provided the <code>nodeId</code> property of this class will be used
	 * @returns {string} the URL
     * @preserve
	 */
	reportableIntervalUrl(sourceIds, nodeId) {
		let url = (this.baseUrl() +'/range/interval?nodeId=' +(nodeId || this.nodeId));
        let sources = (sourceIds || this.sourceIds);
		if ( Array.isArray(sources) && sources.length > 0 ) {
			url += '&sourceIds=' + sources.map(e => encodeURIComponent(e)).join(',');
		}
		return url;
	}

}

/**
 * A concrete {@link UrlHelper} with the {@link NodeDatumUrlHelperMixin}.
 *
 * @class
 * @preserve
 */
export class NodeDatumUrlHelper extends NodeDatumUrlHelperMixin(UrlHelper) {

}

export default NodeDatumUrlHelperMixin;
