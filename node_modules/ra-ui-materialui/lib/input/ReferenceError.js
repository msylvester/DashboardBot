'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReferenceError = function ReferenceError(_ref) {
    var label = _ref.label,
        error = _ref.error;
    return _react2.default.createElement(_TextField2.default, { error: true, disabled: true, label: label, value: error, margin: 'normal' });
};

ReferenceError.propTypes = {
    error: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
};

exports.default = ReferenceError;
module.exports = exports['default'];