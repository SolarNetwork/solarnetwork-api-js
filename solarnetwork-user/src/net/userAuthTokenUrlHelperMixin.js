import UrlHelper from 'net/urlHelper';
import UserUrlHelperMixin from 'net/userUrlHelperMixin'

/**
 * A mixin class that adds security token support to a SolarUser <code>UrlHelper</code>.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @preserve
 */
const UserAuthTokenUrlHelperMixin = (superclass) => class extends superclass {

    /**
     * Generate a URL for listing all available auth tokens.
     * 
	 * @returns {string} the URL
     */
    listAllAuthTokensUrl() {
        return this.baseUrl() + '/user/auth-tokens';
    }

    /**
     * Generate a URL for creating a new auth token via a <code>POST</code> request.
     * 
     * The request body accepts a {@link SecurityPolicy} JSON document.
     * 
     * @param {AuthTokenType} type the auth token type to generate
     */
    generateAuthTokenUrl(type) {
        return this.baseUrl() + '/usr/auth-tokens/generate/' +type.name;
    }

};

export default UserAuthTokenUrlHelperMixin;

/**
 * A concrete {@link UrlHelper} with the {@link UserAuthTokenUrlHelperMixin} and {@link UserUrlHelperMixin} mixins.
 * 
 * @class
 * @preserve
 */
export class UserAuthTokenUrlHelper extends UserAuthTokenUrlHelperMixin(UserUrlHelperMixin(UrlHelper)) {

 }
