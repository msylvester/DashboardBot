import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userCheck } from '../actions/authActions';

/**
 * Restrict access to children to authenticated users
 *
 * Useful for Route components ; used internally by Resource.
 * Use it to decorate your custom page components to require
 * authentication.
 *
 * Pass the `location` from the `routeParams` as `location` prop.
 * You can set additional `authParams` at will if your authProvider
 * requires it.
 *
 * @example
 *     import { Authenticated } from 'react-admin';
 *
 *     const CustomRoutes = [
 *         <Route path="/foo" render={routeParams =>
 *             <Authenticated location={routeParams.location} authParams={{ foo: 'bar' }}>
 *                 <Foo />
 *             </Authenticated>
 *         } />
 *     ];
 *     const App = () => (
 *         <Admin customRoutes={customRoutes}>
 *             ...
 *         </Admin>
 *     );
 */
export var Authenticated = function (_Component) {
    _inherits(Authenticated, _Component);

    function Authenticated() {
        _classCallCheck(this, Authenticated);

        return _possibleConstructorReturn(this, (Authenticated.__proto__ || Object.getPrototypeOf(Authenticated)).apply(this, arguments));
    }

    _createClass(Authenticated, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.checkAuthentication(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.location !== this.props.location) {
                this.checkAuthentication(nextProps);
            }
        }
    }, {
        key: 'checkAuthentication',
        value: function checkAuthentication(params) {
            var userCheck = params.userCheck,
                authParams = params.authParams,
                location = params.location;

            userCheck(authParams, location && location.pathname);
        }

        // render the child even though the AUTH_CHECK isn't finished (optimistic rendering)

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                userCheck = _props.userCheck,
                authParams = _props.authParams,
                location = _props.location,
                rest = _objectWithoutProperties(_props, ['children', 'userCheck', 'authParams', 'location']);

            return React.cloneElement(children, rest);
        }
    }]);

    return Authenticated;
}(Component);

Authenticated.propTypes = {
    authParams: PropTypes.object,
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    userCheck: PropTypes.func
};
export default connect(null, { userCheck: userCheck })(Authenticated);