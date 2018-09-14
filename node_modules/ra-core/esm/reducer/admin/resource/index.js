import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { REGISTER_RESOURCE, UNREGISTER_RESOURCE } from '../../../actions';

import data from './data';
import list from './list';

var initialState = {};

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type === REGISTER_RESOURCE) {
        var resourceState = {
            props: action.payload,
            data: data(undefined, action),
            list: list(undefined, action)
        };
        var _newState = _extends({}, previousState, _defineProperty({}, action.payload.name, resourceState));

        return _newState;
    }

    if (action.type === UNREGISTER_RESOURCE) {
        var _newState2 = Object.keys(previousState).reduce(function (acc, key) {
            if (key === action.payload) {
                return acc;
            }

            return _extends({}, acc, _defineProperty({}, key, previousState[key]));
        }, {});
        return _newState2;
    }

    if (!action.meta || !action.meta.resource) {
        return previousState;
    }

    var resources = Object.keys(previousState);
    var newState = resources.reduce(function (acc, resource) {
        return _extends({}, acc, _defineProperty({}, resource, action.meta.resource === resource ? {
            props: previousState[resource].props,
            data: data(previousState[resource].data, action),
            list: list(previousState[resource].list, action)
        } : previousState[resource]));
    }, {});

    return newState;
});

export var getResources = function getResources(state) {
    return Object.keys(state).map(function (key) {
        return state[key].props;
    });
};

export var getReferenceResource = function getReferenceResource(state, props) {
    return state[props.reference];
};