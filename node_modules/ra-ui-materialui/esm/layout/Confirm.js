import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionCheck from '@material-ui/icons/CheckCircle';
import AlertError from '@material-ui/icons/ErrorOutline';
import classnames from 'classnames';

var styles = function styles(theme) {
    return {
        confirmPrimary: {
            color: theme.palette.primary.main
        },
        confirmWarning: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
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
    return React.createElement(
        Dialog,
        {
            open: isOpen,
            onClose: onClose,
            'aria-labelledby': 'alert-dialog-title'
        },
        React.createElement(
            DialogTitle,
            { id: 'alert-dialog-title' },
            title
        ),
        React.createElement(
            DialogContent,
            null,
            React.createElement(
                DialogContentText,
                null,
                content
            )
        ),
        React.createElement(
            DialogActions,
            null,
            React.createElement(
                Button,
                { onClick: onClose },
                React.createElement(AlertError, { className: classes.iconPaddingStyle }),
                cancel
            ),
            React.createElement(
                Button,
                {
                    onClick: onConfirm,
                    className: classnames('ra-confirm', (_classnames = {}, _defineProperty(_classnames, classes.confirmWarning, confirmColor === 'warning'), _defineProperty(_classnames, classes.confirmPrimary, confirmColor === 'primary'), _classnames)),
                    autoFocus: true
                },
                React.createElement(ActionCheck, { className: classes.iconPaddingStyle }),
                confirm
            )
        )
    );
};

Confirm.propTypes = {
    cancel: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    confirm: PropTypes.string.isRequired,
    confirmColor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

Confirm.defaultProps = {
    cancel: 'Cancel',
    classes: {},
    confirm: 'Confirm',
    confirmColor: 'primary',
    isOpen: false
};

export default withStyles(styles)(Confirm);