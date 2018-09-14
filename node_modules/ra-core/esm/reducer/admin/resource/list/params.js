import { CRUD_CHANGE_LIST_PARAMS } from '../../../../actions/listActions';

var defaultState = {
    sort: null,
    order: null,
    page: 1,
    perPage: null,
    filter: {}
};

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case CRUD_CHANGE_LIST_PARAMS:
            return payload;
        default:
            return previousState;
    }
});