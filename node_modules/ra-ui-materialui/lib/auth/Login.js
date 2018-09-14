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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Card = require('@material-ui/core/Card');

var _Card2 = _interopRequireDefault(_Card);

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _styles = require('@material-ui/core/styles');

var _Lock = require('@material-ui/icons/Lock');

var _Lock2 = _interopRequireDefault(_Lock);

var _defaultTheme = require('../defaultTheme');

var _defaultTheme2 = _interopRequireDefault(_defaultTheme);

var _Notification = require('../layout/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _LoginForm = require('./LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        main: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            height: '1px',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: 'url(https://source.unsplash.com/random/1600x900)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        },
        card: {
            minWidth: 300,
            marginTop: '6em'
        },
        avatar: {
            margin: '1em',
            display: 'flex',
            justifyContent: 'center'
        },
        icon: {
            backgroundColor: theme.palette.secondary[500]
        }
    };
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        location = _ref.location,
        title = _ref.title,
        array = _ref.array,
        theme = _ref.theme,
        staticContext = _ref.staticContext,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'location', 'title', 'array', 'theme', 'staticContext']);
    return rest;
};

/**
 * A standalone login page, to serve as authentication gate to the admin
 *
 * Expects the user to enter a login and a password, which will be checked
 * by the `authProvider` using the AUTH_LOGIN verb. Redirects to the root page
 * (/) upon success, otherwise displays an authentication error message.
 *
 * Copy and adapt this component to implement your own login logic
 * (e.g. to authenticate via email or facebook or anything else).
 *
 * @example
 *     import MyLoginPage from './MyLoginPage';
 *     const App = () => (
 *         <Admin loginPage={MyLoginPage} authProvider={authProvider}>
 *             ...
 *        </Admin>
 *     );
 */
var Login = function Login(_ref2) {
    var classes = _ref2.classes,
        className = _ref2.className,
        loginForm = _ref2.loginForm,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['classes', 'className', 'loginForm']);
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
            className: (0, _classnames2.default)(classes.main, className)
        }, sanitizeRestProps(rest)),
        _react2.default.createElement(
            _Card2.default,
            { className: classes.card },
            _react2.default.createElement(
                'div',
                { className: classes.avatar },
                _react2.default.createElement(
                    _Avatar2.default,
                    { className: classes.icon },
                    _react2.default.createElement(_Lock2.default, null)
                )
            ),
            loginForm
        ),
        _react2.default.createElement(_Notification2.default, null)
    );
};

Login.propTypes = {
    className: _propTypes2.default.string,
    authProvider: _propTypes2.default.func,
    classes: _propTypes2.default.object,
    input: _propTypes2.default.object,
    meta: _propTypes2.default.object,
    previousRoute: _propTypes2.default.string,
    loginForm: _propTypes2.default.element
};

Login.defaultProps = {
    theme: _defaultTheme2.default,
    loginForm: _react2.default.createElement(_LoginForm2.default, null)
};

exports.default = (0, _styles.withStyles)(styles)(Login);
module.exports = exports['default'];