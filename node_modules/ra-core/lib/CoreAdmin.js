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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reactRouterDom = require('react-router-dom');

var _reactRouterRedux = require('react-router-redux');

var _withContext = require('recompose/withContext');

var _withContext2 = _interopRequireDefault(_withContext);

var _createAdminStore = require('./createAdminStore');

var _createAdminStore2 = _interopRequireDefault(_createAdminStore);

var _TranslationProvider = require('./i18n/TranslationProvider');

var _TranslationProvider2 = _interopRequireDefault(_TranslationProvider);

var _CoreAdminRouter = require('./CoreAdminRouter');

var _CoreAdminRouter2 = _interopRequireDefault(_CoreAdminRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

var CoreAdmin = function (_React$Component) {
    (0, _inherits3.default)(CoreAdmin, _React$Component);

    function CoreAdmin(props, context) {
        (0, _classCallCheck3.default)(this, CoreAdmin);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CoreAdmin.__proto__ || Object.getPrototypeOf(CoreAdmin)).call(this, props, context));

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
            _this.history = props.history || (0, _createHashHistory2.default)();
        }
        return _this;
    }

    (0, _createClass3.default)(CoreAdmin, [{
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


            var logout = authProvider ? (0, _react.createElement)(logoutButton) : null;

            return _react2.default.createElement(
                _TranslationProvider2.default,
                null,
                _react2.default.createElement(
                    _reactRouterRedux.ConnectedRouter,
                    { history: this.history },
                    _react2.default.createElement(
                        _reactRouterDom.Switch,
                        null,
                        _react2.default.createElement(_reactRouterDom.Route, {
                            exact: true,
                            path: '/login',
                            render: function render(props) {
                                return (0, _react.createElement)(loginPage, (0, _extends3.default)({}, props, {
                                    title: title
                                }));
                            }
                        }),
                        _react2.default.createElement(_reactRouterDom.Route, {
                            path: '/',
                            render: function render(props) {
                                return _react2.default.createElement(
                                    _CoreAdminRouter2.default,
                                    (0, _extends3.default)({
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
            return this.reduxIsAlreadyInitialized ? this.renderCore() : _react2.default.createElement(
                _reactRedux.Provider,
                {
                    store: (0, _createAdminStore2.default)((0, _extends3.default)({}, this.props, {
                        history: this.history
                    }))
                },
                this.renderCore()
            );
        }
    }]);
    return CoreAdmin;
}(_react2.default.Component);

CoreAdmin.propTypes = {
    appLayout: componentPropType,
    authProvider: _propTypes2.default.func,
    children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
    catchAll: componentPropType,
    customSagas: _propTypes2.default.array,
    customReducers: _propTypes2.default.object,
    customRoutes: _propTypes2.default.array,
    dashboard: componentPropType,
    dataProvider: _propTypes2.default.func,
    history: _propTypes2.default.object,
    i18nProvider: _propTypes2.default.func,
    initialState: _propTypes2.default.object,
    loading: componentPropType,
    locale: _propTypes2.default.string,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    theme: _propTypes2.default.object,
    title: _propTypes2.default.node
};
CoreAdmin.contextTypes = {
    store: _propTypes2.default.object
};
exports.default = (0, _withContext2.default)({
    authProvider: _propTypes2.default.func
}, function (_ref) {
    var authProvider = _ref.authProvider;
    return { authProvider: authProvider };
})(CoreAdmin);
module.exports = exports['default'];