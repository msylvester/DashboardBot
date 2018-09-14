import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { FETCH_END } from '../../../actions/fetchActions';
import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE } from '../../../dataFetchActions';
import { CRUD_DELETE_OPTIMISTIC, CRUD_DELETE_MANY_OPTIMISTIC, CRUD_UPDATE_OPTIMISTIC, CRUD_UPDATE_MANY_OPTIMISTIC } from '../../../actions/dataActions';

import getFetchedAt from '../../../util/getFetchedAt';

/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
export var addRecordsFactory = function addRecordsFactory(getFetchedAt) {
    return function () {
        var newRecords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var oldRecords = arguments[1];

        var newFetchedAt = getFetchedAt(newRecords.map(function (_ref) {
            var id = _ref.id;
            return id;
        }), oldRecords.fetchedAt);

        var newRecordsById = newRecords.reduce(function (acc, record) {
            return _extends({}, acc, _defineProperty({}, record.id, record));
        }, {});

        var records = Object.keys(newFetchedAt).reduce(function (acc, id) {
            return _extends({}, acc, _defineProperty({}, id, newRecordsById[id] || oldRecords[id]));
        }, {});

        Object.defineProperty(records, 'fetchedAt', {
            value: newFetchedAt
        }); // non enumerable by default

        return records;
    };
};

var addRecords = addRecordsFactory(getFetchedAt);

var initialState = {};
Object.defineProperty(initialState, 'fetchedAt', { value: {} }); // non enumerable by default

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        payload = _ref2.payload,
        meta = _ref2.meta;

    if (type === CRUD_UPDATE_OPTIMISTIC) {
        var updatedRecord = _extends({}, previousState[payload.id], payload.data);
        return addRecords([updatedRecord], previousState);
    }
    if (type === CRUD_UPDATE_MANY_OPTIMISTIC) {
        var updatedRecords = payload.ids.reduce(function (records, id) {
            return records.concat(previousState[id]);
        }, []).map(function (record) {
            return _extends({}, record, payload.data);
        });
        return addRecords(updatedRecords, previousState);
    }
    if (type === CRUD_DELETE_OPTIMISTIC) {
        var removed = previousState[payload.id],
            newState = _objectWithoutProperties(previousState, [payload.id]);

        Object.defineProperty(newState, 'fetchedAt', {
            value: previousState.fetchedAt
        });

        return newState;
    }
    if (type === CRUD_DELETE_MANY_OPTIMISTIC) {
        var _newState = Object.entries(previousState).filter(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 1),
                key = _ref4[0];

            return !payload.ids.includes(key);
        }).reduce(function (obj, _ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                key = _ref6[0],
                val = _ref6[1];

            return _extends({}, obj, _defineProperty({}, key, val));
        }, {});

        Object.defineProperty(_newState, 'fetchedAt', {
            value: previousState.fetchedAt
        });

        return _newState;
    }
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
        return previousState;
    }
    switch (meta.fetchResponse) {
        case GET_LIST:
        case GET_MANY:
        case GET_MANY_REFERENCE:
            return addRecords(payload.data, previousState);
        case GET_ONE:
        case UPDATE:
        case CREATE:
            return addRecords([payload.data], previousState);
        default:
            return previousState;
    }
});

export var getRecord = function getRecord(state, id) {
    return state[id];
};