import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

/**
 * An Input component for a number
 *
 * @example
 * <NumberInput source="nb_views" />
 *
 * You can customize the `step` props (which defaults to "any")
 * @example
 * <NumberInput source="nb_views" step={1} />
 *
 * The object passed as `options` props is passed to the material-ui <TextField> component
 */
export var NumberInput = function (_Component) {
    _inherits(NumberInput, _Component);

    function NumberInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NumberInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleBlur = function (event) {
            /**
             * Necessary because of a React bug on <input type="number">
             * @see https://github.com/facebook/react/issues/1425
             */
            var numericValue = isNaN(parseFloat(event.target.value)) ? null : parseFloat(event.target.value);
            _this.props.onBlur(numericValue);
            _this.props.input.onBlur(numericValue);
        }, _this.handleFocus = function (event) {
            _this.props.onFocus(event);
            _this.props.input.onFocus(event);
        }, _this.handleChange = function (event) {
            /**
             * Necessary because of a React bug on <input type="number">
             * @see https://github.com/facebook/react/issues/1425
             */
            var numericValue = isNaN(parseFloat(event.target.value)) ? null : parseFloat(event.target.value);
            _this.props.onChange(numericValue);
            _this.props.input.onChange(numericValue);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NumberInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                input = _props.input,
                isRequired = _props.isRequired,
                label = _props.label,
                meta = _props.meta,
                options = _props.options,
                source = _props.source,
                step = _props.step,
                resource = _props.resource,
                rest = _objectWithoutProperties(_props, ['className', 'input', 'isRequired', 'label', 'meta', 'options', 'source', 'step', 'resource']);

            if (typeof meta === 'undefined') {
                throw new Error("The NumberInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }
            var touched = meta.touched,
                error = meta.error;


            return React.createElement(TextField, _extends({
                type: 'number',
                margin: 'normal',
                error: !!(touched && error),
                helperText: touched && error,
                step: step,
                label: React.createElement(FieldTitle, {
                    label: label,
                    source: source,
                    resource: resource,
                    isRequired: isRequired
                }),
                className: className
            }, options, sanitizeRestProps(rest), input, {
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onChange: this.handleChange
            }));
        }
    }]);

    return NumberInput;
}(Component);

NumberInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)])
};

NumberInput.defaultProps = {
    onBlur: function onBlur() {},
    onChange: function onChange() {},
    onFocus: function onFocus() {},
    options: {},
    step: 'any',
    textAlign: 'right'
};

export var NumberInputWithField = addField(NumberInput);
NumberInputWithField.defaultProps = {
    textAlign: 'right'
};

export default NumberInputWithField;