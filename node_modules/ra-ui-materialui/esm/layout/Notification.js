import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';

import { hideNotification, getNotification, translate, undo, complete } from 'ra-core';

var styles = function styles(theme) {
    return {
        confirm: {
            backgroundColor: theme.palette.background.default
        },
        warning: {
            backgroundColor: theme.palette.error.light
        },
        undo: {
            color: theme.palette.primary.light
        }
    };
};

var Notification = function (_React$Component) {
    _inherits(Notification, _React$Component);

    function Notification() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Notification);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Notification.__proto__ || Object.getPrototypeOf(Notification)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            open: false
        }, _this.componentWillMount = function () {
            _this.setOpenState(_this.props);
        }, _this.componentWillReceiveProps = function (nextProps) {
            _this.setOpenState(nextProps);
        }, _this.setOpenState = function (_ref2) {
            var notification = _ref2.notification;

            _this.setState({
                open: !!notification
            });
        }, _this.handleRequestClose = function () {
            _this.setState({
                open: false
            });
        }, _this.handleExited = function () {
            var _this$props = _this.props,
                notification = _this$props.notification,
                hideNotification = _this$props.hideNotification,
                complete = _this$props.complete;

            if (notification && notification.undoable) {
                complete();
            }
            hideNotification();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Notification, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                undo = _props.undo,
                complete = _props.complete,
                classes = _props.classes,
                className = _props.className,
                type = _props.type,
                translate = _props.translate,
                notification = _props.notification,
                autoHideDuration = _props.autoHideDuration,
                hideNotification = _props.hideNotification,
                rest = _objectWithoutProperties(_props, ['undo', 'complete', 'classes', 'className', 'type', 'translate', 'notification', 'autoHideDuration', 'hideNotification']);

            return React.createElement(Snackbar, _extends({
                open: this.state.open,
                message: notification && notification.message && translate(notification.message, notification.messageArgs),
                autoHideDuration: notification && notification.autoHideDuration || autoHideDuration,
                onExited: this.handleExited,
                onClose: this.handleRequestClose,
                ContentProps: {
                    className: classnames(classes[notification && notification.type || type], className)
                },
                action: notification && notification.undoable ? React.createElement(
                    Button,
                    {
                        color: 'primary',
                        className: classes.undo,
                        size: 'small',
                        onClick: undo
                    },
                    translate('ra.action.undo')
                ) : null
            }, rest));
        }
    }]);

    return Notification;
}(React.Component);

Notification.propTypes = {
    complete: PropTypes.func,
    classes: PropTypes.object,
    className: PropTypes.string,
    notification: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
        autoHideDuration: PropTypes.number,
        messageArgs: PropTypes.object
    }),
    type: PropTypes.string,
    hideNotification: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number,
    translate: PropTypes.func.isRequired,
    undo: PropTypes.func
};

Notification.defaultProps = {
    type: 'info',
    autoHideDuration: 4000
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        notification: getNotification(state)
    };
};

export default compose(translate, withStyles(styles), connect(mapStateToProps, {
    complete: complete,
    hideNotification: hideNotification,
    undo: undo
}))(Notification);