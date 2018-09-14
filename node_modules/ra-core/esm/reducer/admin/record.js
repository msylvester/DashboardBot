import _extends from 'babel-runtime/helpers/extends';
import { INITIALIZE_FORM, RESET_FORM } from '../../actions/formActions';
import set from 'lodash/set';

var initialState = {};

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    if (type === RESET_FORM) {
        return initialState;
    }

    if (type !== INITIALIZE_FORM) {
        return previousState;
    }

    return Object.keys(payload).reduce(function (acc, key) {
        // Ensure we correctly set default values for path with dot notation
        set(acc, key, payload[key]);
        return acc;
    }, _extends({}, previousState));
});