export var CRUD_SHOW_FILTER = 'RA/CRUD_SHOW_FILTER';
export var CRUD_HIDE_FILTER = 'RA/CRUD_HIDE_FILTER';
export var CRUD_SET_FILTER = 'RA/CRUD_SET_FILTER';

export var showFilter = function showFilter(resource, field) {
    return {
        type: CRUD_SHOW_FILTER,
        payload: { field: field },
        meta: { resource: resource }
    };
};

export var hideFilter = function hideFilter(resource, field) {
    return {
        type: CRUD_HIDE_FILTER,
        payload: { field: field },
        meta: { resource: resource }
    };
};

export var setFilter = function setFilter(resource, field, value) {
    return {
        type: CRUD_SET_FILTER,
        payload: { field: field, value: value },
        meta: { resource: resource }
    };
};