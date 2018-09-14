'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.handleLocationChange = handleLocationChange;
exports.default = recordForm;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _formActions = require('../actions/formActions');

var _constants = require('../form/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(handleLocationChange),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(recordForm);

function handleLocationChange(_ref) {
    var state = _ref.payload.state;
    return _regenerator2.default.wrap(function handleLocationChange$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!(state && state.skipFormReset)) {
                        _context.next = 2;
                        break;
                    }

                    return _context.abrupt('return');

                case 2:
                    _context.next = 4;
                    return (0, _effects.put)((0, _formActions.resetForm)());

                case 4:
                    _context.next = 6;
                    return (0, _effects.put)((0, _reduxForm.destroy)(_constants.REDUX_FORM_NAME));

                case 6:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function recordForm() {
    return _regenerator2.default.wrap(function recordForm$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.takeEvery)(_reactRouterRedux.LOCATION_CHANGE, handleLocationChange);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}