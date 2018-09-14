import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';
import sanitizeRestProps from './sanitizeRestProps';

export var removeTags = function removeTags(input) {
    return input ? input.replace(/<[^>]+>/gm, '') : '';
};

var RichTextField = function RichTextField(_ref) {
    var className = _ref.className,
        source = _ref.source,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        stripTags = _ref.stripTags,
        rest = _objectWithoutProperties(_ref, ['className', 'source', 'record', 'stripTags']);

    var value = get(record, source);
    if (stripTags) {
        return React.createElement(
            Typography,
            _extends({
                className: className,
                component: 'span'
            }, sanitizeRestProps(rest)),
            removeTags(value)
        );
    }

    return React.createElement(
        Typography,
        _extends({
            className: className,
            component: 'span'
        }, sanitizeRestProps(rest)),
        React.createElement('span', { dangerouslySetInnerHTML: { __html: value } })
    );
};

RichTextField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    stripTags: PropTypes.bool
};

var PureRichTextField = pure(RichTextField);

PureRichTextField.defaultProps = {
    addLabel: true,
    stripTags: false
};

export default PureRichTextField;