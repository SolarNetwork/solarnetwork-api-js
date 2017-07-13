import { default as LocationPrecisions, LocationPrecision } from 'locationPrecision';

/**
 * A set of security restrictions that can be attached to other objects, like auth tokens.
 */
class SecurityPolicy {

	/**
	 * Constructor.
	 * 
	 * @param {Set<number>} [nodeIds] the node IDs to restrict to, or <code>null</code> for no restriction
	 * @param {Set<string>} [sourceIds] the source ID to restrict to, or <code>null</code> for no restriction
	 * @param {Set<string>} [aggregations] the aggregation names to restrict to, or <code>null</code> for no restriction
	 * @param {Aggregation} [minAggregation] if specified, a minimum aggregation level that is allowed
	 * @param {Set<string>} [locationPrecisions] the location precision names to restrict to, or <code>null</code> for no restriction
	 * @param {LocationPrecision} [minLocationPrecision] if specified, a minimum location precision that is allowed
	 * @param {Set<string>} [nodeMetadataPaths] the <code>SolarNodeMetadata</code> paths to restrict to, or <code>null</code> for no restriction
	 * @param {Set<string>} [userMetadataPaths] the <code>UserNodeMetadata</code> paths to restrict to, or <code>null</code> for no restriction
	 */
    constructor(nodeIds, sourceIds, aggregations, minAggregation, locationPrecisions,
			minLocationPrecision, nodeMetadataPaths, userMetadataPaths) {
		this._nodeIds = nodeIds;
		this._sourceIds = sourceIds;
		this._aggregations = aggregations;
		this._minAggregation = minAggregation;
		this._locationPrecisions = locationPrecisions;
		this._minLocationPrecision = minLocationPrecision;
		this._nodeMetadataPaths = nodeMetadataPaths;
        this._userMetadataPaths = userMetadataPaths;
        if ( new.target === SecurityPolicy ) {
            Object.freeze(this);
        }
	}

	get nodeIds() {
		return this._nodeIds;
	}

	get sourceIds() {
		return this._sourceIds;
	}

	get aggregations() {
		return this._aggregations;
	}

	get locationPrecisions() {
		return this._locationPrecisions;
	}

	get minAggregation() {
		return this._minAggregation;
	}

	get minLocationPrecision() {
		return this._minLocationPrecision;
	}

	get nodeMetadataPaths() {
		return this._nodeMetadataPaths;
	}

	get userMetadataPaths() {
		return this._userMetadataPaths;
	}

}

const MAX_AGGREGATION_CACHE = new Map(); // Map<string, Set<Aggregation>
const MAX_LOCATION_PRECISION_CACHE = new Map(); // Map<string, Set<LocationPrecision>

/**
 * A mutable builder object for {@link SecurityPolicy} instances.
 */
class SecurityPolicyBuilder {

       /**
         * Apply all properties from another SecurityPolicy.
         * 
         * @param {SecurityPolicy} [policy] the SecurityPolicy to apply
         * @returns {SecurityPolicyBuilder} this object
         */
		withPolicy(policy) {
			if ( policy ) {
				this.withAggregations(policy.aggregations)
                    .withMinAggregation(policy.minAggregation)
                    .withLocationPrecisions(policy.locationPrecisions)
                    .withMinLocationPrecision(policy.minLocationPrecision)
                    .withNodeIds(policy.nodeIds)
                    .withSourceIds(policy.sourceIds)
                    .withNodeMetadataPaths(policy.nodeMetadataPaths)
                    .withUserMetadataPaths(policy.userMetadataPaths);
			}
			return this;
		}

        /**
         * Merge all properties from another SecurityPolicy.
         * 
         * @param {SecurityPolicy} [policy] the SecurityPolicy to merge
         * @returns {SecurityPolicyBuilder} this object
         */
		withMergedPolicy(policy) {
			if ( policy ) {
				this.withMergedAggregations(policy.aggregations)
						.withMergedLocationPrecisions(policy.locationPrecisions)
						.withMergedNodeIds(policy.nodeIds)
						.withMergedSourceIds(policy.sourceIds)
						.withMergedNodeMetadataPaths(policy.nodeMetadataPaths)
						.withMergedUserMetadataPaths(policy.userMetadataPaths);
				if ( policy.minAggregation ) {
					this.withMinAggregation(policy.minAggregation);
				}
				if ( policy.minLocationPrecision ) {
					this.withMinLocationPrecision(policy.minLocationPrecision);
				}
			}
			return this;
		}

}

export default SecurityPolicy;
