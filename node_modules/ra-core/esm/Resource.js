import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import WithPermissions from './auth/WithPermissions';

import { registerResource, unregisterResource } from './actions';

var componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

export var Resource = function (_Component) {
    _inherits(Resource, _Component);

    function Resource() {
        _classCallCheck(this, Resource);

        return _possibleConstructorReturn(this, (Resource.__proto__ || Object.getPrototypeOf(Resource)).apply(this, arguments));
    }

    _createClass(Resource, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                context = _props.context,
                name = _props.name,
                list = _props.list,
                create = _props.create,
                edit = _props.edit,
                show = _props.show,
                options = _props.options,
                icon = _props.icon,
                registerResource = _props.registerResource;


            if (context === 'registration') {
                var resource = {
                    name: name,
                    options: options,
                    hasList: !!list,
                    hasEdit: !!edit,
                    hasShow: !!show,
                    hasCreate: !!create,
                    icon: icon
                };

                registerResource(resource);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _props2 = this.props,
                context = _props2.context,
                name = _props2.name,
                unregisterResource = _props2.unregisterResource;

            if (context === 'registration') {
                unregisterResource(name);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                match = _props3.match,
                context = _props3.context,
                name = _props3.name,
                list = _props3.list,
                create = _props3.create,
                edit = _props3.edit,
                show = _props3.show,
                options = _props3.options;


            if (context === 'registration') {
                return null;
            }

            var resource = {
                resource: name,
                options: options,
                hasList: !!list,
                hasEdit: !!edit,
                hasShow: !!show,
                hasCreate: !!create
            };

            var basePath = match.url;

            return React.createElement(
                Switch,
                null,
                create && React.createElement(Route, {
                    path: match.url + '/create',
                    render: function render(routeProps) {
                        return React.createElement(WithPermissions, _extends({
                            render: function render(props) {
                                return createElement(create, _extends({
                                    basePath: basePath
                                }, props));
                            }
                        }, routeProps, resource));
                    }
                }),
                show && React.createElement(Route, {
                    path: match.url + '/:id/show',
                    render: function render(routeProps) {
                        return React.createElement(WithPermissions, _extends({
                            render: function render(props) {
                                return createElement(show, _extends({
                                    basePath: basePath,
                                    id: decodeURIComponent(props.match.params.id)
                                }, props));
                            }
                        }, routeProps, resource));
                    }
                }),
                edit && React.createElement(Route, {
                    path: match.url + '/:id',
                    render: function render(routeProps) {
                        return React.createElement(WithPermissions, _extends({
                            render: function render(props) {
                                return createElement(edit, _extends({
                                    basePath: basePath,
                                    id: decodeURIComponent(props.match.params.id)
                                }, props));
                            }
                        }, routeProps, resource));
                    }
                }),
                list && React.createElement(Route, {
                    path: '' + match.url,
                    render: function render(routeProps) {
                        return React.createElement(WithPermissions, _extends({
                            render: function render(props) {
                                return createElement(list, _extends({
                                    basePath: basePath
                                }, props));
                            }
                        }, routeProps, resource));
                    }
                })
            );
        }
    }]);

    return Resource;
}(Component);

Resource.propTypes = {
    context: PropTypes.oneOf(['route', 'registration']).isRequired,
    match: PropTypes.shape({
        isExact: PropTypes.bool,
        params: PropTypes.object,
        path: PropTypes.string,
        url: PropTypes.string
    }),
    name: PropTypes.string.isRequired,
    list: componentPropType,
    create: componentPropType,
    edit: componentPropType,
    show: componentPropType,
    icon: componentPropType,
    options: PropTypes.object,
    registerResource: PropTypes.func.isRequired,
    unregisterResource: PropTypes.func.isRequired
};

Resource.defaultProps = {
    context: 'route',
    options: {}
};

export default connect(null, { registerResource: registerResource, unregisterResource: unregisterResource })(Resource);