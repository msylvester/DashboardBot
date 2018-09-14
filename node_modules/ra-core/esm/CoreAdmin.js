import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import withContext from 'recompose/withContext';

import createAdminStore from './createAdminStore';
import TranslationProvider from './i18n/TranslationProvider';
import CoreAdminRouter from './CoreAdminRouter';

var componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

var CoreAdmin = function (_React$Component) {
    _inherits(CoreAdmin, _React$Component);

    function CoreAdmin(props, context) {
        _classCallCheck(this, CoreAdmin);

        var _this = _possibleConstructorReturn(this, (CoreAdmin.__proto__ || Object.getPrototypeOf(CoreAdmin)).call(this, props, context));

        _this.reduxIsAlreadyInitialized = false;
        _this.history = null;

        if (context.store) {
            _this.reduxIsAlreadyInitialized = true;
            if (!props.history) {
                throw new Error('Missing history prop.\nWhen integrating react-admin inside an existing redux Provider, you must provide the same \'history\' prop to the <Admin> as the one used to bootstrap your routerMiddleware.\nReact-admin uses this history for its own ConnectedRouter.');
            }
            _this.history = props.history;
        } else {
            if (!props.dataProvider) {
                throw new Error('Missing dataProvider prop.\nReact-admin requires a valid dataProvider function to work.');
            }
            _this.history = props.history || createHistory();
        }
        return _this;
    }

    _createClass(CoreAdmin, [{
        key: 'renderCore',
        value: function renderCore() {
            var _props = this.props,
                appLayout = _props.appLayout,
                authProvider = _props.authProvider,
                children = _props.children,
                _props$customRoutes = _props.customRoutes,
                customRoutes = _props$customRoutes === undefined ? [] : _props$customRoutes,
                dashboard = _props.dashboard,
                menu = _props.menu,
                catchAll = _props.catchAll,
                theme = _props.theme,
                _props$title = _props.title,
                title = _props$title === undefined ? 'React Admin' : _props$title,
                loading = _props.loading,
                loginPage = _props.loginPage,
                logoutButton = _props.logoutButton;


            var logout = authProvider ? createElement(logoutButton) : null;

            return React.createElement(
                TranslationProvider,
                null,
                React.createElement(
                    ConnectedRouter,
                    { history: this.history },
                    React.createElement(
                        Switch,
                        null,
                        React.createElement(Route, {
                            exact: true,
                            path: '/login',
                            render: function render(props) {
                                return createElement(loginPage, _extends({}, props, {
                                    title: title
                                }));
                            }
                        }),
                        React.createElement(Route, {
                            path: '/',
                            render: function render(props) {
                                return React.createElement(
                                    CoreAdminRouter,
                                    _extends({
                                        appLayout: appLayout,
                                        catchAll: catchAll,
                                        customRoutes: customRoutes,
                                        dashboard: dashboard,
                                        loading: loading,
                                        loginPage: loginPage,
                                        logout: logout,
                                        menu: menu,
                                        theme: theme,
                                        title: title
                                    }, props),
                                    children
                                );
                            }
                        })
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return this.reduxIsAlreadyInitialized ? this.renderCore() : React.createElement(
                Provider,
                {
                    store: createAdminStore(_extends({}, this.props, {
                        history: this.history
                    }))
                },
                this.renderCore()
            );
        }
    }]);

    return CoreAdmin;
}(React.Component);

CoreAdmin.propTypes = {
    appLayout: componentPropType,
    authProvider: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    catchAll: componentPropType,
    customSagas: PropTypes.array,
    customReducers: PropTypes.object,
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    dataProvider: PropTypes.func,
    history: PropTypes.object,
    i18nProvider: PropTypes.func,
    initialState: PropTypes.object,
    loading: componentPropType,
    locale: PropTypes.string,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    theme: PropTypes.object,
    title: PropTypes.node
};
CoreAdmin.contextTypes = {
    store: PropTypes.object
};


export default withContext({
    authProvider: PropTypes.func
}, function (_ref) {
    var authProvider = _ref.authProvider;
    return { authProvider: authProvider };
})(CoreAdmin);