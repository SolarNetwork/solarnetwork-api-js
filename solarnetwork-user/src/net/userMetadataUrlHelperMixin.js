import UrlHelper from 'net/urlHelper';
import UserUrlHelperMixin from 'net/userUrlHelperMixin'

/**
 * A mixin class that adds user metadata support to <code>UrlHelper</code>.
 * 
 * @param {UrlHelper} superclass the UrlHelper class to mix onto 
 * @mixin
 */
const UserMetadataUrlHelperMixin = (superclass) => class extends superclass {

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
