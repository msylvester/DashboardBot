'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DateInput = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _raCore = require('ra-core');

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert Date object to String
 *
 * @param {Date} v value to convert
 * @returns {String} A standardized date (yyyy-MM-dd), to be passed to an <input type="date" />
 */
var dateFormatter = function dateFormatter(v) {
    if (!(v instanceof Date) || isNaN(v)) return;
    var pad = '00';
    var yyyy = v.getFullYear().toString();
    var MM = (v.getMonth() + 1).toString();
    var dd = v.getDate().toString();
    return yyyy + '-' + (pad + MM).slice(-2) + '-' + (pad + dd).slice(-2);
};

var dateRegex = /^\d{4}-\d{2}-\d{2}$/;

var sanitizeValue = function sanitizeValue(value) {
    // null, undefined and empty string values should not go through dateFormatter
    // otherwise, it returns undefined and will make the input an uncontrolled one.
    if (value == null || value === '') {
        return '';
    }
    // valid dates should not be converted
    if (dateRegex.test(value)) {
        return value;
    }

    var finalValue = (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) instanceof Date ? value : new Date(value);
    return dateFormatter(finalValue);
};

var DateInput = exports.DateInput = function (_Component) {
    (0, _inherits3.default)(DateInput, _Component);

    function DateInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DateInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
            _this.props.input.onChange(event.target.value);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DateInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                meta = _props.meta,
                input = _props.input,
                isRequired = _props.isRequired,
                label = _props.label,
                options = _props.options,
                source = _props.source,
                resource = _props.resource,
                rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'meta', 'input', 'isRequired', 'label', 'options', 'source', 'resource']);

            if (typeof meta === 'undefined') {
                throw new Error("The DateInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }
            var touched = meta.touched,
                error = meta.error;

            var value = sanitizeValue(input.value);

            return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({}, input, {
                className: className,
                type: 'date',
                margin: 'normal',
                error: !!(touched && error),
                helperText: touched && error,
                label: _react2.default.createElement(_raCore.FieldTitle, {
                    label: label,
                    source: source,
                    resource: resource,
                    isRequired: isRequired
                }),
                InputLabelProps: {
                    shrink: true
                }
            }, options, (0, _sanitizeRestProps2.default)(rest), {
                value: value,
                onChange: this.onChange
            }));
        }
    }]);
    return DateInput;
}(_react.Component);

DateInput.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string
};

DateInput.defaultProps = {
    options: {}
};

exports.default = (0, _raCore.addField)(DateInput);