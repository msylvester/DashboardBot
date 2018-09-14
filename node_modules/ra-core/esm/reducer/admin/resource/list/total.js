import { CRUD_GET_ONE_SUCCESS, CRUD_GET_LIST_SUCCESS, CRUD_DELETE_OPTIMISTIC, CRUD_DELETE_MANY_OPTIMISTIC } from '../../../../actions/dataActions';

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    if (type === CRUD_GET_ONE_SUCCESS) {
        return previousState == 0 ? 1 : previousState;
    }
    if (type === CRUD_GET_LIST_SUCCESS) {
        return payload.total;
    }
    if (type === CRUD_DELETE_OPTIMISTIC) {
        return previousState - 1;
    }
    if (type === CRUD_DELETE_MANY_OPTIMISTIC) {
        return previousState - payload.ids.length;
    }
    return previousState;
});