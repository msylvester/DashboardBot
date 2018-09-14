import _extends from 'babel-runtime/helpers/extends';
export var USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS';
export var USER_LOGIN = 'RA/USER_LOGIN';
export var USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING';
export var USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE';
export var USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS';

export var userLogin = function userLogin(payload, pathName) {
    return {
        type: USER_LOGIN,
        payload: payload,
        meta: { auth: true, pathName: pathName }
    };
};

export var USER_CHECK = 'RA/USER_CHECK';

export var userCheck = function userCheck(payload, pathName, routeParams) {
    return {
        type: USER_CHECK,
        payload: _extends({}, payload, {
            routeParams: routeParams
        }),
        meta: { auth: true, pathName: pathName }
    };
};

export var USER_LOGOUT = 'RA/USER_LOGOUT';

/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
export var userLogout = function userLogout(redirectTo) {
    return {
        type: USER_LOGOUT,
        payload: {
            redirectTo: redirectTo
        },
        meta: { auth: true }
    };
};