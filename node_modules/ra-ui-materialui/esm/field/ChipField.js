import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';

var styles = {
    chip: { margin: 4 }
};

var ChipField = function ChipField(_ref) {
    var className = _ref.className,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        source = _ref.source,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        rest = _objectWithoutProperties(_ref, ['className', 'classes', 'source', 'record']);

    return React.createElement(Chip, _extends({
        className: classnames(classes.chip, className),
        label: get(record, source)
    }, sanitizeRestProps(rest)));
};

export { ChipField };
ChipField.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    elStyle: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    record: PropTypes.object
};

var PureChipField = withStyles(styles)(pure(ChipField));

export default PureChipField;