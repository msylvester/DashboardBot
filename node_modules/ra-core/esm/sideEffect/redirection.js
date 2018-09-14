import _regeneratorRuntime from 'babel-runtime/regenerator';

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(handleRedirection),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(_callee);

import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';

import resolveRedirectTo from '../util/resolveRedirectTo';

/**
 * Redirection Side Effects
 */
export function handleRedirection(_ref) {
    var payload = _ref.payload,
        requestPayload = _ref.requestPayload,
        _ref$meta = _ref.meta,
        basePath = _ref$meta.basePath,
        redirectTo = _ref$meta.redirectTo;
    return _regeneratorRuntime.wrap(function handleRedirection$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!redirectTo) {
                        _context.next = 6;
                        break;
                    }

                    _context.next = 3;
                    return put(push(resolveRedirectTo(redirectTo, basePath, payload ? payload.id || (payload.data ? payload.data.id : null) : requestPayload ? requestPayload.id : null, payload && payload.data ? payload.data : requestPayload && requestPayload.data ? requestPayload.data : null)));

                case 3:
                    _context.t0 = _context.sent;
                    _context.next = 9;
                    break;

                case 6:
                    _context.next = 8;
                    return put(reset('record-form'));

                case 8:
                    _context.t0 = _context.sent;

                case 9:
                    return _context.abrupt('return', _context.t0);

                case 10:
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
                        return action.meta && typeof action.meta.redirectTo !== 'undefined';
                    }, handleRedirection);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}