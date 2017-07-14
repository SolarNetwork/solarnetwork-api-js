import Enum from 'enum';

export class AuthTokenStatus extends Enum {
    /**
     * Constructor.
     * 
     * @param {string} name the name
     */
    constructor(name) {
        super(name);
        if ( this.constructor === AuthTokenStatus ) {
            Object.freeze(this);
        }
    }

    /**
	 * Get the {@link AuthTokenStatuses} values.
	 * 
	 * @inheritdoc
	 */
	static enumValues() {
		return AuthTokenStatusValues;
	}

}

const AuthTokenStatusValues = Object.freeze([
	new AuthTokenStatus('Active'),
    new AuthTokenStatus('Disabled'),
]);

const AuthTokenStatuses = AuthTokenStatus.enumsValue(AuthTokenStatusValues);

export default AuthTokenStatuses;
