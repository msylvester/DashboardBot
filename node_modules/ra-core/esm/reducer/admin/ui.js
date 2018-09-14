import _extends from 'babel-runtime/helpers/extends';
import { TOGGLE_SIDEBAR, SET_SIDEBAR_VISIBILITY, REFRESH_VIEW, START_OPTIMISTIC_MODE, STOP_OPTIMISTIC_MODE } from '../../actions';

var defaultState = {
    sidebarOpen: false,
    optimistic: false,
    viewVersion: 0
};

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case TOGGLE_SIDEBAR:
            return _extends({}, previousState, {
                sidebarOpen: !previousState.sidebarOpen
            });
        case SET_SIDEBAR_VISIBILITY:
            return _extends({}, previousState, { sidebarOpen: payload });
        case REFRESH_VIEW:
            return _extends({}, previousState, {
                viewVersion: previousState.viewVersion + 1
            });
        case START_OPTIMISTIC_MODE:
            return _extends({}, previousState, { optimistic: true });
        case STOP_OPTIMISTIC_MODE:
            return _extends({}, previousState, { optimistic: false });
        default:
            return previousState;
    }
});