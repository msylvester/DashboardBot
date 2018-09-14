import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import compose from 'recompose/compose';
import { toggleSidebar } from 'ra-core';

import LoadingIndicator from './LoadingIndicator';

var styles = {
    title: {
        fontSize: '1.25em',
        lineHeight: '2.5em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        paddingRight: '1.5em'
    },
    icon: {
        marginTop: 0,
        marginRight: 0,
        marginLeft: '-12px'
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    }
};

/**
 * @deprecated
 */
var AppBarMobile = function AppBarMobile(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        title = _ref.title,
        toggleSidebar = _ref.toggleSidebar,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'title', 'toggleSidebar']);

    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<AppBarMobile> is deprecated, please use <AppBar>, which is now responsive');
    }
    return React.createElement(
        MuiAppBar,
        _extends({
            className: className,
            color: 'secondary',
            position: 'fixed'
        }, rest),
        React.createElement(
            Toolbar,
            null,
            React.createElement(
                IconButton,
                {
                    color: 'inherit',
                    'aria-label': 'open drawer',
                    onClick: toggleSidebar,
                    className: classes.icon
                },
                React.createElement(MenuIcon, null)
            ),
            React.createElement(
                Typography,
                {
                    className: classes.title,
                    variant: 'title',
                    color: 'inherit'
                },
                title
            ),
            React.createElement(LoadingIndicator, null)
        )
    );
};

AppBarMobile.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

var enhance = compose(connect(null, { toggleSidebar: toggleSidebar }), withStyles(styles));

export default enhance(AppBarMobile);