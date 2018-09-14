import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { addField, translate, FieldTitle } from 'ra-core';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var addLabel = _ref.addLabel,
        allowEmpty = _ref.allowEmpty,
        basePath = _ref.basePath,
        choices = _ref.choices,
        className = _ref.className,
        component = _ref.component,
        crudGetMatching = _ref.crudGetMatching,
        crudGetOne = _ref.crudGetOne,
        defaultValue = _ref.defaultValue,
        filter = _ref.filter,
        filterToQuery = _ref.filterToQuery,
        formClassName = _ref.formClassName,
        initializeForm = _ref.initializeForm,
        input = _ref.input,
        isRequired = _ref.isRequired,
        label = _ref.label,
        limitChoicesToValue = _ref.limitChoicesToValue,
        locale = _ref.locale,
        meta = _ref.meta,
        onChange = _ref.onChange,
        options = _ref.options,
        optionValue = _ref.optionValue,
        optionText = _ref.optionText,
        perPage = _ref.perPage,
        record = _ref.record,
        reference = _ref.reference,
        resource = _ref.resource,
        setFilter = _ref.setFilter,
        setPagination = _ref.setPagination,
        setSort = _ref.setSort,
        sort = _ref.sort,
        source = _ref.source,
        textAlign = _ref.textAlign,
        translate = _ref.translate,
        translateChoice = _ref.translateChoice,
        validation = _ref.validation,
        rest = _objectWithoutProperties(_ref, ['addLabel', 'allowEmpty', 'basePath', 'choices', 'className', 'component', 'crudGetMatching', 'crudGetOne', 'defaultValue', 'filter', 'filterToQuery', 'formClassName', 'initializeForm', 'input', 'isRequired', 'label', 'limitChoicesToValue', 'locale', 'meta', 'onChange', 'options', 'optionValue', 'optionText', 'perPage', 'record', 'reference', 'resource', 'setFilter', 'setPagination', 'setSort', 'sort', 'source', 'textAlign', 'translate', 'translateChoice', 'validation']);

    return rest;
};

var styles = function styles(theme) {
    return {
        root: {},
        chips: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        chip: {
            margin: theme.spacing.unit / 4
        },
        select: {
            height: 'auto',
            overflow: 'auto'
        }
    };
};

/**
 * An Input component for a select box allowing multiple selections, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'programming', name: 'Programming' },
 *    { id: 'lifestyle', name: 'Lifestyle' },
 *    { id: 'photography', name: 'Photography' },
 * ];
 * <SelectArrayInput source="tags" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <SelectArrayInput source="authors" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <SelectArrayInput source="authors" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <SelectArrayInput source="authors" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.tags.programming' },
 *    { id: 'lifestyle', name: 'myroot.tags.lifestyle' },
 *    { id: 'photography', name: 'myroot.tags.photography' },
 * ];
 */
export var SelectArrayInput = function (_Component) {
    _inherits(SelectArrayInput, _Component);

    function SelectArrayInput() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, SelectArrayInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SelectArrayInput.__proto__ || Object.getPrototypeOf(SelectArrayInput)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
            value: _this.props.input.value || []
        }, _this.handleChange = function (event) {
            _this.props.input.onChange(event.target.value);
            // HACK: For some reason, redux-form does not consider this input touched without calling onBlur manually
            _this.props.input.onBlur(event.target.value);
            _this.setState({ value: event.target.value });
        }, _this.renderMenuItemOption = function (choice) {
            var _this$props = _this.props,
                optionText = _this$props.optionText,
                translate = _this$props.translate,
                translateChoice = _this$props.translateChoice;

            if (React.isValidElement(optionText)) return React.cloneElement(optionText, {
                record: choice
            });
            var choiceName = typeof optionText === 'function' ? optionText(choice) : get(choice, optionText);
            return translateChoice ? translate(choiceName, { _: choiceName }) : choiceName;
        }, _this.renderMenuItem = function (choice) {
            var optionValue = _this.props.optionValue;

            return React.createElement(
                MenuItem,
                {
                    key: get(choice, optionValue),
                    value: get(choice, optionValue)
                },
                _this.renderMenuItemOption(choice)
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /*
     * Using state to bypass a redux-form comparison but which prevents re-rendering
     * @see https://github.com/erikras/redux-form/issues/2456
     */


    _createClass(SelectArrayInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.input.value !== this.props.input.value) {
                this.setState({ value: nextProps.input.value || [] });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                choices = _props.choices,
                classes = _props.classes,
                className = _props.className,
                isRequired = _props.isRequired,
                label = _props.label,
                meta = _props.meta,
                options = _props.options,
                resource = _props.resource,
                source = _props.source,
                optionText = _props.optionText,
                optionValue = _props.optionValue,
                rest = _objectWithoutProperties(_props, ['choices', 'classes', 'className', 'isRequired', 'label', 'meta', 'options', 'resource', 'source', 'optionText', 'optionValue']);

            if (typeof meta === 'undefined') {
                throw new Error("The SelectInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }
            var touched = meta.touched,
                error = meta.error,
                _meta$helperText = meta.helperText,
                helperText = _meta$helperText === undefined ? false : _meta$helperText;


            return React.createElement(
                FormControl,
                _extends({
                    margin: 'normal',
                    className: classnames(classes.root, className)
                }, sanitizeRestProps(rest)),
                React.createElement(
                    InputLabel,
                    { htmlFor: source },
                    React.createElement(FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired
                    })
                ),
                React.createElement(
                    Select,
                    _extends({
                        autoWidth: true,
                        multiple: true,
                        input: React.createElement(Input, { id: source }),
                        value: this.state.value,
                        error: !!(touched && error),
                        renderValue: function renderValue(selected) {
                            return React.createElement(
                                'div',
                                { className: classes.chips },
                                choices.filter(function (choice) {
                                    return selected.includes(get(choice, optionValue));
                                }).map(function (choice) {
                                    return React.createElement(Chip, {
                                        key: get(choice, optionValue),
                                        label: _this2.renderMenuItemOption(choice),
                                        className: classes.chip
                                    });
                                })
                            );
                        }
                    }, options, {
                        onChange: this.handleChange
                    }),
                    choices.map(this.renderMenuItem)
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

    return SelectArrayInput;
}(Component);

SelectArrayInput.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]).isRequired,
    optionValue: PropTypes.string.isRequired,
    resource: PropTypes.string,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
    translateChoice: PropTypes.bool
};

SelectArrayInput.defaultProps = {
    classes: {},
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true
};

var EnhancedSelectArrayInput = compose(addField, translate, withStyles(styles))(SelectArrayInput);

export default EnhancedSelectArrayInput;