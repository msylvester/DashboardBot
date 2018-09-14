'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shouldUpdate = require('recompose/shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _TableBody = require('@material-ui/core/TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _DatagridRow = require('./DatagridRow');

var _DatagridRow2 = _interopRequireDefault(_DatagridRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'classes', 'className', 'resource', 'children', 'hasBulkActions', 'hover', 'ids', 'isLoading', 'data', 'selectedIds', 'styles', 'rowStyle', 'onToggleItem', 'version']);
    return _react2.default.createElement(
        _TableBody2.default,
        (0, _extends3.default)({ className: (0, _classnames3.default)('datagrid-body', className) }, rest),
        ids.map(function (id, rowIndex) {
            var _classnames;

            return _react2.default.createElement(
                _DatagridRow2.default,
                {
                    basePath: basePath,
                    classes: classes,
                    className: (0, _classnames3.default)(classes.row, (_classnames = {}, (0, _defineProperty3.default)(_classnames, classes.rowEven, rowIndex % 2 === 0), (0, _defineProperty3.default)(_classnames, classes.rowOdd, rowIndex % 2 !== 0), _classnames)),
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
    basePath: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    data: _propTypes2.default.object.isRequired,
    hasBulkActions: _propTypes2.default.bool.isRequired,
    hover: _propTypes2.default.bool,
    ids: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    isLoading: _propTypes2.default.bool,
    onToggleItem: _propTypes2.default.func,
    resource: _propTypes2.default.string,
    rowStyle: _propTypes2.default.func,
    selectedIds: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    styles: _propTypes2.default.object,
    version: _propTypes2.default.number
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

var PureDatagridBody = (0, _shouldUpdate2.default)(function (props, nextProps) {
    return props.version !== nextProps.version || nextProps.isLoading === false || !areArraysEqual(props.ids, nextProps.ids) || props.data !== nextProps.data;
})(DatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
PureDatagridBody.muiName = 'TableBody';

exports.default = PureDatagridBody;
module.exports = exports['default'];