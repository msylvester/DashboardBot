import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { CRUD_GET_MATCHING_SUCCESS, CRUD_GET_MATCHING_FAILURE } from '../../../actions/dataActions';

var initialState = {};

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload,
        meta = _ref.meta;

    switch (type) {
        case CRUD_GET_MATCHING_SUCCESS:
            return _extends({}, previousState, _defineProperty({}, meta.relatedTo, payload.data.map(function (record) {
                return record.id;
            })));
        case CRUD_GET_MATCHING_FAILURE:
            return _extends({}, previousState, _defineProperty({}, meta.relatedTo, { error: payload.error }));
        default:
            return previousState;
    }
});

export var getPossibleReferenceValues = function getPossibleReferenceValues(state, props) {
    return state[props.referenceSource(props.resource, props.source)];
};

export var getPossibleReferences = function getPossibleReferences(referenceState, possibleValues) {
    var selectedIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (!possibleValues) {
        return null;
    }

    if (possibleValues.error) {
        return possibleValues;
    }
    possibleValues = Array.from(possibleValues);
    selectedIds.forEach(function (id) {
        return possibleValues.some(function (value) {
            return value == id;
        }) || possibleValues.unshift(id);
    });
    return possibleValues.map(function (id) {
        return referenceState.data[id];
    }).filter(function (r) {
        return typeof r !== 'undefined';
    });
};