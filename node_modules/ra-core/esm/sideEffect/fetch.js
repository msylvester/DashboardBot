import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(handleFetch);

import { all, call, cancelled, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_CANCEL, FETCH_END, FETCH_ERROR, FETCH_START } from '../actions/fetchActions';
import { fetchActionsWithRecordResponse, fetchActionsWithArrayOfIdentifiedRecordsResponse, fetchActionsWithArrayOfRecordsResponse, fetchActionsWithTotalResponse } from '../dataFetchActions';

function validateResponseFormat(response, type) // eslint-disable-line no-console
{
    var logger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.error;

    if (!response.hasOwnProperty('data')) {
        logger('The response to \'' + type + '\' must be like { data: ... }, but the received response does not have a \'data\' key. The dataProvider is probably wrong for \'' + type + '\'.');
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithArrayOfRecordsResponse.includes(type) && !Array.isArray(response.data)) {
        logger('The response to \'' + type + '\' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for \'' + type + '\'');
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type) && Array.isArray(response.data) && response.data.length > 0 && !response.data[0].hasOwnProperty('id')) {
        logger('The response to \'' + type + '\' must be like { data : [{ id: 123, ...}, ...] }, but the received data items do not have an \'id\' key. The dataProvider is probably wrong for \'' + type + '\'');
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithRecordResponse.includes(type) && !response.data.hasOwnProperty('id')) {
        logger('The response to \'' + type + '\' must be like { data: { id: 123, ... } }, but the received data does not have an \'id\' key. The dataProvider is probably wrong for \'' + type + '\'');
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithTotalResponse.includes(type) && !response.hasOwnProperty('total')) {
        logger('The response to \'' + type + '\' must be like  { data: [...], total: 123 }, but the received response does not have a \'total\' key. The dataProvider is probably wrong for \'' + type + '\'');
        throw new Error('ra.notification.data_provider_error');
    }
}

export function handleFetch(dataProvider, action) {
    var type, payload, _action$meta, fetchMeta, onSuccess, onFailure, meta, restType, isOptimistic, response;

    return _regeneratorRuntime.wrap(function handleFetch$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    type = action.type, payload = action.payload, _action$meta = action.meta, fetchMeta = _action$meta.fetch, onSuccess = _action$meta.onSuccess, onFailure = _action$meta.onFailure, meta = _objectWithoutProperties(_action$meta, ['fetch', 'onSuccess', 'onFailure']);
                    restType = fetchMeta;
                    _context.prev = 2;
                    _context.next = 5;
                    return select(function (state) {
                        return state.admin.ui.optimistic;
                    });

                case 5:
                    isOptimistic = _context.sent;

                    if (!isOptimistic) {
                        _context.next = 8;
                        break;
                    }

                    return _context.abrupt('return');

                case 8:
                    _context.next = 10;
                    return all([put({ type: type + '_LOADING', payload: payload, meta: meta }), put({ type: FETCH_START })]);

                case 10:
                    _context.next = 12;
                    return call(dataProvider, restType, meta.resource, payload);

                case 12:
                    response = _context.sent;

                    process.env.NODE_ENV !== 'production' && validateResponseFormat(response, restType);
                    _context.next = 16;
                    return put({
                        type: type + '_SUCCESS',
                        payload: response,
                        requestPayload: payload,
                        meta: _extends({}, meta, onSuccess, {
                            fetchResponse: restType,
                            fetchStatus: FETCH_END
                        })
                    });

                case 16:
                    _context.next = 18;
                    return put({ type: FETCH_END });

                case 18:
                    _context.next = 26;
                    break;

                case 20:
                    _context.prev = 20;
                    _context.t0 = _context['catch'](2);
                    _context.next = 24;
                    return put({
                        type: type + '_FAILURE',
                        error: _context.t0.message ? _context.t0.message : _context.t0,
                        payload: _context.t0.body ? _context.t0.body : null,
                        requestPayload: payload,
                        meta: _extends({}, meta, onFailure, {
                            fetchResponse: restType,
                            fetchStatus: FETCH_ERROR
                        })
                    });

                case 24:
                    _context.next = 26;
                    return put({ type: FETCH_ERROR, error: _context.t0 });

                case 26:
                    _context.prev = 26;
                    _context.next = 29;
                    return cancelled();

                case 29:
                    if (!_context.sent) {
                        _context.next = 33;
                        break;
                    }

                    _context.next = 32;
                    return put({ type: FETCH_CANCEL });

                case 32:
                    return _context.abrupt('return');

                case 33:
                    return _context.finish(26);

                case 34:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this, [[2, 20, 26, 34]]);
}
export var takeFetchAction = function takeFetchAction(action) {
    return action.meta && action.meta.fetch;
};
var fetch = function fetch(dataProvider) {
    return (/*#__PURE__*/_regeneratorRuntime.mark(function watchFetch() {
            return _regeneratorRuntime.wrap(function watchFetch$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return takeEvery(takeFetchAction, handleFetch, dataProvider);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, watchFetch, this);
        })
    );
};

export default fetch;