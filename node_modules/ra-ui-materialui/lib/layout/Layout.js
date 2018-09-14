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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require('react-router');

var _styles = require('@material-ui/core/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _AppBar = require('./AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

var _defaultTheme = require('../defaultTheme');

var _defaultTheme2 = _interopRequireDefault(_defaultTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    var _content;

    return {
        root: {
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            minWidth: 'fit-content',
            width: '100%'
        },
        appFrame: {
            display: 'flex',
            flexDirection: 'column'
        },
        contentWithSidebar: {
            display: 'flex',
            flexGrow: 1
        },
        content: (_content = {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            padding: theme.spacing.unit * 3
        }, (0, _defineProperty3.default)(_content, theme.breakpoints.up('xs'), {
            paddingLeft: 5
        }), (0, _defineProperty3.default)(_content, theme.breakpoints.down('sm'), {
            padding: 0
        }), _content)
    };
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var staticContext = _ref.staticContext,
        history = _ref.history,
        location = _ref.location,
        match = _ref.match,
        props = (0, _objectWithoutProperties3.default)(_ref, ['staticContext', 'history', 'location', 'match']);
    return props;
};

var Layout = function (_Component) {
    (0, _inherits3.default)(Layout, _Component);

    function Layout(props) {
        (0, _classCallCheck3.default)(this, Layout);

        /**
         * Reset the error state upon navigation
         *
         * @see https://stackoverflow.com/questions/48121750/browser-navigation-broken-by-use-of-react-error-boundaries
         * */
        var _this = (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

        _this.state = { hasError: false, errorMessage: null, errorInfo: null };
        props.history.listen(function () {
            if (_this.state.hasError) {
                _this.setState({ hasError: false });
            }
        });
        return _this;
    }

    (0, _createClass3.default)(Layout, [{
        key: 'componentDidCatch',
        value: function componentDidCatch(errorMessage, errorInfo) {
            this.setState({ hasError: true, errorMessage: errorMessage, errorInfo: errorInfo });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                appBar = _props.appBar,
                children = _props.children,
                classes = _props.classes,
                className = _props.className,
                customRoutes = _props.customRoutes,
                error = _props.error,
                dashboard = _props.dashboard,
                logout = _props.logout,
                menu = _props.menu,
                notification = _props.notification,
                open = _props.open,
                sidebar = _props.sidebar,
                title = _props.title,
                props = (0, _objectWithoutProperties3.default)(_props, ['appBar', 'children', 'classes', 'className', 'customRoutes', 'error', 'dashboard', 'logout', 'menu', 'notification', 'open', 'sidebar', 'title']);
            var _state = this.state,
                hasError = _state.hasError,
                errorMessage = _state.errorMessage,
                errorInfo = _state.errorInfo;

            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({
                    className: (0, _classnames2.default)('layout', classes.root, className)
                }, sanitizeRestProps(props)),
                _react2.default.createElement(
                    'div',
                    { className: classes.appFrame },
                    (0, _react.createElement)(appBar, { title: title, open: open, logout: logout }),
                    _react2.default.createElement(
                        'main',
                        { className: classes.contentWithSidebar },
                        (0, _react.createElement)(sidebar, {
                            children: (0, _react.createElement)(menu, {
                                logout: logout,
                                hasDashboard: !!dashboard
                            })
                        }),
                        _react2.default.createElement(
                            'div',
                            { className: classes.content },
                            hasError ? (0, _react.createElement)(error, {
                                error: errorMessage,
                                errorInfo: errorInfo,
                                title: title
                            }) : children
                        )
                    ),
                    (0, _react.createElement)(notification)
                )
            );
        }
    }]);
    return Layout;
}(_react.Component);

var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

Layout.propTypes = {
    appBar: componentPropType,
    children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    customRoutes: _propTypes2.default.array,
    dashboard: componentPropType,
    error: componentPropType,
    history: _propTypes2.default.object.isRequired,
    logout: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func, _propTypes2.default.string]),
    menu: componentPropType,
    notification: componentPropType,
    open: _propTypes2.default.bool,
    sidebar: componentPropType,
    title: _propTypes2.default.node.isRequired
};

Layout.defaultProps = {
    appBar: _AppBar2.default,
    error: _Error2.default,
    menu: _Menu2.default,
    notification: _Notification2.default,
    sidebar: _Sidebar2.default
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        open: state.admin.ui.sidebarOpen
    };
};

var EnhancedLayout = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, {} // Avoid connect passing dispatch in props
), _reactRouter.withRouter, (0, _styles.withStyles)(styles))(Layout);

var LayoutWithTheme = function (_Component2) {
    (0, _inherits3.default)(LayoutWithTheme, _Component2);

    function LayoutWithTheme(props) {
        (0, _classCallCheck3.default)(this, LayoutWithTheme);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (LayoutWithTheme.__proto__ || Object.getPrototypeOf(LayoutWithTheme)).call(this, props));

        _this2.theme = (0, _styles.createMuiTheme)(props.theme);
        return _this2;
    }

    (0, _createClass3.default)(LayoutWithTheme, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.theme !== this.props.theme) {
                this.theme = (0, _styles.createMuiTheme)(nextProps.theme);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                theme = _props2.theme,
                rest = (0, _objectWithoutProperties3.default)(_props2, ['theme']);

            return _react2.default.createElement(
                _styles.MuiThemeProvider,
                { theme: this.theme },
                _react2.default.createElement(EnhancedLayout, rest)
            );
        }
    }]);
    return LayoutWithTheme;
}(_react.Component);

LayoutWithTheme.propTypes = {
    theme: _propTypes2.default.object
};

LayoutWithTheme.defaultProps = {
    theme: _defaultTheme2.default
};

exports.default = LayoutWithTheme;
module.exports = exports['default'];