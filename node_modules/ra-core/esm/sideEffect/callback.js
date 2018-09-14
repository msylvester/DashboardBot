import _regeneratorRuntime from 'babel-runtime/regenerator';

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(handleCallback),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(_callee);

import { call, takeEvery } from 'redux-saga/effects';

/**
 * Callback Side Effects
 */
function handleCallback(_ref) {
    var payload = _ref.payload,
        requestPayload = _ref.requestPayload,
        callback = _ref.meta.callback;
    return _regeneratorRuntime.wrap(function handleCallback$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return call(callback, { payload: payload, requestPayload: requestPayload });

                case 2:
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
                        return action.meta && action.meta.callback;
                    }, handleCallback);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}