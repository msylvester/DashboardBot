'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('@material-ui/core/styles');

var _colorManipulator = require('@material-ui/core/styles/colorManipulator');

var _CheckCircle = require('@material-ui/icons/CheckCircle');

var _CheckCircle2 = _interopRequireDefault(_CheckCircle);

var _ErrorOutline = require('@material-ui/icons/ErrorOutline');

var _ErrorOutline2 = _interopRequireDefault(_ErrorOutline);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        confirmPrimary: {
            color: theme.palette.primary.main
        },
        confirmWarning: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: (0, _colorManipulator.fade)(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent'
                }
            }
        },
        iconPaddingStyle: {
            paddingRight: '0.5em'
        }
    };
};

/**
 * Confirmation dialog
 *
 * @example
 * <Confirm
 *     isOpen={true}
 *     title="Delete Item"
 *     content="Are you sure you want to delete this item?"
 *     confirm="Yes"
 *     confirmColor="primary"
 *     cancel="Cancel"
 *     onConfirm={() => { // do something }}
 *     onClose={() => { // do something }}
 * />
 */
var Confirm = function Confirm(_ref) {
    var _classnames;

    var isOpen = _ref.isOpen,
        title = _ref.title,
        content = _ref.content,
        confirm = _ref.confirm,
        cancel = _ref.cancel,
        confirmColor = _ref.confirmColor,
        onConfirm = _ref.onConfirm,
        onClose = _ref.onClose,
        classes = _ref.classes;
    return _react2.default.createElement(
        _Dialog2.default,
        {
            open: isOpen,
            onClose: onClose,
            'aria-labelledby': 'alert-dialog-title'
        },
        _react2.default.createElement(
            _DialogTitle2.default,
            { id: 'alert-dialog-title' },
            title
        ),
        _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(
                _DialogContentText2.default,
                null,
                content
            )
        ),
        _react2.default.createElement(
            _DialogActions2.default,
            null,
            _react2.default.createElement(
                _Button2.default,
                { onClick: onClose },
                _react2.default.createElement(_ErrorOutline2.default, { className: classes.iconPaddingStyle }),
                cancel
            ),
            _react2.default.createElement(
                _Button2.default,
                {
                    onClick: onConfirm,
                    className: (0, _classnames3.default)('ra-confirm', (_classnames = {}, (0, _defineProperty3.default)(_classnames, classes.confirmWarning, confirmColor === 'warning'), (0, _defineProperty3.default)(_classnames, classes.confirmPrimary, confirmColor === 'primary'), _classnames)),
                    autoFocus: true
                },
                _react2.default.createElement(_CheckCircle2.default, { className: classes.iconPaddingStyle }),
                confirm
            )
        )
    );
};

Confirm.propTypes = {
    cancel: _propTypes2.default.string.isRequired,
    classes: _propTypes2.default.object.isRequired,
    confirm: _propTypes2.default.string.isRequired,
    confirmColor: _propTypes2.default.string.isRequired,
    content: _propTypes2.default.string.isRequired,
    isOpen: _propTypes2.default.bool,
    onClose: _propTypes2.default.func.isRequired,
    onConfirm: _propTypes2.default.func.isRequired,
    title: _propTypes2.default.string.isRequired
};

Confirm.defaultProps = {
    cancel: 'Cancel',
    classes: {},
    confirm: 'Confirm',
    confirmColor: 'primary',
    isOpen: false
};

exports.default = (0, _styles.withStyles)(styles)(Confirm);
module.exports = exports['default'];