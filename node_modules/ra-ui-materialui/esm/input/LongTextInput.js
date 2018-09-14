import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from 'ra-core';
import ResettableTextField from './ResettableTextField';

import sanitizeRestProps from './sanitizeRestProps';

var LongTextInput = function LongTextInput(_ref) {
    var className = _ref.className,
        input = _ref.input,
        meta = _ref.meta,
        isRequired = _ref.isRequired,
        label = _ref.label,
        options = _ref.options,
        source = _ref.source,
        resource = _ref.resource,
        rest = _objectWithoutProperties(_ref, ['className', 'input', 'meta', 'isRequired', 'label', 'options', 'source', 'resource']);

    if (typeof meta === 'undefined') {
        throw new Error("The LongTextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
    }
    var touched = meta.touched,
        error = meta.error;

    return React.createElement(ResettableTextField, _extends({}, input, {
        className: className,
        multiline: true,
        margin: 'normal',
        label: React.createElement(FieldTitle, {
            label: label,
            source: source,
            resource: resource,
            isRequired: isRequired
        }),
        error: !!(touched && error),
        helperText: touched && error
    }, sanitizeRestProps(rest), options));
};

export { LongTextInput };
LongTextInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    fullWidth: PropTypes.bool,
    meta: PropTypes.object,
    name: PropTypes.string,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)])
};

var EnhancedLongTextInput = addField(LongTextInput);
EnhancedLongTextInput.defaultProps = {
    options: {},
    fullWidth: true
};

export default EnhancedLongTextInput;