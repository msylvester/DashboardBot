import _regeneratorRuntime from 'babel-runtime/regenerator';
import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import { showNotification, hideNotification } from '../actions/notificationActions';
import { USER_LOGIN, USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_CHECK, USER_LOGOUT } from '../actions/authActions';
import { FETCH_ERROR } from '../actions/fetchActions';
import { AUTH_LOGIN, AUTH_CHECK, AUTH_ERROR, AUTH_LOGOUT } from '../auth';
var nextPathnameSelector = function nextPathnameSelector(state) {
    var locationState = state.routing.location.state;
    return locationState && locationState.nextPathname;
};

var currentPathnameSelector = function currentPathnameSelector(state) {
    return state.routing.location;
};

export default (function (authProvider) {
    var _marked = /*#__PURE__*/_regeneratorRuntime.mark(handleAuth);

    if (!authProvider) return function () {
        return null;
    };
    function handleAuth(action) {
        var type, payload, error, meta, authPayload, redirectTo, errorMessage, nextPathname;
        return _regeneratorRuntime.wrap(function handleAuth$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = action.type, payload = action.payload, error = action.error, meta = action.meta;
                        _context.t0 = type;
                        _context.next = _context.t0 === USER_LOGIN ? 4 : _context.t0 === USER_CHECK ? 27 : _context.t0 === USER_LOGOUT ? 39 : _context.t0 === FETCH_ERROR ? 44 : 61;
                        break;

                    case 4:
                        _context.prev = 4;
                        _context.next = 7;
                        return put({ type: USER_LOGIN_LOADING });

                    case 7:
                        _context.next = 9;
                        return call(authProvider, AUTH_LOGIN, payload);

                    case 9:
                        authPayload = _context.sent;
                        _context.next = 12;
                        return put({
                            type: USER_LOGIN_SUCCESS,
                            payload: authPayload
                        });

                    case 12:
                        _context.next = 14;
                        return meta.pathName || select(nextPathnameSelector);

                    case 14:
                        redirectTo = _context.sent;
                        _context.next = 17;
                        return put(push(redirectTo || '/'));

                    case 17:
                        _context.next = 26;
                        break;

                    case 19:
                        _context.prev = 19;
                        _context.t1 = _context['catch'](4);
                        _context.next = 23;
                        return put({
                            type: USER_LOGIN_FAILURE,
                            error: _context.t1,
                            meta: { auth: true }
                        });

                    case 23:
                        errorMessage = typeof _context.t1 === 'string' ? _context.t1 : typeof _context.t1 === 'undefined' || !_context.t1.message ? 'ra.auth.sign_in_error' : _context.t1.message;
                        _context.next = 26;
                        return put(showNotification(errorMessage, 'warning'));

                    case 26:
                        return _context.abrupt('break', 61);

                    case 27:
                        _context.prev = 27;
                        _context.next = 30;
                        return call(authProvider, AUTH_CHECK, payload);

                    case 30:
                        _context.next = 38;
                        break;

                    case 32:
                        _context.prev = 32;
                        _context.t2 = _context['catch'](27);
                        _context.next = 36;
                        return call(authProvider, AUTH_LOGOUT);

                    case 36:
                        _context.next = 38;
                        return put(replace({
                            pathname: _context.t2 && _context.t2.redirectTo || '/login',
                            state: { nextPathname: meta.pathName }
                        }));

                    case 38:
                        return _context.abrupt('break', 61);

                    case 39:
                        _context.next = 41;
                        return put(push(action.payload && action.payload.redirectTo || '/login'));

                    case 41:
                        _context.next = 43;
                        return call(authProvider, AUTH_LOGOUT);

                    case 43:
                        return _context.abrupt('break', 61);

                    case 44:
                        _context.prev = 44;
                        _context.next = 47;
                        return call(authProvider, AUTH_ERROR, error);

                    case 47:
                        _context.next = 60;
                        break;

                    case 49:
                        _context.prev = 49;
                        _context.t3 = _context['catch'](44);
                        _context.next = 53;
                        return select(currentPathnameSelector);

                    case 53:
                        nextPathname = _context.sent;
                        _context.next = 56;
                        return call(authProvider, AUTH_LOGOUT);

                    case 56:
                        _context.next = 58;
                        return put(push({
                            pathname: '/login',
                            state: { nextPathname: nextPathname }
                        }));

                    case 58:
                        _context.next = 60;
                        return put(hideNotification());

                    case 60:
                        return _context.abrupt('break', 61);

                    case 61:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked, this, [[4, 19], [27, 32], [44, 49]]);
    }
    return (/*#__PURE__*/_regeneratorRuntime.mark(function watchAuthActions() {
            return _regeneratorRuntime.wrap(function watchAuthActions$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return all([takeEvery(function (action) {
                                return action.meta && action.meta.auth;
                            }, handleAuth), takeEvery(FETCH_ERROR, handleAuth)]);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, watchAuthActions, this);
        })
    );
});