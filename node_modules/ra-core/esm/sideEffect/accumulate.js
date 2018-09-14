import _regeneratorRuntime from 'babel-runtime/regenerator';

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(_callee);

import { delay } from 'redux-saga';
import { call, cancel, fork, put, takeEvery } from 'redux-saga/effects';

/**
 * Distinct reducer on ids
 *
 * @example
 * addIds([1, 2, 3], { payload: { ids: [3, 4] } })
 *   => [1, 2, 3, 4]
 */
var addIds = function addIds(oldIds, _ref) {
    var ids = _ref.payload.ids;

    // Using a Set ensure we only keep distinct values
    var oldIdsSet = new Set(oldIds);
    ids.forEach(function (id) {
        return oldIdsSet.add(id);
    });
    return Array.from(oldIdsSet);
};

// We need a factory for this saga in order to unit test it by providing its context (current tasks and accumulations)
export var finalizeFactory = function finalizeFactory(tasks, accumulations) {
    return (
        /**
         * Fetch the accumulated value after a delay
         *
         * As this gets canceled by subsequent calls to accumulate(), only the last
         * call to finalize() will not be canceled. The delay acts as a
         * debounce.
         *
         * @see https://redux-saga.js.org/docs/recipes/#debouncing
         */
        /*#__PURE__*/_regeneratorRuntime.mark(function finalize(key, actionCreator) {
            var accumulatedValue, action;
            return _regeneratorRuntime.wrap(function finalize$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return call(delay, 50);

                        case 2:

                            // Get the latest accumulated value for the provided key
                            accumulatedValue = accumulations[key];

                            // Remove the latest accumulated value so that they do not interfere with later calls

                            delete accumulations[key];

                            // For backward compatibility, we pass the key (which may be a resource name) as the first parameter
                            action = actionCreator(key, accumulatedValue);
                            _context.next = 7;
                            return put(action);

                        case 7:
                            delete tasks[key];

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, finalize, this);
        })
    );
};

// We need a factory for this saga in order to unit test it by providing its context (current tasks and accumulations)
export var accumulateFactory = function accumulateFactory(tasks, accumulations, finalize) {
    return (
        /**
         * Accumulate actions and eventually redispatch an action with the accumulated payload
         *
         * @example
         * accumulate({
         *    type: CRUD_GET_MANY_ACCUMULATE,
         *    payload: { ids: [1, 2, 3], resource: 'posts' },
         *    meta: { accumulate: crudGetMany }
         * });
         * accumulate({
         *    type: CRUD_GET_MANY_ACCUMULATE,
         *    payload: { ids: [4, 5], resource: 'posts' },
         *    meta: { accumulate: crudGetMany }
         * });
         *   => crudGetMany({ ids: [1, 2, 3, 4, 5], resource: 'posts' })
         *
         * @example
         * accumulate({
         *    type: CRUD_GET_MATCHING_ACCUMULATE,
         *    meta: {
         *      accumulate: crudGetMatching('posts', 'posts@comments[1].authorId', { page:1, perPage: 10 }, {field: 'id', order: 'DESC' }, {}),
         *      accumulateValues: () => true,
         *      accumulateKey: '{"resource":"authors", "pagination":{"page":1,"perPage":10},"sort":{"field":"id","order":"DESC"},"filter":{}}'
         *    }
         * });
         * accumulate({
         *    type: CRUD_GET_MATCHING_ACCUMULATE,
         *    meta: {
         *      accumulate: crudGetMatching('posts', 'posts@comments[1].authorId', { page:1, perPage: 10 }, {field: 'id', order: 'DESC' }, {}),
         *      accumulateValues: () => true,
         *      accumulateKey: '{"resource":"authors", "pagination":{"page":1,"perPage":10},"sort":{"field":"id","order":"DESC"},"filter":{}}'
         *    }
         * });
         *   => crudGetMatching('posts', 'posts@comments[1].authorId', { page:1, perPage: 10 }, {field: 'id', order: 'DESC' }, {})
         */

        /*#__PURE__*/_regeneratorRuntime.mark(function accumulate(action) {
            var key, accumulateValues;
            return _regeneratorRuntime.wrap(function accumulate$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            // For backward compatibility, if no accumulateKey is provided, we fallback to the resource
                            key = action.meta.accumulateKey || action.payload.resource;

                            if (!tasks[key]) {
                                _context2.next = 4;
                                break;
                            }

                            _context2.next = 4;
                            return cancel(tasks[key]);

                        case 4:

                            // For backward compatibility, if no accumulateValues function is provided, we fallback to the old
                            // addIds function (used by the crudGetManyAccumulate action for example)
                            accumulateValues = action.meta.accumulateValues || addIds;

                            // accumulateValues is a reducer function, it receives the previous accumulatedValues for
                            // the provided key, and must return the updated accumulatedValues

                            accumulations[key] = accumulateValues(accumulations[key], action);

                            _context2.next = 8;
                            return fork(finalize, key, action.meta.accumulate);

                        case 8:
                            tasks[key] = _context2.sent;

                        case 9:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, accumulate, this);
        })
    );
};

export default function _callee() {
    var accumulations, tasks;
    return _regeneratorRuntime.wrap(function _callee$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    /**
                     * Example
                     *
                     * const accumulations = {
                     *   posts: [4, 7, 345 ], // a CRUD_GET_MANY_ACCUMULATE action
                     *   authors: [23, 47, 78 ], // another CRUD_GET_MANY_ACCUMULATE action
                     *   '{"resource":"authors", "pagination":{"page":1,"perPage":10},"sort":{"field":"id","order":"DESC"},"filter":{}}': true, // a CRUD_GET_MATCHING_ACCUMULATE action
                     *   '{"resource":"authors", "pagination":{"page":1,"perPage":10},"sort":{"field":"id","order":"DESC"},"filter":{"hasValidEmail":true}}': true, // another CRUD_GET_MATCHING_ACCUMULATE action
                     * }
                     */
                    accumulations = {};
                    tasks = {};
                    _context3.next = 4;
                    return takeEvery(function (action) {
                        return action.meta && action.meta.accumulate;
                    }, accumulateFactory(tasks, accumulations, finalizeFactory(tasks, accumulations)));

                case 4:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked, this);
}