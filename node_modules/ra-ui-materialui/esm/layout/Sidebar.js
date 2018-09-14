import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { setSidebarVisibility } from 'ra-core';

import Responsive from './Responsive';

export var DRAWER_WIDTH = 240;
export var CLOSED_DRAWER_WIDTH = 55;

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
        }, _defineProperty(_drawerPaper, theme.breakpoints.only('xs'), {
            marginTop: 0,
            height: '100vh',
            position: 'inherit',
            backgroundColor: theme.palette.background.default
        }), _defineProperty(_drawerPaper, theme.breakpoints.up('md'), {
            border: 'none',
            marginTop: '1.5em'
        }), _drawerPaper)
    };
};

// We shouldn't need PureComponent here as it's connected
// but for some reason it keeps rendering even though mapStateToProps returns the same object

var Sidebar = function (_PureComponent) {
    _inherits(Sidebar, _PureComponent);

    function Sidebar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Sidebar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function () {
            return _this.props.setSidebarVisibility(false);
        }, _this.toggleSidebar = function () {
            return _this.props.setSidebarVisibility(!_this.props.open);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Sidebar, [{
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
                rest = _objectWithoutProperties(_props2, ['children', 'classes', 'closedSize', 'open', 'setSidebarVisibility', 'size', 'width']);

            return React.createElement(Responsive, {
                xsmall: React.createElement(
                    Drawer,
                    _extends({
                        variant: 'temporary',
                        open: open,
                        PaperProps: {
                            className: classes.drawerPaper,
                            style: { width: size }
                        },
                        onClose: this.toggleSidebar
                    }, rest),
                    React.cloneElement(children, {
                        onMenuClick: this.handleClose
                    })
                ),
                small: React.createElement(
                    Drawer,
                    _extends({
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
                    React.cloneElement(children, {
                        dense: true,
                        onMenuClick: this.handleClose
                    })
                ),
                medium: React.createElement(
                    Drawer,
                    _extends({
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
                    React.cloneElement(children, { dense: true })
                )
            });
        }
    }]);

    return Sidebar;
}(PureComponent);

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    closedSize: PropTypes.number,
    open: PropTypes.bool.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
    size: PropTypes.number,
    width: PropTypes.string
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

export default compose(connect(mapStateToProps, { setSidebarVisibility: setSidebarVisibility }), withStyles(styles), withWidth({ resizeInterval: Infinity }) // used to initialize the visibility on first render
)(Sidebar);