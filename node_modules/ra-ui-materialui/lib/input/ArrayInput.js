'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrayInput = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raCore = require('ra-core');

var _reduxForm = require('redux-form');

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * To edit arrays of data embedded inside a record, <ArrayInput> creates a list of sub-forms.
 *
 *  @example
 *
 *      import { ArrayInput, SimpleFormIterator, DateInput, UrlInput } from 'react-admin';
 *
 *      <ArrayInput source="backlinks">
 *          <SimpleFormIterator>
 *              <DateInput source="date" />
 *              <UrlInput source="url" />
 *          </SimpleFormIterator>
 *      </ArrayInput>
 *
 * <ArrayInput> allows the edition of embedded arrays, like the backlinks field
 * in the following post record:
 *
 * {
 *   id: 123
 *   backlinks: [
 *         {
 *             date: '2012-08-10T00:00:00.000Z',
 *             url: 'http://example.com/foo/bar.html',
 *         },
 *         {
 *             date: '2012-08-14T00:00:00.000Z',
 *             url: 'https://blog.johndoe.com/2012/08/12/foobar.html',
 *         }
 *    ]
 * }
 *
 * <ArrayInput> expects a single child, which must be a *form iterator* component.
 * A form iterator is a component accepting a fields object
 * as passed by redux-form's <FieldArray> component, and defining a layout for
 * an array of fields. For instance, the <SimpleFormIterator> component
 * displays an array of fields in an unordered list (<ul>), one sub-form by
 * list item (<li>). It also provides controls for adding and removing
 * a sub-record (a backlink in this example).
 *
 * @see https://redux-form.com/7.3.0/examples/fieldarrays/
 */
var ArrayInput = exports.ArrayInput = function (_Component) {
    (0, _inherits3.default)(ArrayInput, _Component);

    function ArrayInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ArrayInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ArrayInput.__proto__ || Object.getPrototypeOf(ArrayInput)).call.apply(_ref, [this].concat(args))), _this), _this.renderFieldArray = function (fieldProps) {
            var _this$props = _this.props,
                children = _this$props.children,
                record = _this$props.record,
                resource = _this$props.resource,
                source = _this$props.source;

            return (0, _react.cloneElement)(children, (0, _extends3.default)({}, fieldProps, {
                record: record,
                resource: resource,
                source: source
            }));
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ArrayInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                defaultValue = _props.defaultValue,
                label = _props.label,
                source = _props.source,
                resource = _props.resource,
                validate = _props.validate,
                rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'defaultValue', 'label', 'source', 'resource', 'validate']);


            return _react2.default.createElement(
                _FormControl2.default,
                (0, _extends3.default)({
                    fullWidth: true,
                    margin: 'normal',
                    className: className
                }, (0, _sanitizeRestProps2.default)(rest)),
                _react2.default.createElement(
                    _InputLabel2.default,
                    { htmlFor: source, shrink: true },
                    _react2.default.createElement(_raCore.FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: (0, _raCore.isRequired)(validate)
                    })
                ),
                _react2.default.createElement(_reduxForm.FieldArray, {
                    name: source,
                    defaultValue: defaultValue,
                    component: this.renderFieldArray,
                    validate: validate,
                    isRequired: (0, _raCore.isRequired)(validate)
                })
            );
        }
    }]);
    return ArrayInput;
}(_react.Component);

ArrayInput.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    defaultValue: _propTypes2.default.any,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    record: _propTypes2.default.object,
    options: _propTypes2.default.object,
    validate: _propTypes2.default.func
};

ArrayInput.defaultProps = {
    options: {},
    fullWidth: true
};
exports.default = (0, _raCore.withDefaultValue)(ArrayInput);