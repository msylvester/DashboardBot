'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultValue = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _formActions = require('../actions/formActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultValue = exports.DefaultValue = function (_Component) {
    (0, _inherits3.default)(DefaultValue, _Component);

    function DefaultValue() {
        (0, _classCallCheck3.default)(this, DefaultValue);
        return (0, _possibleConstructorReturn3.default)(this, (DefaultValue.__proto__ || Object.getPrototypeOf(DefaultValue)).apply(this, arguments));
    }

    (0, _createClass3.default)(DefaultValue, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                defaultValue = _props.defaultValue,
                input = _props.input,
                initializeForm = _props.initializeForm,
                source = _props.source;

            if (typeof defaultValue === 'undefined' || input) {
                return;
            }
            initializeForm((0, _defineProperty3.default)({}, source, typeof defaultValue === 'function' ? defaultValue() : defaultValue));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _props2 = this.props,
                defaultValue = _props2.defaultValue,
                input = _props2.input,
                initializeForm = _props2.initializeForm,
                source = _props2.source;

            if (typeof defaultValue === 'undefined' || input) {
                return;
            }

            if (defaultValue !== prevProps.defaultValue) {
                initializeForm((0, _defineProperty3.default)({}, source, typeof defaultValue === 'function' ? defaultValue() : defaultValue));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                initializeForm = _props3.initializeForm,
                decoratedComponent = _props3.decoratedComponent,
                props = (0, _objectWithoutProperties3.default)(_props3, ['initializeForm', 'decoratedComponent']);

            return (0, _react.createElement)(decoratedComponent, props);
        }
    }]);
    return DefaultValue;
}(_react.Component);

DefaultValue.propTypes = {
    decoratedComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    defaultValue: _propTypes2.default.any,
    initializeForm: _propTypes2.default.func.isRequired,
    input: _propTypes2.default.object,
    source: _propTypes2.default.string,
    validate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.array])
};

exports.default = function (DecoratedComponent) {
    return (0, _reactRedux.connect)(function () {
        return { decoratedComponent: DecoratedComponent };
    }, { initializeForm: _formActions.initializeForm })(DefaultValue);
};