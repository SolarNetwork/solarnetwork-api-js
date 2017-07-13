import UrlHelper from 'net/urlHelper';
import NodeUrlHelperMixin from 'net/nodeUrlHelperMixin';
import UserUrlHelperMixin from 'net/userUrlHelperMixin'

export const InstructionState = Object.freeze({
	UNKNOWN: '',
	QUEUED: 'Queued',
	RECEIVED: 'Received',
	EXECUTING: 'Executing',
	DECLINED: 'Declined',
	COMPLETED: 'Completed',
});

/**
 * A mixin class that adds SolarNode instruction support to {@code UrlHelper}.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @preserve
 */
const NodeInstructionUrlHelperMixin = (superclass) => class extends superclass {

	/**
	 * Generate a URL to get all details for a specific instruction.
	 * 
	 * @param {number} instructionId the instruction ID to get
	 */
	viewInstructionUrl(instructionId) {
		return (this.baseUrl() +'/instr/view?id=' +encodeURIComponent(instructionId));
	}

	/**
	 * Generate a URL for viewing active instructions.
	 * 
	 * @param {number} [nodeId] a specific node ID to use; if not provided the {@code nodeId} property of this class will be used
	 */
	viewActiveInstructionsUrl(nodeId) {
		return (this.baseUrl() +'/instr/viewActive?nodeId=' 
			+(nodeId || this.nodeId));
	}

	/**
	 * Generate a URL for viewing pending instructions.
	 * 
	 * @param {number} [nodeId] a specific node ID to use; if not provided the {@code nodeId} property of this class will be used
	 * @returns {string} the URL
	 */
	viewPendingInstructionsUrl(nodeId) {
		return (this.baseUrl() +'/instr/viewPending?nodeId=' 
			+(nodeId || this.nodeId));
	}

	/**
	 * Generate a URL for changing the state of an instruction.
	 * 
	 * @param {number} instructionId the instruction ID to update
	 * @param {string} state the instruction state to set
	 * @returns {string} the URL
	 * @see the {@link #InstructionState} enum for possible state values
	 */
	updateInstructionStateUrl(instructionId, state) {
		return (this.baseUrl()
			+'/instr/updateState?id=' +encodeURIComponent(instructionId)
			+'&state=' +encodeURIComponent(state));
	}

	/**
	 * Generate a URL for posting an instruction request.
	 *
	 * @param {string} topic the instruction topic.
	 * @param {Object[]} [parameters] an array of parameter objects in the form <code>{name:n1, value:v1}</code>.
	 * @param {number} [nodeId] a specific node ID to use; if not provided the {@code nodeId} property of this class will be used
	 * @returns {string} the URL
	 * @preserve
	 */
	queueInstructionUrl(topic, parameters, nodeId) {
		var url = (this.baseUrl()
			+'/instr/add?nodeId=' +(nodeId || this.nodeId)
			+'&topic=' +encodeURIComponent(topic));
		var i, len;
		if ( Array.isArray(parameters) ) {
			for ( i = 0, len = parameters.length; i < len; i++ ) {
				url += '&' +encodeURIComponent('parameters['+i+'].name') +'=' +encodeURIComponent(parameters[i].name)
					+ '&' +encodeURIComponent('parameters['+i+'].value') +'=' +encodeURIComponent(parameters[i].value);
			}
		}
		return url;
	}

	/**
	 * Create an instruction parameter suitable to passing to {@link #queueInstructionUrl}.
	 * 
	 * @param {string} name the parameter name 
	 * @param {*} value the parameter value
	 * @returns {object} with {@code name} and {@code value} properties
	 * @preserve
	 */
	static instructionParameter(name, value) {
		return {name:name, value:value};
	}
};

export default NodeInstructionUrlHelperMixin;

/**
 * A concrete {@link UrlHelper} with the {@link NodeInstructionUrlHelperMixin},  {@link UserUrlHelperMixin}, and
 * {@link #NodeUrlHelperMixin} mixins.
 * 
 * @class
 * @preserve
 */
export class NodeInstructionUrlHelper extends NodeInstructionUrlHelperMixin(UserUrlHelperMixin(NodeUrlHelperMixin(UrlHelper))) {

}

/**
 * The static {@link NodeInstructionUrlHelperMixin#instructionParameter} method so it can be imported directly.
 */
export const instructionParameter = NodeInstructionUrlHelper.instructionParameter;
