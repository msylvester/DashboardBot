'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _styles = require('@material-ui/core/styles');

var _PowerSettingsNew = require('@material-ui/icons/PowerSettingsNew');

var _PowerSettingsNew2 = _interopRequireDefault(_PowerSettingsNew);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'translate', 'userLogout', 'locale', 'redirectTo']);
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
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['classes', 'className', 'translate', 'userLogout']);
    return _react2.default.createElement(
        _MenuItem2.default,
        (0, _extends3.default)({
            className: (0, _classnames2.default)('logout', classes.menuItem, className),
            onClick: userLogout
        }, sanitizeRestProps(rest)),
        _react2.default.createElement(
            'span',
            { className: classes.iconMenuPaddingStyle },
            _react2.default.createElement(_PowerSettingsNew2.default, null)
        ),
        translate('ra.auth.logout')
    );
};

Logout.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    translate: _propTypes2.default.func,
    userLogout: _propTypes2.default.func,
    redirectTo: _propTypes2.default.string
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
            return dispatch((0, _raCore.userLogout)(redirectTo));
        }
    };
};

var enhance = (0, _compose2.default)(_raCore.translate, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(styles));

exports.default = enhance(Logout);
module.exports = exports['default'];