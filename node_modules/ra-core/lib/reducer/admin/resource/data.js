'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRecord = exports.addRecordsFactory = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _fetchActions = require('../../../actions/fetchActions');

var _dataFetchActions = require('../../../dataFetchActions');

var _dataActions = require('../../../actions/dataActions');

var _getFetchedAt = require('../../../util/getFetchedAt');

var _getFetchedAt2 = _interopRequireDefault(_getFetchedAt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
var addRecordsFactory = exports.addRecordsFactory = function addRecordsFactory(getFetchedAt) {
    return function () {
        var newRecords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var oldRecords = arguments[1];

        var newFetchedAt = getFetchedAt(newRecords.map(function (_ref) {
            var id = _ref.id;
            return id;
        }), oldRecords.fetchedAt);

        var newRecordsById = newRecords.reduce(function (acc, record) {
            return (0, _extends6.default)({}, acc, (0, _defineProperty3.default)({}, record.id, record));
        }, {});

        var records = Object.keys(newFetchedAt).reduce(function (acc, id) {
            return (0, _extends6.default)({}, acc, (0, _defineProperty3.default)({}, id, newRecordsById[id] || oldRecords[id]));
        }, {});

        Object.defineProperty(records, 'fetchedAt', {
            value: newFetchedAt
        }); // non enumerable by default

        return records;
    };
};

var addRecords = addRecordsFactory(_getFetchedAt2.default);

var initialState = {};
Object.defineProperty(initialState, 'fetchedAt', { value: {} }); // non enumerable by default

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        payload = _ref2.payload,
        meta = _ref2.meta;

    if (type === _dataActions.CRUD_UPDATE_OPTIMISTIC) {
        var updatedRecord = (0, _extends6.default)({}, previousState[payload.id], payload.data);
        return addRecords([updatedRecord], previousState);
    }
    if (type === _dataActions.CRUD_UPDATE_MANY_OPTIMISTIC) {
        var updatedRecords = payload.ids.reduce(function (records, id) {
            return records.concat(previousState[id]);
        }, []).map(function (record) {
            return (0, _extends6.default)({}, record, payload.data);
        });
        return addRecords(updatedRecords, previousState);
    }
    if (type === _dataActions.CRUD_DELETE_OPTIMISTIC) {
        var removed = previousState[payload.id],
            newState = (0, _objectWithoutProperties3.default)(previousState, [payload.id]);


        Object.defineProperty(newState, 'fetchedAt', {
            value: previousState.fetchedAt
        });

        return newState;
    }
    if (type === _dataActions.CRUD_DELETE_MANY_OPTIMISTIC) {
        var _newState = Object.entries(previousState).filter(function (_ref3) {
            var _ref4 = (0, _slicedToArray3.default)(_ref3, 1),
                key = _ref4[0];

            return !payload.ids.includes(key);
        }).reduce(function (obj, _ref5) {
            var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                key = _ref6[0],
                val = _ref6[1];

            return (0, _extends6.default)({}, obj, (0, _defineProperty3.default)({}, key, val));
        }, {});

        Object.defineProperty(_newState, 'fetchedAt', {
            value: previousState.fetchedAt
        });

        return _newState;
    }
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== _fetchActions.FETCH_END) {
        return previousState;
    }
    switch (meta.fetchResponse) {
        case _dataFetchActions.GET_LIST:
        case _dataFetchActions.GET_MANY:
        case _dataFetchActions.GET_MANY_REFERENCE:
            return addRecords(payload.data, previousState);
        case _dataFetchActions.GET_ONE:
        case _dataFetchActions.UPDATE:
        case _dataFetchActions.CREATE:
            return addRecords([payload.data], previousState);
        default:
            return previousState;
    }
};

var getRecord = exports.getRecord = function getRecord(state, id) {
    return state[id];
};