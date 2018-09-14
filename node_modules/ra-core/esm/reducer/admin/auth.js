import _extends from 'babel-runtime/helpers/extends';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../../actions';

var initialState = { isLoggedIn: false };

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return _extends({}, previousState, { isLoggedIn: true });
        case USER_LOGOUT:
            return _extends({}, previousState, { isLoggedIn: false });
    }

    return previousState;
});

export var isLoggedIn = function isLoggedIn(state) {
    return state.isLoggedIn;
};