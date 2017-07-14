import Enum from 'enum';

/**
 * An enumeration of instruction states.
 * 
 * @preserve
 */
export class InstructionState extends Enum {

    /**
     * Constructor.
     * 
     * @param {string} name the name
     */
    constructor(name) {
        super(name);
        if ( this.constructor === InstructionState ) {
            Object.freeze(this);
        }
    }

    /**
	 * Get the {@link InstructionStates} values.
	 * 
	 * @inheritdoc
	 */
	static enumValues() {
		return InstructionStateValues;
	}

}

const InstructionStateValues = Object.freeze([
	new InstructionState('Unknown'),
	new InstructionState('Queued'),
    new InstructionState('Received'),
    new InstructionState('Executing'),
    new InstructionState('Declined'),
    new InstructionState('Completed'),
]);

const InstructionStates = InstructionState.enumsValue(InstructionStateValues);

export default InstructionStates;
