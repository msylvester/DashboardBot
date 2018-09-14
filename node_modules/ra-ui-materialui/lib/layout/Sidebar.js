'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLOSED_DRAWER_WIDTH = exports.DRAWER_WIDTH = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Drawer = require('@material-ui/core/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _styles = require('@material-ui/core/styles');

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _raCore = require('ra-core');

var _Responsive = require('./Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DRAWER_WIDTH = exports.DRAWER_WIDTH = 240;
var CLOSED_DRAWER_WIDTH = exports.CLOSED_DRAWER_WIDTH = 55;

var styles = function styles(theme) {
    var _drawerPaper;

    return {
        drawerPaper: (_drawerPaper = {
            position: 'relative',
            height: 'auto',
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            backgroundColor: 'transparent',
            marginTop: '0.5em',
            borderRight: 'none'
        }, (0, _defineProperty3.default)(_drawerPaper, theme.breakpoints.only('xs'), {
            marginTop: 0,
            height: '100vh',
            position: 'inherit',
            backgroundColor: theme.palette.background.default
        }), (0, _defineProperty3.default)(_drawerPaper, theme.breakpoints.up('md'), {
            border: 'none',
            marginTop: '1.5em'
        }), _drawerPaper)
    };
};

// We shouldn't need PureComponent here as it's connected
// but for some reason it keeps rendering even though mapStateToProps returns the same object

var Sidebar = function (_PureComponent) {
    (0, _inherits3.default)(Sidebar, _PureComponent);

    function Sidebar() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Sidebar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function () {
            return _this.props.setSidebarVisibility(false);
        }, _this.toggleSidebar = function () {
            return _this.props.setSidebarVisibility(!_this.props.open);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Sidebar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                width = _props.width,
                setSidebarVisibility = _props.setSidebarVisibility;

            if (width !== 'xs' && width !== 'sm') {
                setSidebarVisibility(true);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                classes = _props2.classes,
                closedSize = _props2.closedSize,
                open = _props2.open,
                setSidebarVisibility = _props2.setSidebarVisibility,
                size = _props2.size,
                width = _props2.width,
                rest = (0, _objectWithoutProperties3.default)(_props2, ['children', 'classes', 'closedSize', 'open', 'setSidebarVisibility', 'size', 'width']);


            return _react2.default.createElement(_Responsive2.default, {
                xsmall: _react2.default.createElement(
                    _Drawer2.default,
                    (0, _extends3.default)({
                        variant: 'temporary',
                        open: open,
                        PaperProps: {
                            className: classes.drawerPaper,
                            style: { width: size }
                        },
                        onClose: this.toggleSidebar
                    }, rest),
                    _react2.default.cloneElement(children, {
                        onMenuClick: this.handleClose
                    })
                ),
                small: _react2.default.createElement(
                    _Drawer2.default,
                    (0, _extends3.default)({
                        variant: 'permanent',
                        open: open,
                        PaperProps: {
                            className: classes.drawerPaper,
                            style: {
                                width: open ? size : closedSize
                            }
                        },
                        onClose: this.toggleSidebar
                    }, rest),
                    _react2.default.cloneElement(children, {
                        dense: true,
                        onMenuClick: this.handleClose
                    })
                ),
                medium: _react2.default.createElement(
                    _Drawer2.default,
                    (0, _extends3.default)({
                        variant: 'permanent',
                        open: open,
                        PaperProps: {
                            className: classes.drawerPaper,
                            style: {
                                width: open ? size : closedSize
                            }
                        },
                        onClose: this.toggleSidebar
                    }, rest),
                    _react2.default.cloneElement(children, { dense: true })
                )
            });
        }
    }]);
    return Sidebar;
}(_react.PureComponent);

Sidebar.propTypes = {
    children: _propTypes2.default.node.isRequired,
    classes: _propTypes2.default.object,
    closedSize: _propTypes2.default.number,
    open: _propTypes2.default.bool.isRequired,
    setSidebarVisibility: _propTypes2.default.func.isRequired,
    size: _propTypes2.default.number,
    width: _propTypes2.default.string
};

Sidebar.defaultProps = {
    size: DRAWER_WIDTH,
    closedSize: CLOSED_DRAWER_WIDTH
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        open: state.admin.ui.sidebarOpen,
        locale: state.locale // force redraw on locale change
    };
};

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, { setSidebarVisibility: _raCore.setSidebarVisibility }), (0, _styles.withStyles)(styles), (0, _withWidth2.default)({ resizeInterval: Infinity }) // used to initialize the visibility on first render
)(Sidebar);