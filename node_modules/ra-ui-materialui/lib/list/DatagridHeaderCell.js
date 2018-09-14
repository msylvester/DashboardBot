'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatagridHeaderCell = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shouldUpdate = require('recompose/shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _TableCell = require('@material-ui/core/TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableSortLabel = require('@material-ui/core/TableSortLabel');

var _TableSortLabel2 = _interopRequireDefault(_TableSortLabel);

var _Tooltip = require('@material-ui/core/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// remove the sort icons when not active
var styles = {
    icon: {
        display: 'none'
    },
    active: {
        '& $icon': {
            display: 'inline'
        }
    }
};

var DatagridHeaderCell = function DatagridHeaderCell(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        field = _ref.field,
        currentSort = _ref.currentSort,
        updateSort = _ref.updateSort,
        resource = _ref.resource,
        isSorting = _ref.isSorting,
        translate = _ref.translate,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'field', 'currentSort', 'updateSort', 'resource', 'isSorting', 'translate']);
    return _react2.default.createElement(
        _TableCell2.default,
        (0, _extends3.default)({
            className: (0, _classnames2.default)(className, field.props.headerClassName),
            numeric: field.props.textAlign === 'right',
            padding: 'none',
            variant: 'head'
        }, rest),
        field.props.sortable !== false && (field.props.sortBy || field.props.source) ? _react2.default.createElement(
            _Tooltip2.default,
            {
                title: translate('ra.action.sort'),
                placement: field.props.textAlign === 'right' ? 'bottom-end' : 'bottom-start',
                enterDelay: 300
            },
            _react2.default.createElement(
                _TableSortLabel2.default,
                {
                    active: currentSort.field === (field.props.sortBy || field.props.source),
                    direction: currentSort.order === 'ASC' ? 'asc' : 'desc',
                    'data-sort': field.props.sortBy || field.props.source,
                    onClick: updateSort,
                    classes: classes
                },
                _react2.default.createElement(_raCore.FieldTitle, {
                    label: field.props.label,
                    source: field.props.source,
                    resource: resource
                })
            )
        ) : _react2.default.createElement(_raCore.FieldTitle, {
            label: field.props.label,
            source: field.props.source,
            resource: resource
        })
    );
};

exports.DatagridHeaderCell = DatagridHeaderCell;
DatagridHeaderCell.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    field: _propTypes2.default.element,
    currentSort: _propTypes2.default.shape({
        sort: _propTypes2.default.string,
        order: _propTypes2.default.string
    }).isRequired,
    isSorting: _propTypes2.default.bool,
    sortable: _propTypes2.default.bool,
    resource: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    updateSort: _propTypes2.default.func.isRequired
};

var enhance = (0, _compose2.default)((0, _shouldUpdate2.default)(function (props, nextProps) {
    return props.isSorting !== nextProps.isSorting || nextProps.isSorting && props.currentSort.order !== nextProps.currentSort.order;
}), _raCore.translate, (0, _styles.withStyles)(styles));

exports.default = enhance(DatagridHeaderCell);