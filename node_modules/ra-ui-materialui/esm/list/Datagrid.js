import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sanitizeListRestProps } from 'ra-core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import classnames from 'classnames';

import DatagridHeaderCell from './DatagridHeaderCell';
import DatagridBody from './DatagridBody';

var styles = {
    table: {
        tableLayout: 'auto'
    },
    tbody: {
        height: 'inherit'
    },
    headerCell: {
        padding: '0 12px'
    },
    checkbox: {},
    row: {},
    rowEven: {},
    rowOdd: {},
    rowCell: {
        padding: '0 12px',
        '&:last-child': {
            padding: '0 12px'
        }
    }
};

/**
 * The Datagrid component renders a list of records as a table.
 * It is usually used as a child of the <List> and <ReferenceManyField> components.
 *
 * Props:
 *  - styles
 *  - rowStyle
 *  - options (passed as props to <Table>)
 *  - headerOptions (passed as props to mui <TableHead>)
 *  - bodyOptions (passed as props to mui <TableBody>)
 *  - rowOptions (passed as props to mui <TableRow>)
 *
 * @example Display all posts as a datagrid
 * const postRowStyle = (record, index) => ({
 *     backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
 * });
 * export const PostList = (props) => (
 *     <List {...props}>
 *         <Datagrid rowStyle={postRowStyle}>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <TextField source="body" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 */

var Datagrid = function (_Component) {
    _inherits(Datagrid, _Component);

    function Datagrid() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Datagrid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Datagrid.__proto__ || Object.getPrototypeOf(Datagrid)).call.apply(_ref, [this].concat(args))), _this), _this.updateSort = function (event) {
            event.stopPropagation();
            _this.props.setSort(event.currentTarget.dataset.sort);
        }, _this.handleSelectAll = function (event) {
            var _this$props = _this.props,
                onSelect = _this$props.onSelect,
                ids = _this$props.ids,
                selectedIds = _this$props.selectedIds;

            if (event.target.checked) {
                onSelect(ids.reduce(function (idList, id) {
                    return idList.includes(id) ? idList : idList.concat(id);
                }, selectedIds));
            } else {
                onSelect([]);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Datagrid, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                basePath = _props.basePath,
                data = _props.data,
                children = _props.children,
                classes = _props.classes,
                className = _props.className,
                currentSort = _props.currentSort,
                hasBulkActions = _props.hasBulkActions,
                hover = _props.hover,
                ids = _props.ids,
                isLoading = _props.isLoading,
                resource = _props.resource,
                rowStyle = _props.rowStyle,
                selectedIds = _props.selectedIds,
                setSort = _props.setSort,
                onSelect = _props.onSelect,
                onToggleItem = _props.onToggleItem,
                total = _props.total,
                version = _props.version,
                rest = _objectWithoutProperties(_props, ['basePath', 'data', 'children', 'classes', 'className', 'currentSort', 'hasBulkActions', 'hover', 'ids', 'isLoading', 'resource', 'rowStyle', 'selectedIds', 'setSort', 'onSelect', 'onToggleItem', 'total', 'version']);

            if (!isLoading && (ids.length === 0 || total === 0)) {
                return null;
            }

            return React.createElement(
                Table,
                _extends({
                    className: classnames(classes.table, className)
                }, sanitizeListRestProps(rest)),
                React.createElement(
                    TableHead,
                    null,
                    React.createElement(
                        TableRow,
                        { className: classes.row },
                        hasBulkActions && React.createElement(
                            TableCell,
                            { padding: 'none' },
                            React.createElement(Checkbox, {
                                className: 'select-all',
                                color: 'primary',
                                checked: selectedIds.length > 0 && ids.length > 0 && !ids.find(function (it) {
                                    return selectedIds.indexOf(it) === -1;
                                }),
                                onChange: this.handleSelectAll
                            })
                        ),
                        React.Children.map(children, function (field, index) {
                            return field ? React.createElement(DatagridHeaderCell, {
                                className: classes.headerCell,
                                currentSort: currentSort,
                                field: field,
                                isSorting: field.props.source === currentSort.field,
                                key: field.props.source || index,
                                resource: resource,
                                updateSort: _this2.updateSort
                            }) : null;
                        })
                    )
                ),
                React.createElement(
                    DatagridBody,
                    {
                        basePath: basePath,
                        classes: classes,
                        data: data,
                        hasBulkActions: hasBulkActions,
                        hover: hover,
                        ids: ids,
                        isLoading: isLoading,
                        onToggleItem: onToggleItem,
                        resource: resource,
                        rowStyle: rowStyle,
                        selectedIds: selectedIds,
                        version: version
                    },
                    children
                )
            );
        }
    }]);

    return Datagrid;
}(Component);

Datagrid.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string
    }).isRequired,
    data: PropTypes.object.isRequired,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    setSort: PropTypes.func,
    total: PropTypes.number,
    version: PropTypes.number
};

Datagrid.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    selectedIds: []
};

export default withStyles(styles)(Datagrid);