import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { translate } from 'ra-core';

var UserMenu = function (_React$Component) {
    _inherits(UserMenu, _React$Component);

    function UserMenu() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UserMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserMenu.__proto__ || Object.getPrototypeOf(UserMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            auth: true,
            anchorEl: null
        }, _this.handleChange = function (event, checked) {
            _this.setState({ auth: checked });
        }, _this.handleMenu = function (event) {
            _this.setState({ anchorEl: event.currentTarget });
        }, _this.handleClose = function () {
            _this.setState({ anchorEl: null });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UserMenu, [{
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

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Tooltip,
                    { title: label && translate(label, { _: label }) },
                    React.createElement(
                        IconButton,
                        {
                            'arial-label': label && translate(label, { _: label }),
                            'aria-owns': open ? 'menu-appbar' : null,
                            'aria-haspopup': 'true',
                            onClick: this.handleMenu,
                            color: 'inherit'
                        },
                        React.createElement(AccountCircle, null)
                    )
                ),
                React.createElement(
                    Menu,
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
                    Children.map(children, function (menuItem) {
                        return cloneElement(menuItem, { onClick: _this2.handleClose });
                    }),
                    logout
                )
            );
        }
    }]);

    return UserMenu;
}(React.Component);

UserMenu.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    logout: PropTypes.node,
    translate: PropTypes.func.isRequired
};
UserMenu.defaultProps = {
    label: 'ra.auth.user_menu'
};


export default translate(UserMenu);