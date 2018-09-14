export var FETCH_START = 'RA/FETCH_START';
export var FETCH_END = 'RA/FETCH_END';
export var FETCH_ERROR = 'RA/FETCH_ERROR';
export var FETCH_CANCEL = 'RA/FETCH_CANCEL';

export var fetchStart = function fetchStart() {
    return {
        type: FETCH_START
    };
};

export var fetchEnd = function fetchEnd() {
    return {
        type: FETCH_END
    };
};

export var fetchError = function fetchError() {
    return {
        type: FETCH_ERROR
    };
};

export var fetchCancel = function fetchCancel() {
    return {
        type: FETCH_CANCEL
    };
};