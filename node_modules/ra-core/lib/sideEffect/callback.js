'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = _callee;

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(handleCallback),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(_callee);

/**
 * Callback Side Effects
 */
function handleCallback(_ref) {
    var payload = _ref.payload,
        requestPayload = _ref.requestPayload,
        callback = _ref.meta.callback;
    return _regenerator2.default.wrap(function handleCallback$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _effects.call)(callback, { payload: payload, requestPayload: requestPayload });

                case 2:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.takeEvery)(function (action) {
                        return action.meta && action.meta.callback;
                    }, handleCallback);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}
module.exports = exports['default'];