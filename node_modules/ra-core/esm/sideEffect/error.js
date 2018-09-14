import _regeneratorRuntime from 'babel-runtime/regenerator';

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(handleResponse),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(_callee);

import { all, put, takeEvery } from 'redux-saga/effects';
import { CRUD_GET_ONE_SUCCESS } from '../actions/dataActions';
import { showNotification } from '../actions/notificationActions';

/**
 * Side effects for fetch responses
 *
 * Mostly corner case handling
 */
function handleResponse(_ref) {
    var type = _ref.type,
        requestPayload = _ref.requestPayload,
        payload = _ref.payload;
    return _regeneratorRuntime.wrap(function handleResponse$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.t0 = type;
                    _context.next = _context.t0 === CRUD_GET_ONE_SUCCESS ? 3 : 8;
                    break;

                case 3:
                    if (!(!('id' in payload.data) || payload.data.id != requestPayload.id)) {
                        _context.next = 7;
                        break;
                    }

                    _context.next = 6;
                    return put(showNotification('ra.notification.bad_item', 'warning'));

                case 6:
                    return _context.abrupt('return', _context.sent);

                case 7:
                    return _context.abrupt('break', 11);

                case 8:
                    _context.next = 10;
                    return all([]);

                case 10:
                    return _context.abrupt('return', _context.sent);

                case 11:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

export default function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return takeEvery(function (action) {
                        return action.meta && action.meta.fetchResponse;
                    }, handleResponse);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}