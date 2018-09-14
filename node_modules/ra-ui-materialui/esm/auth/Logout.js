import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import classnames from 'classnames';
import { translate, userLogout as userLogoutAction } from 'ra-core';

var styles = function styles(theme) {
    return {
        menuItem: {
            color: theme.palette.text.secondary
        },
        iconMenuPaddingStyle: {
            paddingRight: '1.2em'
        },
        iconPaddingStyle: {
            paddingRight: theme.spacing.unit
        }
    };
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        translate = _ref.translate,
        userLogout = _ref.userLogout,
        locale = _ref.locale,
        redirectTo = _ref.redirectTo,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'translate', 'userLogout', 'locale', 'redirectTo']);

    return rest;
};
/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
var Logout = function Logout(_ref2) {
    var classes = _ref2.classes,
        className = _ref2.className,
        translate = _ref2.translate,
        userLogout = _ref2.userLogout,
        rest = _objectWithoutProperties(_ref2, ['classes', 'className', 'translate', 'userLogout']);

    return React.createElement(
        MenuItem,
        _extends({
            className: classnames('logout', classes.menuItem, className),
            onClick: userLogout
        }, sanitizeRestProps(rest)),
        React.createElement(
            'span',
            { className: classes.iconMenuPaddingStyle },
            React.createElement(ExitIcon, null)
        ),
        translate('ra.auth.logout')
    );
};

Logout.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    translate: PropTypes.func,
    userLogout: PropTypes.func,
    redirectTo: PropTypes.string
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        theme: state.theme
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref3) {
    var redirectTo = _ref3.redirectTo;
    return {
        userLogout: function userLogout() {
            return dispatch(userLogoutAction(redirectTo));
        }
    };
};

var enhance = compose(translate, connect(mapStateToProps, mapDispatchToProps), withStyles(styles));

export default enhance(Logout);