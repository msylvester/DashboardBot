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

var _raCore = require('ra-core');

var _styles = require('@material-ui/core/styles');

var _Table = require('@material-ui/core/Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableCell = require('@material-ui/core/TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableHead = require('@material-ui/core/TableHead');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require('@material-ui/core/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DatagridHeaderCell = require('./DatagridHeaderCell');

var _DatagridHeaderCell2 = _interopRequireDefault(_DatagridHeaderCell);

var _DatagridBody = require('./DatagridBody');

var _DatagridBody2 = _interopRequireDefault(_DatagridBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(Datagrid, _Component);

    function Datagrid() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Datagrid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Datagrid.__proto__ || Object.getPrototypeOf(Datagrid)).call.apply(_ref, [this].concat(args))), _this), _this.updateSort = function (event) {
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
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Datagrid, [{
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
                rest = (0, _objectWithoutProperties3.default)(_props, ['basePath', 'data', 'children', 'classes', 'className', 'currentSort', 'hasBulkActions', 'hover', 'ids', 'isLoading', 'resource', 'rowStyle', 'selectedIds', 'setSort', 'onSelect', 'onToggleItem', 'total', 'version']);


            if (!isLoading && (ids.length === 0 || total === 0)) {
                return null;
            }

            return _react2.default.createElement(
                _Table2.default,
                (0, _extends3.default)({
                    className: (0, _classnames2.default)(classes.table, className)
                }, (0, _raCore.sanitizeListRestProps)(rest)),
                _react2.default.createElement(
                    _TableHead2.default,
                    null,
                    _react2.default.createElement(
                        _TableRow2.default,
                        { className: classes.row },
                        hasBulkActions && _react2.default.createElement(
                            _TableCell2.default,
                            { padding: 'none' },
                            _react2.default.createElement(_Checkbox2.default, {
                                className: 'select-all',
                                color: 'primary',
                                checked: selectedIds.length > 0 && ids.length > 0 && !ids.find(function (it) {
                                    return selectedIds.indexOf(it) === -1;
                                }),
                                onChange: this.handleSelectAll
                            })
                        ),
                        _react2.default.Children.map(children, function (field, index) {
                            return field ? _react2.default.createElement(_DatagridHeaderCell2.default, {
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
                _react2.default.createElement(
                    _DatagridBody2.default,
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
}(_react.Component);

Datagrid.propTypes = {
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.node.isRequired,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    currentSort: _propTypes2.default.shape({
        sort: _propTypes2.default.string,
        order: _propTypes2.default.string
    }).isRequired,
    data: _propTypes2.default.object.isRequired,
    hasBulkActions: _propTypes2.default.bool.isRequired,
    hover: _propTypes2.default.bool,
    ids: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    isLoading: _propTypes2.default.bool,
    onSelect: _propTypes2.default.func,
    onToggleItem: _propTypes2.default.func,
    resource: _propTypes2.default.string,
    rowStyle: _propTypes2.default.func,
    selectedIds: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    setSort: _propTypes2.default.func,
    total: _propTypes2.default.number,
    version: _propTypes2.default.number
};

Datagrid.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    selectedIds: []
};

exports.default = (0, _styles.withStyles)(styles)(Datagrid);
module.exports = exports['default'];