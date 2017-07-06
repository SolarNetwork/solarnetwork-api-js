export const NodeIdsKey = 'nodeIds';

export const SourceIdsKey = 'sourceIds';

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
     * @returns {number} the default node ID, or {@code null}
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
     * @param {number} nodeId the node ID to set
     */
    set nodeId(nodeId) {
        this.parameter(NodeIdsKey, [nodeId]);
    }

    /**
     * Get the node IDs.
     * 
     * @returns {number[]} the node IDs
     */
    get nodeIds() {
        return this.parameter(NodeIdsKey);
    }

    /**
     * Set the node IDs.
     * 
     * @param {number[]} nodeIds the node IDs to set
     */
    set nodeIds(nodeIds) {
        this.parameter(NodeIdsKey, nodeIds);
    }

    /**
     * Get the default source ID.
     * 
     * This gets the first available source ID from the {@code sourceIds} property.
     * 
     * @returns {string} the default source ID, or {@code null}
     */
    get sourceId() {
        const sourceIds = this.parameter(SourceIdsKey);
        return (Array.isArray(sourceIds) && sourceIds.length > 0 ? sourceIds[0] : null);
    }

    /**
     * Set the source ID.
     * 
     * This will set the {@code sourceIds} property to a new array of just the given value.
     * 
     * @param {string} sourceId the source ID to set
     */
    set sourceId(sourceId) {
        this.parameter(SourceIdsKey, [sourceId]);
    }

    /**
     * Get the source IDs.
     * 
     * @returns {string[]} the source IDs
     */
    get sourceIds() {
        return this.parameter(SourceIdsKey);
    }

    /**
     * Set the source IDs.
     * 
     * @param {string[]} sourceIds the source IDs to set
     */
    set sourceIds(sourceIds) {
        this.parameter(SourceIdsKey, sourceIds);
    }

}

export default NodeUrlHelperMixin;
