import _defineProperty from 'babel-runtime/helpers/defineProperty';
var removeKey = function removeKey(target, path) {
    return Object.keys(target).reduce(function (acc, key) {
        if (key !== path) {
            return Object.assign({}, acc, _defineProperty({}, key, target[key]));
        }

        return acc;
    }, {});
};

var deepRemoveKey = function deepRemoveKey(target, path) {
    var paths = path.split('.');

    if (paths.length === 1) {
        return removeKey(target, path);
    }

    var deepKey = paths[0];
    var deep = deepRemoveKey(target[deepKey], paths.slice(1).join('.'));

    if (Object.keys(deep).length === 0) {
        return removeKey(target, deepKey);
    }

    return Object.assign({}, target, _defineProperty({}, deepKey, deep));
};

export default deepRemoveKey;