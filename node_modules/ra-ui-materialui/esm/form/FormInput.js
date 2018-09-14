import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Labeled from '../input/Labeled';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        record = _ref.record,
        rest = _objectWithoutProperties(_ref, ['basePath', 'record']);

    return rest;
};

var styles = function styles(theme) {
    return {
        input: { width: theme.spacing.unit * 32 }
    };
};

var FormInput = function FormInput(_ref2) {
    var classes = _ref2.classes,
        input = _ref2.input,
        rest = _objectWithoutProperties(_ref2, ['classes', 'input']);

    return input ? React.createElement(
        'div',
        {
            className: classnames('ra-input', 'ra-input-' + input.props.source, input.props.formClassName)
        },
        input.props.addLabel ? React.createElement(
            Labeled,
            _extends({}, input.props, sanitizeRestProps(rest)),
            React.cloneElement(input, _extends({
                className: classnames(_defineProperty({}, classes.input, !input.props.fullWidth), input.props.className)
            }, rest))
        ) : React.cloneElement(input, _extends({
            className: classnames(_defineProperty({}, classes.input, !input.props.fullWidth), input.props.className)
        }, rest))
    ) : null;
};

export { FormInput };
FormInput.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    input: PropTypes.object
};

export default withStyles(styles)(FormInput);