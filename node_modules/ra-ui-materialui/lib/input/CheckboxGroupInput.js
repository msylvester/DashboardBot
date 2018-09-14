'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckboxGroupInput = undefined;

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

var _FormLabel = require('@material-ui/core/FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormGroup = require('@material-ui/core/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormHelperText = require('@material-ui/core/FormHelperText');

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _styles = require('@material-ui/core/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var setFilter = _ref.setFilter,
        setPagination = _ref.setPagination,
        setSort = _ref.setSort,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['setFilter', 'setPagination', 'setSort']);
    return (0, _sanitizeRestProps2.default)(rest);
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

var CheckboxGroupInput = exports.CheckboxGroupInput = function (_Component) {
    (0, _inherits3.default)(CheckboxGroupInput, _Component);

    function CheckboxGroupInput() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CheckboxGroupInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = CheckboxGroupInput.__proto__ || Object.getPrototypeOf(CheckboxGroupInput)).call.apply(_ref2, [this].concat(args))), _this), _this.handleCheck = function (event, isChecked) {
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
                onChange([].concat((0, _toConsumableArray3.default)(value), [newValue]));
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

            var choiceName = _react2.default.isValidElement(optionText) // eslint-disable-line no-nested-ternary
            ? _react2.default.cloneElement(optionText, { record: choice }) : typeof optionText === 'function' ? optionText(choice) : (0, _get2.default)(choice, optionText);
            return _react2.default.createElement(_FormControlLabel2.default, {
                key: (0, _get2.default)(choice, optionValue),
                checked: value ? value.find(function (v) {
                    return v == (0, _get2.default)(choice, optionValue);
                }) !== undefined : false,
                onChange: _this.handleCheck,
                value: String((0, _get2.default)(choice, optionValue)),
                control: _react2.default.createElement(_Checkbox2.default, (0, _extends3.default)({ color: 'primary' }, options)),
                label: translateChoice ? translate(choiceName, { _: choiceName }) : choiceName
            });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CheckboxGroupInput, [{
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
                rest = (0, _objectWithoutProperties3.default)(_props, ['choices', 'className', 'classes', 'isRequired', 'label', 'meta', 'resource', 'source', 'input']);

            if (typeof meta === 'undefined') {
                throw new Error("The CheckboxGroupInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }

            var touched = meta.touched,
                error = meta.error,
                _meta$helperText = meta.helperText,
                helperText = _meta$helperText === undefined ? false : _meta$helperText;


            return _react2.default.createElement(
                _FormControl2.default,
                (0, _extends3.default)({
                    className: className,
                    component: 'fieldset',
                    margin: 'normal'
                }, sanitizeRestProps(rest)),
                _react2.default.createElement(
                    _FormLabel2.default,
                    { component: 'legend', className: classes.label },
                    _react2.default.createElement(_raCore.FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired
                    })
                ),
                _react2.default.createElement(
                    _FormGroup2.default,
                    { row: true },
                    choices.map(this.renderCheckbox)
                ),
                touched && error && _react2.default.createElement(
                    _FormHelperText2.default,
                    null,
                    error
                ),
                helperText && _react2.default.createElement(
                    _FormHelperText2.default,
                    null,
                    helperText
                )
            );
        }
    }]);
    return CheckboxGroupInput;
}(_react.Component);

CheckboxGroupInput.propTypes = {
    choices: _propTypes2.default.arrayOf(_propTypes2.default.object),
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    label: _propTypes2.default.string,
    source: _propTypes2.default.string,
    options: _propTypes2.default.object,
    input: _propTypes2.default.shape({
        onChange: _propTypes2.default.func.isRequired
    }),
    isRequired: _propTypes2.default.bool,
    optionText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.element]).isRequired,
    optionValue: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    translateChoice: _propTypes2.default.bool.isRequired,
    meta: _propTypes2.default.object
};

CheckboxGroupInput.defaultProps = {
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true
};

var EnhancedCheckboxGroupInput = (0, _compose2.default)(_raCore.addField, _raCore.translate, (0, _styles.withStyles)(styles))(CheckboxGroupInput);

EnhancedCheckboxGroupInput.defaultProps = {
    fullWidth: true
};

exports.default = EnhancedCheckboxGroupInput;