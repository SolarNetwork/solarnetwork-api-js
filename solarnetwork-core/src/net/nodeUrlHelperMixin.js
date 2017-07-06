export const NodeIdsKey = 'nodeIds';

/**
 * A mixin class that adds support for SolarNode properties to a {@code UrlHelper}.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 */
const NodeUrlHelperMixin = (superclass) => class extends superclass {

    /**
     * Get the default node ID.
     * 
     * This gets the first available node ID from the {@code nodeIds} property.
     * 
     * @returns {Number} the default node ID, or {@code null}
     */
    get nodeId() {
        const nodeIds = this.parameter(NodeIdsKey);
        return (Array.isArray(nodeIds) && nodeIds.length > 0 ? nodeIds[0] : null);
    }

    /**
     * Set the node ID.
     * 
     * This will set the {@code nodeIds} property to a new array of just the given value.
     * 
     * @param {Number} nodeId the node ID to set
     */
    set nodeId(nodeId) {
        this.parameter(NodeIdsKey, [nodeId]);
    }

    /**
     * Get the node IDs.
     * 
     * @returns {Array} the node IDs
     */
    get nodeIds() {
        return this.parameter(NodeIdsKey);
    }

    /**
     * Set the node IDs.
     * 
     * @param {Array} nodeIds the node IDs to set
     */
    set nodeIds(nodeIds) {
        this.parameter(NodeIdsKey, nodeIds);
    }

}

export default NodeUrlHelperMixin;
