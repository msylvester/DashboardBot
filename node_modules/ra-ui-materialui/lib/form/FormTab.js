'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _Tab = require('@material-ui/core/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _FormInput = require('./FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var label = _ref.label,
        icon = _ref.icon,
        value = _ref.value,
        translate = _ref.translate,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['label', 'icon', 'value', 'translate']);
    return rest;
};

var hiddenStyle = { display: 'none' };

var FormTab = function (_Component) {
    (0, _inherits3.default)(FormTab, _Component);

    function FormTab() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, FormTab);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = FormTab.__proto__ || Object.getPrototypeOf(FormTab)).call.apply(_ref2, [this].concat(args))), _this), _this.renderHeader = function (_ref3) {
            var className = _ref3.className,
                label = _ref3.label,
                icon = _ref3.icon,
                value = _ref3.value,
                translate = _ref3.translate,
                rest = (0, _objectWithoutProperties3.default)(_ref3, ['className', 'label', 'icon', 'value', 'translate']);

            var to = { pathname: value, state: { skipFormReset: true } };

            return _react2.default.createElement(_Tab2.default, (0, _extends3.default)({
                key: label,
                label: translate(label, { _: label }),
                value: value,
                icon: icon,
                className: (0, _classnames2.default)('form-tab', className),
                component: _reactRouterDom.Link,
                to: to
            }, sanitizeRestProps(rest)));
        }, _this.renderContent = function (_ref4) {
            var children = _ref4.children,
                hidden = _ref4.hidden,
                rest = (0, _objectWithoutProperties3.default)(_ref4, ['children', 'hidden']);
            return _react2.default.createElement(
                'span',
                { style: hidden ? hiddenStyle : null },
                _react2.default.Children.map(children, function (input) {
                    return input && _react2.default.createElement(_FormInput2.default, (0, _extends3.default)({ input: input }, sanitizeRestProps(rest)));
                })
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(FormTab, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                context = _props.context,
                rest = (0, _objectWithoutProperties3.default)(_props, ['children', 'context']);

            return context === 'header' ? this.renderHeader(rest) : this.renderContent((0, _extends3.default)({ children: children }, rest));
        }
    }]);
    return FormTab;
}(_react.Component);

FormTab.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    context: _propTypes2.default.oneOf(['header', 'content']),
    hidden: _propTypes2.default.bool,
    icon: _propTypes2.default.element,
    label: _propTypes2.default.string.isRequired,
    path: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    value: _propTypes2.default.string
};

FormTab.displayName = 'FormTab';

exports.default = (0, _raCore.translate)(FormTab);
module.exports = exports['default'];