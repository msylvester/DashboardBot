import _extends from 'babel-runtime/helpers/extends';
import { createSelector } from 'reselect';

var getDefaultValues = function getDefaultValues() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaultValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var globalDefaultValue = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    return _extends({}, globalDefaultValue, defaultValues, data);
};

var getRecord = function getRecord(state, props) {
    return props.record;
};
var getDefaultValue = function getDefaultValue(state, props) {
    return props.defaultValue;
};
var getDefaultValuesFromState = function getDefaultValuesFromState(state) {
    return state.admin.record;
};

export default createSelector(getRecord, getDefaultValue, getDefaultValuesFromState, function (record, defaultValue, defaultValues) {
    return getDefaultValues(record, defaultValue, defaultValues);
});