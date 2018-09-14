import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

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

export var MenuItemLink = function (_Component) {
    _inherits(MenuItemLink, _Component);

    function MenuItemLink() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MenuItemLink);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItemLink.__proto__ || Object.getPrototypeOf(MenuItemLink)).call.apply(_ref, [this].concat(args))), _this), _this.handleMenuTap = function () {
            _this.props.onClick && _this.props.onClick();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItemLink, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                className = _props.className,
                primaryText = _props.primaryText,
                leftIcon = _props.leftIcon,
                staticContext = _props.staticContext,
                props = _objectWithoutProperties(_props, ['classes', 'className', 'primaryText', 'leftIcon', 'staticContext']);

            return React.createElement(
                MenuItem,
                _extends({
                    className: classnames(classes.root, className),
                    activeClassName: classes.active,
                    component: NavLink
                }, props, {
                    onClick: this.handleMenuTap
                }),
                leftIcon && React.createElement(
                    'span',
                    { className: classes.icon },
                    cloneElement(leftIcon, { titleAccess: primaryText })
                ),
                primaryText
            );
        }
    }]);

    return MenuItemLink;
}(Component);

MenuItemLink.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    onClick: PropTypes.func,
    primaryText: PropTypes.string,
    staticContext: PropTypes.object,
    to: PropTypes.string.isRequired
};
export default withStyles(styles)(MenuItemLink);