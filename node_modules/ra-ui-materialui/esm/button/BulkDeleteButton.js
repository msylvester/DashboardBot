import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ActionDelete from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { crudDeleteMany, startUndoable } from 'ra-core';

import Button from './Button';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        classes = _ref.classes,
        dispatchCrudDeleteMany = _ref.dispatchCrudDeleteMany,
        filterValues = _ref.filterValues,
        label = _ref.label,
        resource = _ref.resource,
        selectedIds = _ref.selectedIds,
        startUndoable = _ref.startUndoable,
        undoable = _ref.undoable,
        rest = _objectWithoutProperties(_ref, ['basePath', 'classes', 'dispatchCrudDeleteMany', 'filterValues', 'label', 'resource', 'selectedIds', 'startUndoable', 'undoable']);

    return rest;
};

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

var BulkDeleteButton = function (_Component) {
    _inherits(BulkDeleteButton, _Component);

    function BulkDeleteButton() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, BulkDeleteButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = BulkDeleteButton.__proto__ || Object.getPrototypeOf(BulkDeleteButton)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function () {
            var _this$props = _this.props,
                basePath = _this$props.basePath,
                dispatchCrudDeleteMany = _this$props.dispatchCrudDeleteMany,
                resource = _this$props.resource,
                selectedIds = _this$props.selectedIds,
                startUndoable = _this$props.startUndoable,
                undoable = _this$props.undoable;

            if (undoable) {
                startUndoable(crudDeleteMany(resource, selectedIds, basePath));
            } else {
                dispatchCrudDeleteMany(resource, selectedIds, basePath);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BulkDeleteButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                label = _props.label,
                rest = _objectWithoutProperties(_props, ['classes', 'label']);

            return React.createElement(
                Button,
                _extends({
                    onClick: this.handleClick,
                    label: label,
                    className: classes.deleteButton
                }, sanitizeRestProps(rest)),
                React.createElement(ActionDelete, null)
            );
        }
    }]);

    return BulkDeleteButton;
}(Component);

BulkDeleteButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    dispatchCrudDeleteMany: PropTypes.func.isRequired,
    label: PropTypes.string,
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    undoable: PropTypes.bool
};

var EnhancedBulkDeleteButton = compose(connect(undefined, {
    startUndoable: startUndoable,
    dispatchCrudDeleteMany: crudDeleteMany
}), withStyles(styles))(BulkDeleteButton);

EnhancedBulkDeleteButton.defaultProps = {
    label: 'ra.action.delete',
    undoable: true
};

export default EnhancedBulkDeleteButton;