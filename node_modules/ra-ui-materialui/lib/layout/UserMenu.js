'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Tooltip = require('@material-ui/core/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Menu = require('@material-ui/core/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _AccountCircle = require('@material-ui/icons/AccountCircle');

var _AccountCircle2 = _interopRequireDefault(_AccountCircle);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserMenu = function (_React$Component) {
    (0, _inherits3.default)(UserMenu, _React$Component);

    function UserMenu() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, UserMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UserMenu.__proto__ || Object.getPrototypeOf(UserMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            auth: true,
            anchorEl: null
        }, _this.handleChange = function (event, checked) {
            _this.setState({ auth: checked });
        }, _this.handleMenu = function (event) {
            _this.setState({ anchorEl: event.currentTarget });
        }, _this.handleClose = function () {
            _this.setState({ anchorEl: null });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(UserMenu, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                label = _props.label,
                logout = _props.logout,
                translate = _props.translate;

            if (!logout && !children) return null;
            var anchorEl = this.state.anchorEl;

            var open = Boolean(anchorEl);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Tooltip2.default,
                    { title: label && translate(label, { _: label }) },
                    _react2.default.createElement(
                        _IconButton2.default,
                        {
                            'arial-label': label && translate(label, { _: label }),
                            'aria-owns': open ? 'menu-appbar' : null,
                            'aria-haspopup': 'true',
                            onClick: this.handleMenu,
                            color: 'inherit'
                        },
                        _react2.default.createElement(_AccountCircle2.default, null)
                    )
                ),
                _react2.default.createElement(
                    _Menu2.default,
                    {
                        id: 'menu-appbar',
                        anchorEl: anchorEl,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        open: open,
                        onClose: this.handleClose
                    },
                    _react.Children.map(children, function (menuItem) {
                        return (0, _react.cloneElement)(menuItem, { onClick: _this2.handleClose });
                    }),
                    logout
                )
            );
        }
    }]);
    return UserMenu;
}(_react2.default.Component);

UserMenu.propTypes = {
    children: _propTypes2.default.node,
    label: _propTypes2.default.string.isRequired,
    logout: _propTypes2.default.node,
    translate: _propTypes2.default.func.isRequired
};
UserMenu.defaultProps = {
    label: 'ra.auth.user_menu'
};
exports.default = (0, _raCore.translate)(UserMenu);
module.exports = exports['default'];