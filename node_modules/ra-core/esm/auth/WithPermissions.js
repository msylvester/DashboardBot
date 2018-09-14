import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import warning from 'warning';

import { userCheck } from '../actions/authActions';
import { AUTH_GET_PERMISSIONS } from '../auth/types';
import { isLoggedIn } from '../reducer';

var isEmptyChildren = function isEmptyChildren(children) {
    return Children.count(children) === 0;
};

/**
 * After checking that the user is authenticated,
 * retrieves the user's permissions for a specific context.
 *
 * Useful for Route components ; used internally by Resource.
 * Use it to decorate your custom page components to require
 * a custom role. It will pass the permissions as a prop to your
 * component.
 *
 * Pass the `location` from the `routeParams` as `location` prop.
 * You can set additional `authParams` at will if your authProvider
 * requires it.
 *
 * @example
 *     import { WithPermissions } from 'react-admin';
 *
 *     const Foo = ({ permissions }) => (
 *         {permissions === 'admin' ? <p>Sensitive data</p> : null}
 *         <p>Not sensitive data</p>
 *     );
 *
 *     const customRoutes = [
 *         <Route path="/foo" render={routeParams =>
 *             <WithPermissions location={routeParams.location} authParams={{ foo: 'bar' }}>
 *                 <Foo />
 *             </WithPermissions>
 *         } />
 *     ];
 *     const App = () => (
 *         <Admin customRoutes={customRoutes}>
 *             ...
 *         </Admin>
 *     );
 */
export var WithPermissions = function (_Component) {
    _inherits(WithPermissions, _Component);

    function WithPermissions() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, WithPermissions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithPermissions.__proto__ || Object.getPrototypeOf(WithPermissions)).call.apply(_ref, [this].concat(args))), _this), _this.cancelled = false, _this.state = { permissions: null }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WithPermissions, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            warning(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), 'You should not use both <WithPermissions render> and <WithPermissions children>; <WithPermissions children> will be ignored');
            this.checkAuthentication(this.props);
        }
    }, {
        key: 'componentDidMount',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.checkPermissions(this.props);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function componentDidMount() {
                return _ref2.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.cancelled = true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.location !== this.props.location || nextProps.authParams !== this.props.authParams || nextProps.isLoggedIn !== this.props.isLoggedIn) {
                this.checkAuthentication(nextProps);
                this.checkPermissions(this.props);
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
    }, {
        key: 'checkPermissions',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(params) {
                var authProvider, authParams, location, match, permissions;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                authProvider = params.authProvider, authParams = params.authParams, location = params.location, match = params.match;
                                _context2.prev = 1;
                                _context2.next = 4;
                                return authProvider(AUTH_GET_PERMISSIONS, _extends({}, authParams, {
                                    routeParams: match ? match.params : undefined,
                                    location: location ? location.pathname : undefined
                                }));

                            case 4:
                                permissions = _context2.sent;


                                if (!this.cancelled) {
                                    this.setState({ permissions: permissions });
                                }
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](1);

                                if (!this.cancelled) {
                                    this.setState({ permissions: null });
                                }

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 8]]);
            }));

            function checkPermissions(_x) {
                return _ref3.apply(this, arguments);
            }

            return checkPermissions;
        }()

        // render even though the AUTH_GET_PERMISSIONS
        // isn't finished (optimistic rendering)

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                authProvider = _props.authProvider,
                userCheck = _props.userCheck,
                isLoggedIn = _props.isLoggedIn,
                render = _props.render,
                children = _props.children,
                staticContext = _props.staticContext,
                props = _objectWithoutProperties(_props, ['authProvider', 'userCheck', 'isLoggedIn', 'render', 'children', 'staticContext']);

            var permissions = this.state.permissions;


            if (render) {
                return render(_extends({ permissions: permissions }, props));
            }

            if (children) {
                return children(_extends({ permissions: permissions }, props));
            }
        }
    }]);

    return WithPermissions;
}(Component);
WithPermissions.propTypes = {
    authProvider: PropTypes.func,
    authParams: PropTypes.object,
    children: PropTypes.func,
    location: PropTypes.object,
    match: PropTypes.object,
    render: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    staticContext: PropTypes.object,
    userCheck: PropTypes.func
};
var mapStateToProps = function mapStateToProps(state) {
    return {
        isLoggedIn: isLoggedIn(state)
    };
};

export default compose(getContext({
    authProvider: PropTypes.func
}), connect(mapStateToProps, { userCheck: userCheck }))(WithPermissions);