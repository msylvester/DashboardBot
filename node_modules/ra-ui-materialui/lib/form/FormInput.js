'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormInput = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _styles = require('@material-ui/core/styles');

var _Labeled = require('../input/Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        record = _ref.record,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'record']);
    return rest;
};

var styles = function styles(theme) {
    return {
        input: { width: theme.spacing.unit * 32 }
    };
};

var FormInput = function FormInput(_ref2) {
    var classes = _ref2.classes,
        input = _ref2.input,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['classes', 'input']);
    return input ? _react2.default.createElement(
        'div',
        {
            className: (0, _classnames4.default)('ra-input', 'ra-input-' + input.props.source, input.props.formClassName)
        },
        input.props.addLabel ? _react2.default.createElement(
            _Labeled2.default,
            (0, _extends3.default)({}, input.props, sanitizeRestProps(rest)),
            _react2.default.cloneElement(input, (0, _extends3.default)({
                className: (0, _classnames4.default)((0, _defineProperty3.default)({}, classes.input, !input.props.fullWidth), input.props.className)
            }, rest))
        ) : _react2.default.cloneElement(input, (0, _extends3.default)({
            className: (0, _classnames4.default)((0, _defineProperty3.default)({}, classes.input, !input.props.fullWidth), input.props.className)
        }, rest))
    ) : null;
};

exports.FormInput = FormInput;
FormInput.propTypes = {
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    input: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles)(FormInput);