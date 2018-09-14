import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { shallowEqual } from 'recompose';

var isObject = function isObject(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
};
var isEmpty = function isEmpty(obj) {
    return obj instanceof Date ? false : obj === '' || obj === null || shallowEqual(obj, {});
};

var removeEmpty = function removeEmpty(object) {
    return Object.keys(object).reduce(function (acc, key) {
        var child = object[key];

        if (isObject(object[key])) {
            child = removeEmpty(object[key]);
        }

        return isEmpty(child) ? acc : _extends({}, acc, _defineProperty({}, key, child));
    }, {});
};

export default removeEmpty;