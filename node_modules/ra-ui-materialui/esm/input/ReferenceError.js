import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

var ReferenceError = function ReferenceError(_ref) {
    var label = _ref.label,
        error = _ref.error;
    return React.createElement(TextField, { error: true, disabled: true, label: label, value: error, margin: 'normal' });
};

ReferenceError.propTypes = {
    error: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default ReferenceError;