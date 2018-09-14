import _extends from 'babel-runtime/helpers/extends';
import React, { Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import WithPermissions from './auth/WithPermissions';

var RoutesWithLayout = function RoutesWithLayout(_ref) {
    var catchAll = _ref.catchAll,
        children = _ref.children,
        customRoutes = _ref.customRoutes,
        dashboard = _ref.dashboard,
        title = _ref.title;

    var childrenAsArray = React.Children.toArray(children);
    var firstChild = childrenAsArray.length > 0 ? childrenAsArray[0] : null;

    return React.createElement(
        Switch,
        null,
        customRoutes && customRoutes.map(function (route, index) {
            return React.createElement(Route, {
                key: index,
                exact: route.props.exact,
                path: route.props.path,
                component: route.props.component,
                render: route.props.render,
                children: route.props.children // eslint-disable-line react/no-children-prop
            });
        }),
        Children.map(children, function (child) {
            return React.createElement(Route, {
                key: child.props.name,
                path: '/' + child.props.name,
                render: function render(props) {
                    return cloneElement(child, _extends({
                        // The context prop instruct the Resource component to
                        // render itself as a standard component
                        context: 'route'
                    }, props));
                }
            });
        }),
        dashboard ? React.createElement(Route, {
            exact: true,
            path: '/',
            render: function render(routeProps) {
                return React.createElement(WithPermissions, _extends({
                    authParams: {
                        route: 'dashboard'
                    }
                }, routeProps, {
                    render: function render(props) {
                        return createElement(dashboard, props);
                    }
                }));
            }
        }) : firstChild ? React.createElement(Route, {
            exact: true,
            path: '/',
            render: function render() {
                return React.createElement(Redirect, { to: '/' + firstChild.props.name });
            }
        }) : null,
        React.createElement(Route, {
            render: function render() {
                return createElement(catchAll, {
                    title: title
                });
            }
        })
    );
};

var componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

RoutesWithLayout.propTypes = {
    catchAll: componentPropType,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default RoutesWithLayout;