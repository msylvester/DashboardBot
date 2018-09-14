import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import { toggleSidebar as toggleSidebarAction } from 'ra-core';

import LoadingIndicator from './LoadingIndicator';
import UserMenu from './UserMenu';
import Headroom from './Headroom';

var styles = function styles(theme) {
    return {
        toolbar: {
            paddingRight: 24
        },
        menuButton: {
            marginLeft: '0.5em',
            marginRight: '0.5em'
        },
        menuButtonIconClosed: {
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            transform: 'rotate(0deg)'
        },
        menuButtonIconOpen: {
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            transform: 'rotate(180deg)'
        },
        title: {
            flex: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        }
    };
};

var AppBar = function AppBar(_ref) {
    var children = _ref.children,
        classes = _ref.classes,
        className = _ref.className,
        logout = _ref.logout,
        open = _ref.open,
        title = _ref.title,
        toggleSidebar = _ref.toggleSidebar,
        userMenu = _ref.userMenu,
        width = _ref.width,
        rest = _objectWithoutProperties(_ref, ['children', 'classes', 'className', 'logout', 'open', 'title', 'toggleSidebar', 'userMenu', 'width']);

    return React.createElement(
        Headroom,
        null,
        React.createElement(
            MuiAppBar,
            _extends({
                className: className,
                color: 'secondary',
                position: 'static'
            }, rest),
            React.createElement(
                Toolbar,
                {
                    disableGutters: true,
                    variant: width === 'xs' ? 'regular' : 'dense',
                    className: classes.toolbar
                },
                React.createElement(
                    IconButton,
                    {
                        color: 'inherit',
                        'aria-label': 'open drawer',
                        onClick: toggleSidebar,
                        className: classNames(classes.menuButton)
                    },
                    React.createElement(MenuIcon, {
                        classes: {
                            root: open ? classes.menuButtonIconOpen : classes.menuButtonIconClosed
                        }
                    })
                ),
                React.createElement(Typography, {
                    variant: 'title',
                    color: 'inherit',
                    className: classes.title,
                    id: 'react-admin-title'
                }),
                React.createElement(LoadingIndicator, null),
                cloneElement(userMenu, { logout: logout })
            )
        )
    );
};

AppBar.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    logout: PropTypes.element,
    open: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    userMenu: PropTypes.node,
    width: PropTypes.string
};

AppBar.defaultProps = {
    userMenu: React.createElement(UserMenu, null)
};

var enhance = compose(connect(function (state) {
    return {
        locale: state.i18n.locale // force redraw on locale change
    };
}, {
    toggleSidebar: toggleSidebarAction
}), withStyles(styles), withWidth());

export default enhance(AppBar);