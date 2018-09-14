export var CRUD_CHANGE_LIST_PARAMS = 'RA/CRUD_CHANGE_LIST_PARAMS';
export var SET_LIST_SELECTED_IDS = 'RA/SET_LIST_SELECTED_IDS';
export var TOGGLE_LIST_ITEM = 'RA/TOGGLE_LIST_ITEM';

export var changeListParams = function changeListParams(resource, params) {
    return {
        type: CRUD_CHANGE_LIST_PARAMS,
        payload: params,
        meta: { resource: resource }
    };
};

export var setListSelectedIds = function setListSelectedIds(resource, ids) {
    return {
        type: SET_LIST_SELECTED_IDS,
        payload: ids,
        meta: { resource: resource }
    };
};

export var toggleListItem = function toggleListItem(resource, id) {
    return {
        type: TOGGLE_LIST_ITEM,
        payload: id,
        meta: { resource: resource }
    };
};