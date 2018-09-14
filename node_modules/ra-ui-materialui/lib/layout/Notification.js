'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Snackbar = require('@material-ui/core/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('@material-ui/core/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(Notification, _React$Component);

    function Notification() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Notification);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Notification.__proto__ || Object.getPrototypeOf(Notification)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Notification, [{
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
                rest = (0, _objectWithoutProperties3.default)(_props, ['undo', 'complete', 'classes', 'className', 'type', 'translate', 'notification', 'autoHideDuration', 'hideNotification']);


            return _react2.default.createElement(_Snackbar2.default, (0, _extends3.default)({
                open: this.state.open,
                message: notification && notification.message && translate(notification.message, notification.messageArgs),
                autoHideDuration: notification && notification.autoHideDuration || autoHideDuration,
                onExited: this.handleExited,
                onClose: this.handleRequestClose,
                ContentProps: {
                    className: (0, _classnames2.default)(classes[notification && notification.type || type], className)
                },
                action: notification && notification.undoable ? _react2.default.createElement(
                    _Button2.default,
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
}(_react2.default.Component);

Notification.propTypes = {
    complete: _propTypes2.default.func,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    notification: _propTypes2.default.shape({
        message: _propTypes2.default.string,
        type: _propTypes2.default.string,
        autoHideDuration: _propTypes2.default.number,
        messageArgs: _propTypes2.default.object
    }),
    type: _propTypes2.default.string,
    hideNotification: _propTypes2.default.func.isRequired,
    autoHideDuration: _propTypes2.default.number,
    translate: _propTypes2.default.func.isRequired,
    undo: _propTypes2.default.func
};

Notification.defaultProps = {
    type: 'info',
    autoHideDuration: 4000
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        notification: (0, _raCore.getNotification)(state)
    };
};

exports.default = (0, _compose2.default)(_raCore.translate, (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, {
    complete: _raCore.complete,
    hideNotification: _raCore.hideNotification,
    undo: _raCore.undo
}))(Notification);
module.exports = exports['default'];