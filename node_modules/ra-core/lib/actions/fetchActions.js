'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FETCH_START = exports.FETCH_START = 'RA/FETCH_START';
var FETCH_END = exports.FETCH_END = 'RA/FETCH_END';
var FETCH_ERROR = exports.FETCH_ERROR = 'RA/FETCH_ERROR';
var FETCH_CANCEL = exports.FETCH_CANCEL = 'RA/FETCH_CANCEL';

var fetchStart = exports.fetchStart = function fetchStart() {
    return {
        type: FETCH_START
    };
};

var fetchEnd = exports.fetchEnd = function fetchEnd() {
    return {
        type: FETCH_END
    };
};

var fetchError = exports.fetchError = function fetchError() {
    return {
        type: FETCH_ERROR
    };
};

var fetchCancel = exports.fetchCancel = function fetchCancel() {
    return {
        type: FETCH_CANCEL
    };
};