'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectInput = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _styles = require('@material-ui/core/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

var _ResettableTextField = require('./ResettableTextField');

var _ResettableTextField2 = _interopRequireDefault(_ResettableTextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        rest = (0, _objectWithoutProperties3.default)(_ref, ['addLabel', 'allowEmpty', 'basePath', 'choices', 'className', 'component', 'crudGetMatching', 'crudGetOne', 'defaultValue', 'filter', 'filterToQuery', 'formClassName', 'initializeForm', 'input', 'isRequired', 'label', 'locale', 'meta', 'onChange', 'options', 'optionValue', 'optionText', 'perPage', 'record', 'reference', 'resource', 'setFilter', 'setPagination', 'setSort', 'sort', 'source', 'textAlign', 'translate', 'translateChoice', 'validation']);
    return rest;
};

var styles = function styles(theme) {
    return {
        input: {
            minWidth: theme.spacing.unit * 20
        }
    };
};

/**
 * An Input component for a select box, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'M', name: 'Male' },
 *    { id: 'F', name: 'Female' },
 * ];
 * <SelectInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <SelectInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <SelectInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <SelectInput source="gender" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'M', name: 'myroot.gender.male' },
 *    { id: 'F', name: 'myroot.gender.female' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <SelectInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <Select> component
 */

var SelectInput = exports.SelectInput = function (_Component) {
    (0, _inherits3.default)(SelectInput, _Component);

    function SelectInput() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SelectInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = SelectInput.__proto__ || Object.getPrototypeOf(SelectInput)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
            value: _this.props.input.value
        }, _this.handleChange = function (eventOrValue) {
            var value = eventOrValue.target ? eventOrValue.target.value : eventOrValue;
            _this.props.input.onChange(value);

            // HACK: For some reason, redux-form does not consider this input touched without calling onBlur manually
            _this.props.input.onBlur();
            _this.setState({ value: value });
        }, _this.addAllowEmpty = function (choices) {
            if (_this.props.allowEmpty) {
                return [_react2.default.createElement(_MenuItem2.default, { value: '', key: 'null' })].concat((0, _toConsumableArray3.default)(choices));
            }

            return choices;
        }, _this.renderMenuItemOption = function (choice) {
            var _this$props = _this.props,
                optionText = _this$props.optionText,
                translate = _this$props.translate,
                translateChoice = _this$props.translateChoice;

            if (_react2.default.isValidElement(optionText)) return _react2.default.cloneElement(optionText, {
                record: choice
            });
            var choiceName = typeof optionText === 'function' ? optionText(choice) : (0, _get2.default)(choice, optionText);
            return translateChoice ? translate(choiceName, { _: choiceName }) : choiceName;
        }, _this.renderMenuItem = function (choice) {
            var optionValue = _this.props.optionValue;

            return _react2.default.createElement(
                _MenuItem2.default,
                {
                    key: (0, _get2.default)(choice, optionValue),
                    value: (0, _get2.default)(choice, optionValue)
                },
                _this.renderMenuItemOption(choice)
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    /*
     * Using state to bypass a redux-form comparison but which prevents re-rendering
     * @see https://github.com/erikras/redux-form/issues/2456
     */


    (0, _createClass3.default)(SelectInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.input.value !== this.props.input.value) {
                this.setState({ value: nextProps.input.value });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                allowEmpty = _props.allowEmpty,
                choices = _props.choices,
                classes = _props.classes,
                className = _props.className,
                input = _props.input,
                isRequired = _props.isRequired,
                label = _props.label,
                meta = _props.meta,
                options = _props.options,
                resource = _props.resource,
                source = _props.source,
                rest = (0, _objectWithoutProperties3.default)(_props, ['allowEmpty', 'choices', 'classes', 'className', 'input', 'isRequired', 'label', 'meta', 'options', 'resource', 'source']);

            if (typeof meta === 'undefined') {
                throw new Error("The SelectInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }
            var touched = meta.touched,
                error = meta.error,
                _meta$helperText = meta.helperText,
                helperText = _meta$helperText === undefined ? false : _meta$helperText;


            return _react2.default.createElement(
                _ResettableTextField2.default,
                (0, _extends3.default)({
                    select: true,
                    margin: 'normal',
                    value: this.state.value,
                    label: _react2.default.createElement(_raCore.FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired
                    }),
                    name: input.name,
                    className: classes.input + ' ' + className,
                    clearAlwaysVisible: true,
                    error: !!(touched && error),
                    helperText: touched && error || helperText
                }, options, sanitizeRestProps(rest), {
                    onChange: this.handleChange
                }),
                this.addAllowEmpty(choices.map(this.renderMenuItem))
            );
        }
    }]);
    return SelectInput;
}(_react.Component);

SelectInput.propTypes = {
    allowEmpty: _propTypes2.default.bool.isRequired,
    choices: _propTypes2.default.arrayOf(_propTypes2.default.object),
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    optionText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.element]).isRequired,
    optionValue: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    translateChoice: _propTypes2.default.bool
};

SelectInput.defaultProps = {
    allowEmpty: false,
    classes: {},
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true
};

exports.default = (0, _compose2.default)(_raCore.addField, _raCore.translate, (0, _styles.withStyles)(styles))(SelectInput);