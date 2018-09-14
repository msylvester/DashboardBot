import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { CRUD_GET_MANY_REFERENCE_SUCCESS } from '../../../actions/dataActions';

var initialState = {};

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload,
        meta = _ref.meta;

    switch (type) {
        case CRUD_GET_MANY_REFERENCE_SUCCESS:
            return _extends({}, previousState, _defineProperty({}, meta.relatedTo, payload.data.map(function (record) {
                return record.id;
            })));
        default:
            return previousState;
    }
});

export var getIds = function getIds(state, relatedTo) {
    return state.admin.references.oneToMany[relatedTo];
};

export var getReferences = function getReferences(state, reference, relatedTo) {
    var ids = getIds(state, relatedTo);
    if (typeof ids === 'undefined') return undefined;

    if (!state.admin.resources[reference]) {
        // eslint-disable-next-line no-console
        console.error('Invalid Resource "' + reference + '"\n' + ('You are trying to display or edit a field of a resource called "' + reference + '", ') + 'but it has not been declared.\n' + "Declare this resource in the Admin or check the 'reference' prop of ReferenceArrayField and ReferenceManyField.", { ids: ids });
    }

    return ids.map(function (id) {
        var resource = state.admin.resources[reference];

        if (!resource) {
            return;
        }

        return resource.data[id];
    }).filter(function (r) {
        return typeof r !== 'undefined';
    }).reduce(function (prev, record) {
        prev[record.id] = record; // eslint-disable-line no-param-reassign
        return prev;
    }, {});
};

export var getReferencesByIds = function getReferencesByIds(state, reference, ids) {
    if (ids.length === 0) return {};

    if (!state.admin.resources[reference]) {
        // eslint-disable-next-line no-console
        console.error('Invalid Resource "' + reference + '"\n' + ('You are trying to display or edit a field of a resource called "' + reference + '", ') + 'but it has not been declared.\n' + "Declare this resource in the Admin or check the 'reference' prop of ReferenceArrayField.", { ids: ids });
    }

    var references = ids.map(function (id) {
        var resource = state.admin.resources[reference];

        if (!resource) {
            return;
        }

        return resource.data[id];
    }).filter(function (r) {
        return typeof r !== 'undefined';
    }).reduce(function (prev, record) {
        prev[record.id] = record; // eslint-disable-line no-param-reassign
        return prev;
    }, {});

    return Object.keys(references).length > 0 ? references : null;
};

export var nameRelatedTo = function nameRelatedTo(reference, id, resource, target) {
    var filter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var keys = Object.keys(filter);
    if (!keys.length) {
        return resource + '_' + reference + '@' + target + '_' + id;
    }

    return resource + '_' + reference + '@' + target + '_' + id + '?' + keys.map(function (key) {
        return key + '=' + JSON.stringify(filter[key]);
    }).join('&');
};