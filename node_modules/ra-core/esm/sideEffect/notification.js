import _regeneratorRuntime from 'babel-runtime/regenerator';

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(handleNotification),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(_callee);

import { put, takeEvery } from 'redux-saga/effects';
import { showNotification } from '../actions/notificationActions';

/**
 * Notification Side Effects
 */
function handleNotification(_ref) {
    var error = _ref.error,
        _ref$meta = _ref.meta,
        notification = _ref$meta.notification,
        optimistic = _ref$meta.optimistic;

    var body, level, _notification$message, messageArgs;

    return _regeneratorRuntime.wrap(function handleNotification$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    body = notification.body, level = notification.level, _notification$message = notification.messageArgs, messageArgs = _notification$message === undefined ? {} : _notification$message;

                    if (!error) {
                        _context.next = 5;
                        break;
                    }

                    _context.next = 4;
                    return put(showNotification(typeof error === 'string' ? error : error.message || body, level || 'warning', {
                        messageArgs: messageArgs,
                        undoable: false
                    }));

                case 4:
                    return _context.abrupt('return', _context.sent);

                case 5:
                    _context.next = 7;
                    return put(showNotification(body, level || 'info', {
                        messageArgs: messageArgs,
                        undoable: optimistic
                    }));

                case 7:
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
                        return action.meta && action.meta.notification;
                    }, handleNotification);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}