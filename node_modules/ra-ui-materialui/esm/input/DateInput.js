import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _typeof from 'babel-runtime/helpers/typeof';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

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

    var finalValue = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) instanceof Date ? value : new Date(value);
    return dateFormatter(finalValue);
};

export var DateInput = function (_Component) {
    _inherits(DateInput, _Component);

    function DateInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DateInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
            _this.props.input.onChange(event.target.value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DateInput, [{
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
                rest = _objectWithoutProperties(_props, ['className', 'meta', 'input', 'isRequired', 'label', 'options', 'source', 'resource']);

            if (typeof meta === 'undefined') {
                throw new Error("The DateInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }
            var touched = meta.touched,
                error = meta.error;

            var value = sanitizeValue(input.value);

            return React.createElement(TextField, _extends({}, input, {
                className: className,
                type: 'date',
                margin: 'normal',
                error: !!(touched && error),
                helperText: touched && error,
                label: React.createElement(FieldTitle, {
                    label: label,
                    source: source,
                    resource: resource,
                    isRequired: isRequired
                }),
                InputLabelProps: {
                    shrink: true
                }
            }, options, sanitizeRestProps(rest), {
                value: value,
                onChange: this.onChange
            }));
        }
    }]);

    return DateInput;
}(Component);

DateInput.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string
};

DateInput.defaultProps = {
    options: {}
};

export default addField(DateInput);