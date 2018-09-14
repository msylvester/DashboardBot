'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MenuItemLink = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouterDom = require('react-router-dom');

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        root: {
            color: theme.palette.text.secondary,
            display: 'flex',
            alignItems: 'flex-start'
        },
        active: {
            color: theme.palette.text.primary
        },
        icon: { paddingRight: '1.2em' }
    };
};

var MenuItemLink = exports.MenuItemLink = function (_Component) {
    (0, _inherits3.default)(MenuItemLink, _Component);

    function MenuItemLink() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, MenuItemLink);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuItemLink.__proto__ || Object.getPrototypeOf(MenuItemLink)).call.apply(_ref, [this].concat(args))), _this), _this.handleMenuTap = function () {
            _this.props.onClick && _this.props.onClick();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(MenuItemLink, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                className = _props.className,
                primaryText = _props.primaryText,
                leftIcon = _props.leftIcon,
                staticContext = _props.staticContext,
                props = (0, _objectWithoutProperties3.default)(_props, ['classes', 'className', 'primaryText', 'leftIcon', 'staticContext']);


            return _react2.default.createElement(
                _MenuItem2.default,
                (0, _extends3.default)({
                    className: (0, _classnames2.default)(classes.root, className),
                    activeClassName: classes.active,
                    component: _reactRouterDom.NavLink
                }, props, {
                    onClick: this.handleMenuTap
                }),
                leftIcon && _react2.default.createElement(
                    'span',
                    { className: classes.icon },
                    (0, _react.cloneElement)(leftIcon, { titleAccess: primaryText })
                ),
                primaryText
            );
        }
    }]);
    return MenuItemLink;
}(_react.Component);

MenuItemLink.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    className: _propTypes2.default.string,
    leftIcon: _propTypes2.default.node,
    onClick: _propTypes2.default.func,
    primaryText: _propTypes2.default.string,
    staticContext: _propTypes2.default.object,
    to: _propTypes2.default.string.isRequired
};
exports.default = (0, _styles.withStyles)(styles)(MenuItemLink);