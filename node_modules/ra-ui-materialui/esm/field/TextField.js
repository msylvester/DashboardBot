import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';

import sanitizeRestProps from './sanitizeRestProps';

var TextField = function TextField(_ref) {
    var className = _ref.className,
        source = _ref.source,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        rest = _objectWithoutProperties(_ref, ['className', 'source', 'record']);

    return React.createElement(
        Typography,
        _extends({
            component: 'span',
            body1: 'body1',
            className: className
        }, sanitizeRestProps(rest)),
        get(record, source)
    );
};

TextField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired
};

var PureTextField = pure(TextField);

PureTextField.defaultProps = {
    addLabel: true
};

export default PureTextField;