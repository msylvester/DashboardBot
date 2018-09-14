'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormFieldView = exports.isRequired = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _withDefaultValue = require('./withDefaultValue');

var _withDefaultValue2 = _interopRequireDefault(_withDefaultValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isRequired = exports.isRequired = function isRequired(validate) {
    if (validate && validate.isRequired) return true;
    if (Array.isArray(validate)) {
        return !!validate.find(function (it) {
            return it.isRequired;
        });
    }
    return false;
};

var FormFieldView = function FormFieldView(_ref) {
    var input = _ref.input,
        props = (0, _objectWithoutProperties3.default)(_ref, ['input']);
    return input ? // An ancestor is already decorated by Field
    _react2.default.createElement(props.component, (0, _extends3.default)({ input: input }, props)) : _react2.default.createElement(_reduxForm.Field, (0, _extends3.default)({}, props, {
        name: props.source,
        isRequired: isRequired(props.validate)
    }));
};

exports.FormFieldView = FormFieldView;
FormFieldView.propTypes = {
    component: _propTypes2.default.any.isRequired,
    defaultValue: _propTypes2.default.any,
    input: _propTypes2.default.object,
    source: _propTypes2.default.string,
    validate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.array])
};

exports.default = (0, _withDefaultValue2.default)(FormFieldView);