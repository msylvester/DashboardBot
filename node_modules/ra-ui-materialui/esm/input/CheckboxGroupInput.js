import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { addField, translate, FieldTitle } from 'ra-core';

import defaultSanitizeRestProps from './sanitizeRestProps';
var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var setFilter = _ref.setFilter,
        setPagination = _ref.setPagination,
        setSort = _ref.setSort,
        rest = _objectWithoutProperties(_ref, ['setFilter', 'setPagination', 'setSort']);

    return defaultSanitizeRestProps(rest);
};

var styles = function styles(theme) {
    return {
        root: {},
        label: {
            transform: 'translate(0, 5px) scale(0.75)',
            transformOrigin: 'top ' + (theme.direction === 'ltr' ? 'left' : 'right')
        }
    };
};

/**
 * An Input component for a checkbox group, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * The expected input must be an array of identifiers (e.g. [12, 31]) which correspond to
 * the 'optionValue' of 'choices' attribute objects.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *     { id: 12, name: 'Ray Hakt' },
 *     { id: 31, name: 'Ann Gullar' },
 *     { id: 42, name: 'Sean Phonee' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi' },
 *    { _id: 456, full_name: 'Jane Austen' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.category.programming' },
 *    { id: 'lifestyle', name: 'myroot.category.lifestyle' },
 *    { id: 'photography', name: 'myroot.category.photography' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <CheckboxGroupInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <Checkbox> components
 */
export var CheckboxGroupInput = function (_Component) {
    _inherits(CheckboxGroupInput, _Component);

    function CheckboxGroupInput() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, CheckboxGroupInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = CheckboxGroupInput.__proto__ || Object.getPrototypeOf(CheckboxGroupInput)).call.apply(_ref2, [this].concat(args))), _this), _this.handleCheck = function (event, isChecked) {
            var _this$props$input = _this.props.input,
                value = _this$props$input.value,
                onChange = _this$props$input.onChange;

            var newValue = void 0;
            try {
                // try to convert string value to number, e.g. '123'
                newValue = JSON.parse(event.target.value);
            } catch (e) {
                // impossible to convert value, e.g. 'abc'
                newValue = event.target.value;
            }
            if (isChecked) {
                onChange([].concat(_toConsumableArray(value), [newValue]));
            } else {
                onChange(value.filter(function (v) {
                    return v != newValue;
                }));
            }
        }, _this.renderCheckbox = function (choice) {
            var _this$props = _this.props,
                value = _this$props.input.value,
                optionText = _this$props.optionText,
                optionValue = _this$props.optionValue,
                options = _this$props.options,
                translate = _this$props.translate,
                translateChoice = _this$props.translateChoice;

            var choiceName = React.isValidElement(optionText) // eslint-disable-line no-nested-ternary
            ? React.cloneElement(optionText, { record: choice }) : typeof optionText === 'function' ? optionText(choice) : get(choice, optionText);
            return React.createElement(FormControlLabel, {
                key: get(choice, optionValue),
                checked: value ? value.find(function (v) {
                    return v == get(choice, optionValue);
                }) !== undefined : false,
                onChange: _this.handleCheck,
                value: String(get(choice, optionValue)),
                control: React.createElement(Checkbox, _extends({ color: 'primary' }, options)),
                label: translateChoice ? translate(choiceName, { _: choiceName }) : choiceName
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CheckboxGroupInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                choices = _props.choices,
                className = _props.className,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                isRequired = _props.isRequired,
                label = _props.label,
                meta = _props.meta,
                resource = _props.resource,
                source = _props.source,
                input = _props.input,
                rest = _objectWithoutProperties(_props, ['choices', 'className', 'classes', 'isRequired', 'label', 'meta', 'resource', 'source', 'input']);

            if (typeof meta === 'undefined') {
                throw new Error("The CheckboxGroupInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }

            var touched = meta.touched,
                error = meta.error,
                _meta$helperText = meta.helperText,
                helperText = _meta$helperText === undefined ? false : _meta$helperText;


            return React.createElement(
                FormControl,
                _extends({
                    className: className,
                    component: 'fieldset',
                    margin: 'normal'
                }, sanitizeRestProps(rest)),
                React.createElement(
                    FormLabel,
                    { component: 'legend', className: classes.label },
                    React.createElement(FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired
                    })
                ),
                React.createElement(
                    FormGroup,
                    { row: true },
                    choices.map(this.renderCheckbox)
                ),
                touched && error && React.createElement(
                    FormHelperText,
                    null,
                    error
                ),
                helperText && React.createElement(
                    FormHelperText,
                    null,
                    helperText
                )
            );
        }
    }]);

    return CheckboxGroupInput;
}(Component);

CheckboxGroupInput.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired
    }),
    isRequired: PropTypes.bool,
    optionText: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]).isRequired,
    optionValue: PropTypes.string.isRequired,
    resource: PropTypes.string,
    translate: PropTypes.func.isRequired,
    translateChoice: PropTypes.bool.isRequired,
    meta: PropTypes.object
};

CheckboxGroupInput.defaultProps = {
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true
};

var EnhancedCheckboxGroupInput = compose(addField, translate, withStyles(styles))(CheckboxGroupInput);

EnhancedCheckboxGroupInput.defaultProps = {
    fullWidth: true
};

export default EnhancedCheckboxGroupInput;