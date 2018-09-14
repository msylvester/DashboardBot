import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';

import DatagridCell from './DatagridCell';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        resource = _ref.resource,
        children = _ref.children,
        id = _ref.id,
        isLoading = _ref.isLoading,
        record = _ref.record,
        basePath = _ref.basePath,
        selected = _ref.selected,
        styles = _ref.styles,
        style = _ref.style,
        onToggleItem = _ref.onToggleItem,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'resource', 'children', 'id', 'isLoading', 'record', 'basePath', 'selected', 'styles', 'style', 'onToggleItem']);

    return rest;
};

var DatagridRow = function (_Component) {
    _inherits(DatagridRow, _Component);

    function DatagridRow() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, DatagridRow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = DatagridRow.__proto__ || Object.getPrototypeOf(DatagridRow)).call.apply(_ref2, [this].concat(args))), _this), _this.handleToggle = function () {
            _this.props.onToggleItem(_this.props.id);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DatagridRow, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                classes = _props.classes,
                className = _props.className,
                hasBulkActions = _props.hasBulkActions,
                hover = _props.hover,
                id = _props.id,
                record = _props.record,
                resource = _props.resource,
                selected = _props.selected,
                style = _props.style,
                styles = _props.styles,
                rest = _objectWithoutProperties(_props, ['basePath', 'children', 'classes', 'className', 'hasBulkActions', 'hover', 'id', 'record', 'resource', 'selected', 'style', 'styles']);

            return React.createElement(
                TableRow,
                _extends({
                    className: className,
                    key: id,
                    style: style,
                    hover: hover
                }, sanitizeRestProps(rest)),
                hasBulkActions && React.createElement(
                    TableCell,
                    { padding: 'none' },
                    React.createElement(Checkbox, {
                        color: 'primary',
                        className: 'select-item ' + classes.checkbox,
                        checked: selected,
                        onClick: this.handleToggle
                    })
                ),
                React.Children.map(children, function (field, index) {
                    return field ? React.createElement(DatagridCell, _extends({
                        key: id + '-' + (field.props.source || index),
                        className: classnames('column-' + field.props.source, classes.rowCell),
                        record: record,
                        id: id
                    }, { field: field, basePath: basePath, resource: resource })) : null;
                })
            );
        }
    }]);

    return DatagridRow;
}(Component);

DatagridRow.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    id: PropTypes.any,
    onToggleItem: PropTypes.func,
    record: PropTypes.object.isRequired,
    resource: PropTypes.string,
    selected: PropTypes.bool,
    style: PropTypes.object,
    styles: PropTypes.object
};

DatagridRow.defaultProps = {
    hasBulkActions: false,
    hover: true,
    record: {},
    selected: false
};

export default DatagridRow;