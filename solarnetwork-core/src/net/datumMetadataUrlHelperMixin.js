import Pagination from 'pagination';
import SortDescriptor from 'sortDescriptor';
import UrlHelper from 'net/urlHelper';
import NodeUrlHelperMixin from 'net/nodeUrlHelperMixin';
import QueryUrlHelperMixin from 'net/queryUrlHelperMixin'

/**
 * A mixin class that adds SolarNode datum metadata support to {@link UrlHelper}.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto
 * @mixin
 * @returns {*} the mixin
 */
const DatumMetadataUrlHelperMixin = (superclass) => class extends superclass {

    /**
     * Get a base URL for datum metadata operations using a specific node ID.
     * 
     * @param {number} [nodeId] a specific node ID to use; if not provided the <code>nodeId</code> property of this class will be used
     * @returns {string} the base URL
     * @private
     * @memberof DatumMetadataUrlHelperMixin#
     */
    baseDatumMetadataUrl(nodeId) {
        return this.baseUrl() + '/datum/meta/' +(nodeId || this.nodeId);
    }

    datumMetadataUrlWithSource(nodeId, sourceId) {
        let result = this.baseDatumMetadataUrl(nodeId);
        let source = (sourceId || this.sourceId);
        if ( sourceId !== null && source ) {
            result += '?sourceId=' +encodeURIComponent(source);
        }
        return result;
    }

	/**
	 * Generate a URL for viewing datum metadata.
     * 
     * If no <code>sourceId</code> is provided, then the API will return all available datum metadata for all sources.
	 *
	 * @param {number} [nodeId] a specific node ID to use; if not provided the <code>nodeId</code> property of this class will be used
	 * @param {string} [sourceId] a specific source ID to use; 
     *                            if not provided the <code>sourceId</code> property of this class will be used;
     *                            if <code>null</code> then ignore any <code>sourceId</code> property of this class
     * @returns {string} the URL
	 * @memberof NodeMetadataUrlHelperMixin#
	 */
	viewDatumMetadataUrl(nodeId, sourceId) {
        return this.datumMetadataUrlWithSource(nodeId, sourceId);
	}

};

export default DatumMetadataUrlHelperMixin;

/**
 * A concrete {@link UrlHelper} with the {@link DatumMetadataUrlHelperMixin},  {@link QueryUrlHelperMixin}, and
 * {@link NodeUrlHelperMixin} mixins.
 * 
 * @mixes DatumMetadataUrlHelperMixin
 * @mixes QueryUrlHelperMixin
 * @mixes NodeUrlHelperMixin
 * @extends UrlHelper
 */
export class DatumMetadataUrlHelper extends DatumMetadataUrlHelperMixin(QueryUrlHelperMixin(NodeUrlHelperMixin(UrlHelper))) {

}
