import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import classnames from 'classnames';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var cellClassName = _ref.cellClassName,
        className = _ref.className,
        field = _ref.field,
        formClassName = _ref.formClassName,
        headerClassName = _ref.headerClassName,
        record = _ref.record,
        basePath = _ref.basePath,
        resource = _ref.resource,
        rest = _objectWithoutProperties(_ref, ['cellClassName', 'className', 'field', 'formClassName', 'headerClassName', 'record', 'basePath', 'resource']);

    return rest;
};

var DatagridCell = function DatagridCell(_ref2) {
    var className = _ref2.className,
        field = _ref2.field,
        record = _ref2.record,
        basePath = _ref2.basePath,
        resource = _ref2.resource,
        rest = _objectWithoutProperties(_ref2, ['className', 'field', 'record', 'basePath', 'resource']);

    return React.createElement(
        TableCell,
        _extends({
            className: classnames(className, field.props.cellClassName),
            numeric: field.props.textAlign === 'right',
            padding: 'none'
        }, sanitizeRestProps(rest)),
        React.cloneElement(field, {
            record: record,
            basePath: field.props.basePath || basePath,
            resource: resource
        })
    );
};

export { DatagridCell };
DatagridCell.propTypes = {
    className: PropTypes.string,
    field: PropTypes.element,
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    basePath: PropTypes.string,
    resource: PropTypes.string
};

export default DatagridCell;