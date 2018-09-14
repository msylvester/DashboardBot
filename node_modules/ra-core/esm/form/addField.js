import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import FormField from './FormField';

export default (function (BaseComponent) {
    var WithFormField = function WithFormField(props) {
        return React.createElement(FormField, _extends({ component: BaseComponent }, props));
    };
    return WithFormField;
});