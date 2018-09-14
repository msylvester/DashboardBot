'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getReferenceResource = exports.getResources = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _actions = require('../../../actions');

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type === _actions.REGISTER_RESOURCE) {
        var resourceState = {
            props: action.payload,
            data: (0, _data2.default)(undefined, action),
            list: (0, _list2.default)(undefined, action)
        };
        var _newState = (0, _extends6.default)({}, previousState, (0, _defineProperty3.default)({}, action.payload.name, resourceState));

        return _newState;
    }

    if (action.type === _actions.UNREGISTER_RESOURCE) {
        var _newState2 = Object.keys(previousState).reduce(function (acc, key) {
            if (key === action.payload) {
                return acc;
            }

            return (0, _extends6.default)({}, acc, (0, _defineProperty3.default)({}, key, previousState[key]));
        }, {});
        return _newState2;
    }

    if (!action.meta || !action.meta.resource) {
        return previousState;
    }

    var resources = Object.keys(previousState);
    var newState = resources.reduce(function (acc, resource) {
        return (0, _extends6.default)({}, acc, (0, _defineProperty3.default)({}, resource, action.meta.resource === resource ? {
            props: previousState[resource].props,
            data: (0, _data2.default)(previousState[resource].data, action),
            list: (0, _list2.default)(previousState[resource].list, action)
        } : previousState[resource]));
    }, {});

    return newState;
};

var getResources = exports.getResources = function getResources(state) {
    return Object.keys(state).map(function (key) {
        return state[key].props;
    });
};

var getReferenceResource = exports.getReferenceResource = function getReferenceResource(state, props) {
    return state[props.reference];
};