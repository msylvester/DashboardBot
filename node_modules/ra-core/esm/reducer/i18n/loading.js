import { CHANGE_LOCALE, CHANGE_LOCALE_SUCCESS, CHANGE_LOCALE_FAILURE } from '../../actions/localeActions';

export default (function () {
    var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
        case CHANGE_LOCALE:
            return true;
        case CHANGE_LOCALE_SUCCESS:
        case CHANGE_LOCALE_FAILURE:
            return false;
        default:
            return loading;
    }
});