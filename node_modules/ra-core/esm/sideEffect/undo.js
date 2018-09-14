import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(handleUndoRace),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(watchUndoable);

import { take, takeEvery, put, race } from 'redux-saga/effects';

import { showNotification } from '../actions/notificationActions';
import { UNDOABLE, UNDO, COMPLETE, startOptimisticMode, stopOptimisticMode } from '../actions/undoActions';
import { refreshView } from '../actions/uiActions';

export function handleUndoRace(undoableAction) {
    var action, _action$meta, onSuccess, onFailure, metaWithoutSideEffects, _ref, complete;

    return _regeneratorRuntime.wrap(function handleUndoRace$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    action = undoableAction.payload.action;
                    _action$meta = action.meta, onSuccess = _action$meta.onSuccess, onFailure = _action$meta.onFailure, metaWithoutSideEffects = _objectWithoutProperties(_action$meta, ['onSuccess', 'onFailure']);
                    _context.next = 4;
                    return put(startOptimisticMode());

                case 4:
                    _context.next = 6;
                    return put(_extends({}, action, {
                        type: action.type + '_OPTIMISTIC',
                        meta: _extends({}, metaWithoutSideEffects, onSuccess, {
                            optimistic: true
                        })
                    }));

                case 6:
                    _context.next = 8;
                    return race({
                        undo: take(UNDO),
                        complete: take(COMPLETE)
                    });

                case 8:
                    _ref = _context.sent;
                    complete = _ref.complete;
                    _context.next = 12;
                    return put(stopOptimisticMode());

                case 12:
                    if (!complete) {
                        _context.next = 17;
                        break;
                    }

                    _context.next = 15;
                    return put(_extends({}, action, {
                        meta: _extends({}, metaWithoutSideEffects, {
                            onSuccess: { refresh: true },
                            onFailure: _extends({}, onFailure, { refresh: true })
                        })
                    }));

                case 15:
                    _context.next = 21;
                    break;

                case 17:
                    _context.next = 19;
                    return put(showNotification('ra.notification.canceled'));

                case 19:
                    _context.next = 21;
                    return put(refreshView());

                case 21:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

export default function watchUndoable() {
    return _regeneratorRuntime.wrap(function watchUndoable$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return takeEvery(UNDOABLE, handleUndoRace);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}