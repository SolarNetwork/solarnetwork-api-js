import Enum from 'enum';

export class AuthTokenType extends Enum {
    /**
     * Constructor.
     * 
     * @param {string} name the name
     */
    constructor(name) {
        super(name);
        if ( this.constructor === AuthTokenType ) {
            Object.freeze(this);
        }
    }

    /**
	 * Get the {@link AuthTokenTypes} values.
	 * 
	 * @inheritdoc
	 */
	static enumValues() {
		return AuthTokenTypeValues;
	}

}

const AuthTokenTypeValues = Object.freeze([
	new AuthTokenType('ReadNodeData'),
    new AuthTokenType('User'),
]);

const AuthTokenTypes = AuthTokenType.enumsValue(AuthTokenTypeValues);

export default AuthTokenTypes;
