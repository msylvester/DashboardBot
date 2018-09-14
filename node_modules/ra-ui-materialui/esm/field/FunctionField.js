import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';

import sanitizeRestProps from './sanitizeRestProps';

/**
 * @example
 * <FunctionField source="last_name" label="Name" render={record => `${record.first_name} ${record.last_name}`} />
 */
var FunctionField = function FunctionField(_ref) {
    var className = _ref.className,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        source = _ref.source,
        render = _ref.render,
        rest = _objectWithoutProperties(_ref, ['className', 'record', 'source', 'render']);

    return record ? React.createElement(
        Typography,
        _extends({
            component: 'span',
            body1: 'body1',
            className: className
        }, sanitizeRestProps(rest)),
        render(record, source)
    ) : null;
};

FunctionField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    render: PropTypes.func.isRequired,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string
};

var PureFunctionField = pure(FunctionField);

PureFunctionField.defaultProps = {
    addLabel: true
};

export default PureFunctionField;