import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import sanitizeRestProps from './sanitizeRestProps';

var EmailField = function EmailField(_ref) {
    var className = _ref.className,
        source = _ref.source,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        rest = _objectWithoutProperties(_ref, ['className', 'source', 'record']);

    return React.createElement(
        'a',
        _extends({
            className: className,
            href: 'mailto:' + get(record, source)
        }, sanitizeRestProps(rest)),
        get(record, source)
    );
};

EmailField.propTypes = {
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

var PureEmailField = pure(EmailField);

PureEmailField.defaultProps = {
    addLabel: true
};

export default PureEmailField;