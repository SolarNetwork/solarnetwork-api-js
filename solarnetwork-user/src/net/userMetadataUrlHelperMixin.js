import UrlHelper from 'net/urlHelper';
import UserUrlHelperMixin from 'net/userUrlHelperMixin'

/**
 * A mixin class that adds user metadata support to <code>UrlHelper</code>.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @mixin
 */
const UserMetadataUrlHelperMixin = (superclass) => class extends superclass {

    /**
	 * Generate a URL for viewing the configured user's metadata via a <code>GET</code> request.
	 *
	 * @param {number|number[]|null} [userId] a specific user ID (or set of IDs);
     *                                        if not provided the <code>userIds</code> property of this class will be used;
     *                                        if <code>null</code> then get the metadata for the requesting user
	 * @returns {string} the URL
     * @memberof UserMetadataUrlHelperMixin#
	 */
	viewUserMetadataUrl(userId) {
        let result = this.baseUrl() +'/users/meta';
        let userIds = (userId || this.userIds);
        if ( userIds && userId !== null ) {
            if ( Array.isArray(userIds) ) {
                if ( userIds.length > 1 ) {
                    result += '?userIds=' +userIds.join(',');
                } else {
                    result += '?userId=' +userIds[0];
                }
            } else {
                result += '?userId=' +userIds;
            }
        }
        return result;
	}
}

export default UserMetadataUrlHelperMixin;

/**
 * A concrete {@link UrlHelper} with the {@link UserMetadataUrlHelperMixin} and  {@link UserUrlHelperMixin} mixins.
 * 
 * @mixes UserMetadataUrlHelperMixin
 * @mixes UserUrlHelperMixin
 * @extends UrlHelper
 */
export class UserMetadataUrlHelper extends UserMetadataUrlHelperMixin(UserUrlHelperMixin(UrlHelper)) {

}
