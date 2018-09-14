import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

var DisabledInput = function DisabledInput(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        record = _ref.record,
        value = _ref.input.value,
        label = _ref.label,
        resource = _ref.resource,
        source = _ref.source,
        options = _ref.options,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'record', 'input', 'label', 'resource', 'source', 'options']);

    return React.createElement(TextField, _extends({
        disabled: true,
        margin: 'normal',
        value: value,
        label: React.createElement(FieldTitle, { label: label, source: source, resource: resource }),
        className: className,
        classes: classes
    }, options, sanitizeRestProps(rest)));
};

DisabledInput.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.object,
    options: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string
};

export default addField(DisabledInput);