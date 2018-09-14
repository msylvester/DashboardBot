import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import TableBody from '@material-ui/core/TableBody';
import classnames from 'classnames';

import DatagridRow from './DatagridRow';

var DatagridBody = function DatagridBody(_ref) {
    var basePath = _ref.basePath,
        classes = _ref.classes,
        className = _ref.className,
        resource = _ref.resource,
        children = _ref.children,
        hasBulkActions = _ref.hasBulkActions,
        hover = _ref.hover,
        ids = _ref.ids,
        isLoading = _ref.isLoading,
        data = _ref.data,
        selectedIds = _ref.selectedIds,
        styles = _ref.styles,
        rowStyle = _ref.rowStyle,
        onToggleItem = _ref.onToggleItem,
        version = _ref.version,
        rest = _objectWithoutProperties(_ref, ['basePath', 'classes', 'className', 'resource', 'children', 'hasBulkActions', 'hover', 'ids', 'isLoading', 'data', 'selectedIds', 'styles', 'rowStyle', 'onToggleItem', 'version']);

    return React.createElement(
        TableBody,
        _extends({ className: classnames('datagrid-body', className) }, rest),
        ids.map(function (id, rowIndex) {
            var _classnames;

            return React.createElement(
                DatagridRow,
                {
                    basePath: basePath,
                    classes: classes,
                    className: classnames(classes.row, (_classnames = {}, _defineProperty(_classnames, classes.rowEven, rowIndex % 2 === 0), _defineProperty(_classnames, classes.rowOdd, rowIndex % 2 !== 0), _classnames)),
                    hasBulkActions: hasBulkActions,
                    id: id,
                    key: id,
                    onToggleItem: onToggleItem,
                    record: data[id],
                    resource: resource,
                    selected: selectedIds.includes(id),
                    hover: hover,
                    style: rowStyle ? rowStyle(data[id], rowIndex) : null
                },
                children
            );
        })
    );
};

DatagridBody.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    styles: PropTypes.object,
    version: PropTypes.number
};

DatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: []
};

var areArraysEqual = function areArraysEqual(arr1, arr2) {
    return arr1.length == arr2.length && arr1.every(function (v, i) {
        return v === arr2[i];
    });
};

var PureDatagridBody = shouldUpdate(function (props, nextProps) {
    return props.version !== nextProps.version || nextProps.isLoading === false || !areArraysEqual(props.ids, nextProps.ids) || props.data !== nextProps.data;
})(DatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
PureDatagridBody.muiName = 'TableBody';

export default PureDatagridBody;