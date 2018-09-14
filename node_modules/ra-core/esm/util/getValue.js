import _typeof from 'babel-runtime/helpers/typeof';
import get from 'lodash/get';

export default (function (value, path) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return get(value, path);
    }

    return value;
});