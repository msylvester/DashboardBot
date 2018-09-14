import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../../actions/notificationActions';
import { UNDO } from '../../actions/undoActions';

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case SHOW_NOTIFICATION:
            return previousState.concat(payload);
        case HIDE_NOTIFICATION:
        case UNDO:
            return previousState.slice(1);
        default:
            return previousState;
    }
});

/**
 * Returns the first available notification to show
 * @param {Object} state - Redux state
 */
export var getNotification = function getNotification(state) {
    return state.admin.notifications[0];
};