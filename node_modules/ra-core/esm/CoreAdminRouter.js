import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, Component, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';

import { AUTH_GET_PERMISSIONS } from './auth/types';
import { isLoggedIn } from './reducer';
import { userLogout } from './actions/authActions';
import RoutesWithLayout from './RoutesWithLayout';

var welcomeStyles = {
    width: '50%',
    margin: '40vh',
    textAlign: 'center'
};

export var CoreAdminRouter = function (_Component) {
    _inherits(CoreAdminRouter, _Component);

    function CoreAdminRouter() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, CoreAdminRouter);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CoreAdminRouter.__proto__ || Object.getPrototypeOf(CoreAdminRouter)).call.apply(_ref, [this].concat(args))), _this), _this.state = { children: [] }, _this.initializeResources = function (nextProps) {
            if (typeof nextProps.children === 'function') {
                _this.initializeResourcesAsync(nextProps);
            }
        }, _this.initializeResourcesAsync = function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(props) {
                var authProvider, permissions, children, childrenFuncResult;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                authProvider = props.authProvider;
                                _context.prev = 1;
                                _context.next = 4;
                                return authProvider(AUTH_GET_PERMISSIONS);

                            case 4:
                                permissions = _context.sent;
                                children = props.children;
                                childrenFuncResult = children(permissions);

                                if (childrenFuncResult.then) {
                                    childrenFuncResult.then(function (resolvedChildren) {
                                        _this.setState({
                                            children: resolvedChildren.filter(function (child) {
                                                return child;
                                            }).map(function (child) {
                                                return _extends({}, child, {
                                                    props: _extends({}, child.props, {
                                                        key: child.props.name
                                                    })
                                                });
                                            })
                                        });
                                    });
                                } else {
                                    _this.setState({
                                        children: childrenFuncResult.filter(function (child) {
                                            return child;
                                        })
                                    });
                                }
                                _context.next = 13;
                                break;

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](1);

                                _this.props.userLogout();

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[1, 10]]);
            }));

            return function (_x) {
                return _ref2.apply(this, arguments);
            };
        }(), _this.renderCustomRoutesWithoutLayout = function (route, props) {
            if (route.props.render) {
                return route.props.render(_extends({}, props, {
                    title: _this.props.title
                }));
            }
            if (route.props.component) {
                return createElement(route.props.component, _extends({}, props, {
                    title: _this.props.title
                }));
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CoreAdminRouter, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.initializeResources(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
                this.setState({
                    children: []
                }, function () {
                    return _this3.initializeResources(nextProps);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props,
                appLayout = _props.appLayout,
                catchAll = _props.catchAll,
                children = _props.children,
                customRoutes = _props.customRoutes,
                dashboard = _props.dashboard,
                loading = _props.loading,
                logout = _props.logout,
                menu = _props.menu,
                theme = _props.theme,
                title = _props.title;


            if (typeof children !== 'function' && !children) {
                return React.createElement(
                    'div',
                    { style: welcomeStyles },
                    'React-admin is properly configured.',
                    React.createElement('br', null),
                    'Now you can add a first <Resource> as child of <Admin>.'
                );
            }

            if (typeof children === 'function' && (!this.state.children || this.state.children.length === 0)) {
                return React.createElement(Route, { path: '/', key: 'loading', component: loading });
            }

            var childrenToRender = typeof children === 'function' ? this.state.children : children;

            return React.createElement(
                'div',
                null,
                // Render every resources children outside the React Router Switch
                // as we need all of them and not just the one rendered
                Children.map(childrenToRender, function (child) {
                    return cloneElement(child, {
                        key: child.props.name,
                        // The context prop instructs the Resource component to not render anything
                        // but simply to register itself as a known resource
                        context: 'registration'
                    });
                }),
                React.createElement(
                    Switch,
                    null,
                    customRoutes.filter(function (route) {
                        return route.props.noLayout;
                    }).map(function (route, index) {
                        return React.createElement(Route, {
                            key: index,
                            exact: route.props.exact,
                            path: route.props.path,
                            render: function render(props) {
                                return _this4.renderCustomRoutesWithoutLayout(route, props);
                            }
                        });
                    }),
                    React.createElement(Route, {
                        path: '/',
                        render: function render() {
                            return createElement(appLayout, {
                                children: React.createElement(RoutesWithLayout, {
                                    catchAll: catchAll,
                                    children: childrenToRender // eslint-disable-line react/no-children-prop
                                    , customRoutes: customRoutes.filter(function (route) {
                                        return !route.props.noLayout;
                                    }),
                                    dashboard: dashboard,
                                    title: title
                                }),
                                dashboard: dashboard,
                                logout: logout,
                                menu: menu,
                                theme: theme,
                                title: title
                            });
                        }
                    })
                )
            );
        }
    }]);

    return CoreAdminRouter;
}(Component);

var componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

CoreAdminRouter.propTypes = {
    appLayout: componentPropType,
    authProvider: PropTypes.func,
    catchAll: componentPropType,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    isLoggedIn: PropTypes.bool,
    loading: componentPropType,
    logout: PropTypes.node,
    menu: componentPropType,
    theme: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    userLogout: PropTypes.func
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        isLoggedIn: isLoggedIn(state)
    };
};

export default compose(getContext({
    authProvider: PropTypes.func
}), connect(mapStateToProps, { userLogout: userLogout }))(CoreAdminRouter);