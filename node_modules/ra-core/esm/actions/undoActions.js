export var UNDOABLE = 'RA/UNDOABLE';
export var UNDO = 'RA/UNDO';
export var COMPLETE = 'RA/COMPLETE';
export var START_OPTIMISTIC_MODE = 'RA/START_OPTIMISTIC_MODE';
export var STOP_OPTIMISTIC_MODE = 'RA/STOP_OPTIMISTIC_MODE';

export var startUndoable = function startUndoable(action) {
    return {
        type: UNDOABLE,
        payload: { action: action }
    };
};

export var undo = function undo() {
    return {
        type: UNDO
    };
};
export var complete = function complete() {
    return {
        type: COMPLETE
    };
};

export var startOptimisticMode = function startOptimisticMode() {
    return {
        type: START_OPTIMISTIC_MODE
    };
};

export var stopOptimisticMode = function stopOptimisticMode() {
    return {
        type: STOP_OPTIMISTIC_MODE
    };
};