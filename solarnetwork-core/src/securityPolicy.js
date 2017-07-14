import { Aggregation } from 'aggregation';
import { LocationPrecision } from 'locationPrecision';

/**
 * Get a Set from a Set or array or object, returning <code>null</code> if the set would be empty.
 * 
 * @param {*[]|Set<*>} obj the array, Set, or singleton object to get as a Set
 * @returns {Set<*>} the Set, or <code>null</code>
 */
function setOrNull(obj) {
	let result = null;
	if ( obj instanceof Set ) {
		result = (obj.size > 0 ? obj : null);
	} else if ( Array.isArray(obj) ) {
		result = (obj.length > 0 ? new Set(obj) : null);
	} else if ( obj ) {
		result = new Set([obj]);
	}
	return result;
}

/**
 * Merge two sets.
 * 
 * @param {*[]|Set<*>} [set1] the first set 
 * @param {*[]|Set<*>} [set2] the second set 
 * @returns {Set<*>} the merged Set, or <code>null</code> if neither arguments are sets or 
 *                   neither argument have any values
 */
function mergedSets(set1, set2) {
	let s1 = setOrNull(set1);
	let s2 = setOrNull(set2);
	if ( s1 === null && s2 === null ) {
		return null;
	} else if ( s2 === null ) {
		return s1;
	} else if ( s1 === null ) {
		return s2;
	} else {
		for ( let v of s2.values() ) {
			s1.add(v);
		}
		return s1;
	}
}


/**
 * A set of security restrictions that can be attached to other objects, like auth tokens.
 * 
 * @preserve
 */
class SecurityPolicy {

	/**
	 * Constructor.
	 * 
	 * @param {number[]|Set<number>} [nodeIds] the node IDs to restrict to, or <code>null</code> for no restriction
	 * @param {string[]|Set<string>} [sourceIds] the source ID to restrict to, or <code>null</code> for no restriction
	 * @param {Aggregation[]|Set<Aggregation>} [aggregations] the aggregation names to restrict to, or <code>null</code> for no restriction
	 * @param {Aggregation} [minAggregation] if specified, a minimum aggregation level that is allowed
	 * @param {Set<LocationPrecision>} [locationPrecisions] the location precision names to restrict to, or <code>null</code> for no restriction
	 * @param {LocationPrecision} [minLocationPrecision] if specified, a minimum location precision that is allowed
	 * @param {Set<string>} [nodeMetadataPaths] the <code>SolarNodeMetadata</code> paths to restrict to, or <code>null</code> for no restriction
	 * @param {Set<string>} [userMetadataPaths] the <code>UserNodeMetadata</code> paths to restrict to, or <code>null</code> for no restriction
	 * @preserve
	 */
    constructor(nodeIds, sourceIds, aggregations, minAggregation, locationPrecisions,
			minLocationPrecision, nodeMetadataPaths, userMetadataPaths) {
		this._nodeIds = setOrNull(nodeIds);
		this._sourceIds = setOrNull(sourceIds);
		this._aggregations = setOrNull(aggregations);
		this._minAggregation = (minAggregation instanceof Aggregation ? minAggregation : null);
		this._locationPrecisions = setOrNull(locationPrecisions);
		this._minLocationPrecision = (minLocationPrecision instanceof LocationPrecision ? minLocationPrecision : null);
		this._nodeMetadataPaths = setOrNull(nodeMetadataPaths);
        this._userMetadataPaths = setOrNull(userMetadataPaths);
        if ( new.target === SecurityPolicy ) {
            Object.freeze(this);
        }
	}

	/**
	 * Get the node IDs.
	 * 
	 * @returns {Set<number>} the node IDs, or <code>null</code>
	 * @preserve
	 */
	get nodeIds() {
		return this._nodeIds;
	}

	/**
	 * Get the source IDs.
	 * 
	 * @returns {Set<string>} the source IDs, or <code>null</code>
	 * @preserve
	 */
	get sourceIds() {
		return this._sourceIds;
	}

	/**
	 * Get the aggregations.
	 * 
	 * @returns {Set<Aggregation>} the aggregations, or <code>null</code>
	 * @preserve
	 */
	get aggregations() {
		return this._aggregations;
	}

	/**
	 * Get the location precisions.
	 * 
	 * @returns {Set<LocationPrecision>} the precisions, or <code>null</code>
	 * @preserve
	 */
	get locationPrecisions() {
		return this._locationPrecisions;
	}

	/**
	 * Get the minimum aggregation.
	 * 
	 * @returns {Aggregation} the minimum aggregation, or <code>null</code>
	 * @preserve
	 */
	get minAggregation() {
		return this._minAggregation;
	}

	/**
	 * Get the minimum location precision.
	 * 
	 * @returns {LocationPrecision} the minimum precision, or <code>null</code>
	 * @preserve
	 */
	get minLocationPrecision() {
		return this._minLocationPrecision;
	}

	/**
	 * Get the node metadata paths.
	 * 
	 * @returns {Set<string>} the node metadata paths, or <code>null</code>
	 * @preserve
	 */
	get nodeMetadataPaths() {
		return this._nodeMetadataPaths;
	}

	/**
	 * Get the user metadata paths.
	 * 
	 * @returns {Set<string>} the user metadata paths, or <code>null</code>
	 * @preserve
	 */
	get userMetadataPaths() {
		return this._userMetadataPaths;
	}

}

const MIN_AGGREGATION_CACHE = new Map(); // Map<string, Set<Aggregation>>
const MIN_LOCATION_PRECISION_CACHE = new Map(); // Map<string, Set<LocationPrecision>>

/**
 * A mutable builder object for {@link SecurityPolicy} instances.
 * 
 * @preserve
 */
export class SecurityPolicyBuilder {

	/**
	 * Apply all properties from another SecurityPolicy.
	 * 
	 * @param {SecurityPolicy} [policy] the SecurityPolicy to apply
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
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
	 * @preserve
	 */
	addPolicy(policy) {
		if ( policy ) {
			this.addAggregations(policy.aggregations)
					.addLocationPrecisions(policy.locationPrecisions)
					.addNodeIds(policy.nodeIds)
					.addSourceIds(policy.sourceIds)
					.addNodeMetadataPaths(policy.nodeMetadataPaths)
					.addUserMetadataPaths(policy.userMetadataPaths);
			if ( policy.minAggregation ) {
				this.withMinAggregation(policy.minAggregation);
			}
			if ( policy.minLocationPrecision ) {
				this.withMinLocationPrecision(policy.minLocationPrecision);
			}
		}
		return this;
	}

	/**
	 * Set the node IDs.
	 * 
	 * @param {number[]|Set<number>} nodeIds the node IDs to use
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	withNodeIds(nodeIds) {
		this.nodeIds = setOrNull(nodeIds);
		return this;
	}

	/**
	 * Add a set of node IDs.
	 * 
	 * @param {number[]|Set<number>} nodeIds the node IDs to add
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	addNodeIds(nodeIds) {
		return this.withNodeIds(mergedSets(this.nodeIds, nodeIds));
	}

	/**
	 * Set the node metadata paths.
	 * 
	 * @param {string[]|Set<string>} nodeMetadataPaths the path expressions to use
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	withNodeMetadataPaths(nodeMetadataPaths) {
		this.nodeMetadataPaths = setOrNull(nodeMetadataPaths);
		return this;
	}

	/**
	 * Add a set of node metadata paths.
	 * 
	 * @param {string[]|Set<string>} nodeMetadataPaths the path expressions to add
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	addNodeMetadataPaths(nodeMetadataPaths) {
		return this.withNodeMetadataPaths(mergedSets(this.nodeMetadataPaths, nodeMetadataPaths));
	}

	/**
	 * Set the user metadata paths.
	 * 
	 * @param {string[]|Set<string>} userMetadataPaths the path expressions to use
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	withUserMetadataPaths(userMetadataPaths) {
		this.userMetadataPaths = setOrNull(userMetadataPaths);
		return this;
	}

	/**
	 * Add a set of user metadata paths.
	 * 
	 * @param {string[]|Set<string>} userMetadataPaths the path expressions to add
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	addUserMetadataPaths(userMetadataPaths) {
		return this.withUserMetadataPaths(mergedSets(this.userMetadataPaths, userMetadataPaths));
	}

	/**
	 * Set the source IDs.
	 * 
	 * @param {string[]|Set<string>} sourceIds the source IDs to use
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	withSourceIds(sourceIds) {
		this.sourceIds = setOrNull(sourceIds);
		return this;
	}

	/**
	 * Add source IDs.
	 * 
	 * @param {string[]|Set<string>} sourceIds the source IDs to add
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	addSourceIds(sourceIds) {
		return this.withSourceIds(mergedSets(this.sourceIds, sourceIds));
	}

	/**
	 * Set the aggregations.
	 * 
	 * @param {Aggregation[]|Set<Aggregation>} aggregations the aggregations to use
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	withAggregations(aggregations) {
		this.aggregations = setOrNull(aggregations);
		return this;
	}

	/**
	 * Set the aggregations.
	 * 
	 * @param {Aggregation[]|Set<Aggregation>} aggregations the aggregations to add
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	addAggregations(aggregations) {
		return this.withAggregations(mergedSets(this.aggregations, aggregations));
	}

	/**
	 * Set the location precisions.
	 * 
	 * @param {LocationPrecision[]|Set<LocationPrecision>} locationPrecisions the precisions to use
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	withLocationPrecisions(locationPrecisions) {
		this.locationPrecisions = setOrNull(locationPrecisions);
		return this;
	}

	/**
	 * Add location precisions.
	 * 
	 * @param {LocationPrecision[]|Set<LocationPrecision>} locationPrecisions the precisions to add
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	addLocationPrecisions(locationPrecisions) {
		return this.withLocationPrecisions(mergedSets(this.locationPrecisions, locationPrecisions));
	}

	/**
	 * Set a minimum aggregation level.
	 * 
	 * @param {Aggregation} minAggregation the minimum aggregation level to set
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	withMinAggregation(minAggregation) {
		this.minAggregation = minAggregation;
		return this;
	}

	/**
	 * Build the effective aggregation level set from the policy settings.
	 * 
	 * This computes a set of aggregation levels based on the configured <code>minAggregation</code>
	 * and <code>aggregations</code> values.
	 * 
	 * @returns {Set<Aggregation>} the aggregation set
	 * @private
	 */
	buildAggregations() {
		const minAggregation = this.minAggregation;
		const aggregations = this.aggregations;
		if ( !minAggregation && aggregations && aggregations.size > 0 ) {
			return aggregations;
		} else if ( !minAggregation ) {
			return null;
		}
		return Aggregation.minimumEnumSet(minAggregation, MIN_AGGREGATION_CACHE);
	}

	/**
	 * Treat the configured <code>locationPrecisions</code> set as a single
	 * minimum value or a list of exact values.
	 * 
	 * By default if <code>locationPrecisions</code> is configured with a single
	 * value it will be treated as a <em>minimum</em> value, and any
	 * {@link LocationPrecision} with a {@link LocationPrecision#precision} equal 
	 * to or higher than that value's level will be included in the generated
	 * {@link SecurityPolicy#locationPrecisions} set. Set this to
	 * <code>null</code> to disable that behavior and treat
	 * <code>locationPrecisions</code> as the exact values to include in the
	 * generated {@link SecurityPolicy#locationPrecisions} set.
	 * 
	 * @param {LocationPrecision|null} minLocationPrecision
	 *        <code>null</code> to treat configured location precision values
	 *        as-is, or else the minimum threshold
	 * @returns {SecurityPolicyBuilder} this object
	 * @preserve
	 */
	withMinLocationPrecision(minLocationPrecision) {
		this.minLocationPrecision = minLocationPrecision;
		return this;
	}

	/**
	 * Build the effective aggregation level set from the policy settings.
	 * 
	 * This computes a set of location precision levels based on the configured <code>minLocationPrecision</code>
	 * and <code>locationPrecisions</code> values.
	 * 
	 * @returns {Set<LocationPrecision>} the precision set
	 * @private
	 */
	buildLocationPrecisions() {
		const minLocationPrecision = this.minLocationPrecision;
		const locationPrecisions = this.locationPrecisions;
		if ( !minLocationPrecision && locationPrecisions && locationPrecisions.size > 0 ) {
			return locationPrecisions;
		} else if ( !minLocationPrecision ) {
			return null;
		}
		return LocationPrecision.minimumEnumSet(minLocationPrecision, MIN_LOCATION_PRECISION_CACHE);
	}

	/**
	 * Create a new {@link SecurityPolicy} out of the properties configured on this builder.
	 * 
	 * @returns {SecurityPolicy} the new policy instance
	 * @preserve
	 */
	build() {
		return new SecurityPolicy(this.nodeIds, this.sourceIds, 
				this.buildAggregations(), this.minAggregation,
				this.buildLocationPrecisions(), this.minLocationPrecision,
				this.nodeMetadataPaths, this.userMetadataPaths);
	}
}

export default SecurityPolicy;
