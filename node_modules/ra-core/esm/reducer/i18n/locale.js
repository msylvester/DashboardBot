import { DEFAULT_LOCALE } from '../../i18n/index';
import { CHANGE_LOCALE_SUCCESS } from '../../actions/localeActions';

export default (function () {
    var initialLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_LOCALE;
    return function () {
        var previousLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialLocale;
        var _ref = arguments[1];
        var type = _ref.type,
            payload = _ref.payload;

        switch (type) {
            case CHANGE_LOCALE_SUCCESS:
                return payload.locale;
            default:
                return previousLocale;
        }
    };
});