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
