import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { translate, crudDelete, startUndoable } from 'ra-core';

import Button from './Button';

var styles = function styles(theme) {
    return {
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent'
                }
            }
        }
    };
};

var DeleteButton = function (_Component) {
    _inherits(DeleteButton, _Component);

    function DeleteButton() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DeleteButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DeleteButton.__proto__ || Object.getPrototypeOf(DeleteButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleDelete = function (event) {
            event.preventDefault();
            var _this$props = _this.props,
                dispatchCrudDelete = _this$props.dispatchCrudDelete,
                startUndoable = _this$props.startUndoable,
                resource = _this$props.resource,
                record = _this$props.record,
                basePath = _this$props.basePath,
                redirect = _this$props.redirect,
                undoable = _this$props.undoable;

            if (undoable) {
                startUndoable(crudDelete(resource, record.id, record, basePath, redirect));
            } else {
                dispatchCrudDelete(resource, record.id, record, basePath, redirect);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DeleteButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$label = _props.label,
                label = _props$label === undefined ? 'ra.action.delete' : _props$label,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                className = _props.className;

            return React.createElement(
                Button,
                {
                    onClick: this.handleDelete,
                    label: label,
                    className: classnames('ra-delete-button', classes.deleteButton, className),
                    key: 'button'
                },
                React.createElement(ActionDelete, null)
            );
        }
    }]);

    return DeleteButton;
}(Component);

DeleteButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    dispatchCrudDelete: PropTypes.func.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func,
    translate: PropTypes.func,
    undoable: PropTypes.bool
};

DeleteButton.defaultProps = {
    redirect: 'list',
    undoable: true
};

export default compose(connect(null, { startUndoable: startUndoable, dispatchCrudDelete: crudDelete }), translate, withStyles(styles))(DeleteButton);