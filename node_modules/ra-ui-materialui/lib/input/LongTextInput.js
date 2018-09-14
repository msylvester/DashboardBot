'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LongTextInput = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raCore = require('ra-core');

var _ResettableTextField = require('./ResettableTextField');

var _ResettableTextField2 = _interopRequireDefault(_ResettableTextField);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LongTextInput = function LongTextInput(_ref) {
    var className = _ref.className,
        input = _ref.input,
        meta = _ref.meta,
        isRequired = _ref.isRequired,
        label = _ref.label,
        options = _ref.options,
        source = _ref.source,
        resource = _ref.resource,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'input', 'meta', 'isRequired', 'label', 'options', 'source', 'resource']);

    if (typeof meta === 'undefined') {
        throw new Error("The LongTextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
    }
    var touched = meta.touched,
        error = meta.error;

    return _react2.default.createElement(_ResettableTextField2.default, (0, _extends3.default)({}, input, {
        className: className,
        multiline: true,
        margin: 'normal',
        label: _react2.default.createElement(_raCore.FieldTitle, {
            label: label,
            source: source,
            resource: resource,
            isRequired: isRequired
        }),
        error: !!(touched && error),
        helperText: touched && error
    }, (0, _sanitizeRestProps2.default)(rest), options));
};

exports.LongTextInput = LongTextInput;
LongTextInput.propTypes = {
    className: _propTypes2.default.string,
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    fullWidth: _propTypes2.default.bool,
    meta: _propTypes2.default.object,
    name: _propTypes2.default.string,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    validate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.func)])
};

var EnhancedLongTextInput = (0, _raCore.addField)(LongTextInput);
EnhancedLongTextInput.defaultProps = {
    options: {},
    fullWidth: true
};

exports.default = EnhancedLongTextInput;