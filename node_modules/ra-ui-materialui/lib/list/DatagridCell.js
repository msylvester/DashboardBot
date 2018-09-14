'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatagridCell = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TableCell = require('@material-ui/core/TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var cellClassName = _ref.cellClassName,
        className = _ref.className,
        field = _ref.field,
        formClassName = _ref.formClassName,
        headerClassName = _ref.headerClassName,
        record = _ref.record,
        basePath = _ref.basePath,
        resource = _ref.resource,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['cellClassName', 'className', 'field', 'formClassName', 'headerClassName', 'record', 'basePath', 'resource']);
    return rest;
};

var DatagridCell = function DatagridCell(_ref2) {
    var className = _ref2.className,
        field = _ref2.field,
        record = _ref2.record,
        basePath = _ref2.basePath,
        resource = _ref2.resource,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['className', 'field', 'record', 'basePath', 'resource']);
    return _react2.default.createElement(
        _TableCell2.default,
        (0, _extends3.default)({
            className: (0, _classnames2.default)(className, field.props.cellClassName),
            numeric: field.props.textAlign === 'right',
            padding: 'none'
        }, sanitizeRestProps(rest)),
        _react2.default.cloneElement(field, {
            record: record,
            basePath: field.props.basePath || basePath,
            resource: resource
        })
    );
};

exports.DatagridCell = DatagridCell;
DatagridCell.propTypes = {
    className: _propTypes2.default.string,
    field: _propTypes2.default.element,
    record: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
    basePath: _propTypes2.default.string,
    resource: _propTypes2.default.string
};

exports.default = DatagridCell;