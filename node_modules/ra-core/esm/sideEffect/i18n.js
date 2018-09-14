import _regeneratorRuntime from 'babel-runtime/regenerator';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CHANGE_LOCALE, changeLocaleSuccess, changeLocaleFailure } from '../actions';

export default (function (i18nProvider) {
    var _marked = /*#__PURE__*/_regeneratorRuntime.mark(loadMessages);

    function loadMessages(action) {
        var locale, messages;
        return _regeneratorRuntime.wrap(function loadMessages$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        locale = action.payload;
                        _context.prev = 1;
                        _context.next = 4;
                        return call(i18nProvider, locale);

                    case 4:
                        messages = _context.sent;
                        _context.next = 7;
                        return put(changeLocaleSuccess(locale, messages));

                    case 7:
                        _context.next = 13;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](1);
                        _context.next = 13;
                        return put(changeLocaleFailure(action.payload.locale, _context.t0));

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked, this, [[1, 9]]);
    }
    return (/*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return all([takeLatest(CHANGE_LOCALE, loadMessages)]);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee, this);
        })
    );
});