import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

import AppBar from './AppBar';
import Sidebar from './Sidebar';
import Menu from './Menu';
import Notification from './Notification';
import Error from './Error';
import defaultTheme from '../defaultTheme';

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
        }, _defineProperty(_content, theme.breakpoints.up('xs'), {
            paddingLeft: 5
        }), _defineProperty(_content, theme.breakpoints.down('sm'), {
            padding: 0
        }), _content)
    };
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var staticContext = _ref.staticContext,
        history = _ref.history,
        location = _ref.location,
        match = _ref.match,
        props = _objectWithoutProperties(_ref, ['staticContext', 'history', 'location', 'match']);

    return props;
};

var Layout = function (_Component) {
    _inherits(Layout, _Component);

    function Layout(props) {
        _classCallCheck(this, Layout);

        /**
         * Reset the error state upon navigation
         *
         * @see https://stackoverflow.com/questions/48121750/browser-navigation-broken-by-use-of-react-error-boundaries
         * */
        var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

        _this.state = { hasError: false, errorMessage: null, errorInfo: null };
        props.history.listen(function () {
            if (_this.state.hasError) {
                _this.setState({ hasError: false });
            }
        });
        return _this;
    }

    _createClass(Layout, [{
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
                props = _objectWithoutProperties(_props, ['appBar', 'children', 'classes', 'className', 'customRoutes', 'error', 'dashboard', 'logout', 'menu', 'notification', 'open', 'sidebar', 'title']);

            var _state = this.state,
                hasError = _state.hasError,
                errorMessage = _state.errorMessage,
                errorInfo = _state.errorInfo;

            return React.createElement(
                'div',
                _extends({
                    className: classnames('layout', classes.root, className)
                }, sanitizeRestProps(props)),
                React.createElement(
                    'div',
                    { className: classes.appFrame },
                    createElement(appBar, { title: title, open: open, logout: logout }),
                    React.createElement(
                        'main',
                        { className: classes.contentWithSidebar },
                        createElement(sidebar, {
                            children: createElement(menu, {
                                logout: logout,
                                hasDashboard: !!dashboard
                            })
                        }),
                        React.createElement(
                            'div',
                            { className: classes.content },
                            hasError ? createElement(error, {
                                error: errorMessage,
                                errorInfo: errorInfo,
                                title: title
                            }) : children
                        )
                    ),
                    createElement(notification)
                )
            );
        }
    }]);

    return Layout;
}(Component);

var componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Layout.propTypes = {
    appBar: componentPropType,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    classes: PropTypes.object,
    className: PropTypes.string,
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    error: componentPropType,
    history: PropTypes.object.isRequired,
    logout: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
    menu: componentPropType,
    notification: componentPropType,
    open: PropTypes.bool,
    sidebar: componentPropType,
    title: PropTypes.node.isRequired
};

Layout.defaultProps = {
    appBar: AppBar,
    error: Error,
    menu: Menu,
    notification: Notification,
    sidebar: Sidebar
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        open: state.admin.ui.sidebarOpen
    };
};

var EnhancedLayout = compose(connect(mapStateToProps, {} // Avoid connect passing dispatch in props
), withRouter, withStyles(styles))(Layout);

var LayoutWithTheme = function (_Component2) {
    _inherits(LayoutWithTheme, _Component2);

    function LayoutWithTheme(props) {
        _classCallCheck(this, LayoutWithTheme);

        var _this2 = _possibleConstructorReturn(this, (LayoutWithTheme.__proto__ || Object.getPrototypeOf(LayoutWithTheme)).call(this, props));

        _this2.theme = createMuiTheme(props.theme);
        return _this2;
    }

    _createClass(LayoutWithTheme, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.theme !== this.props.theme) {
                this.theme = createMuiTheme(nextProps.theme);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                theme = _props2.theme,
                rest = _objectWithoutProperties(_props2, ['theme']);

            return React.createElement(
                MuiThemeProvider,
                { theme: this.theme },
                React.createElement(EnhancedLayout, rest)
            );
        }
    }]);

    return LayoutWithTheme;
}(Component);

LayoutWithTheme.propTypes = {
    theme: PropTypes.object
};

LayoutWithTheme.defaultProps = {
    theme: defaultTheme
};

export default LayoutWithTheme;