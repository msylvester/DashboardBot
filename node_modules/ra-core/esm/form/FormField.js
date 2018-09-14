import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import withDefaultValue from './withDefaultValue';

export var isRequired = function isRequired(validate) {
    if (validate && validate.isRequired) return true;
    if (Array.isArray(validate)) {
        return !!validate.find(function (it) {
            return it.isRequired;
        });
    }
    return false;
};

var FormFieldView = function FormFieldView(_ref) {
    var input = _ref.input,
        props = _objectWithoutProperties(_ref, ['input']);

    return input ? // An ancestor is already decorated by Field
    React.createElement(props.component, _extends({ input: input }, props)) : React.createElement(Field, _extends({}, props, {
        name: props.source,
        isRequired: isRequired(props.validate)
    }));
};

export { FormFieldView };
FormFieldView.propTypes = {
    component: PropTypes.any.isRequired,
    defaultValue: PropTypes.any,
    input: PropTypes.object,
    source: PropTypes.string,
    validate: PropTypes.oneOfType([PropTypes.func, PropTypes.array])
};

export default withDefaultValue(FormFieldView);