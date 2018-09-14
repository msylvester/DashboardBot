import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import HttpError from './HttpError';
import { stringify } from 'query-string';

export var fetchJson = function fetchJson(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var requestHeaders = options.headers || new Headers({
        Accept: 'application/json'
    });
    if (!requestHeaders.has('Content-Type') && !(options && options.body && options.body instanceof FormData)) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    if (options.user && options.user.authenticated && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }

    return fetch(url, _extends({}, options, { headers: requestHeaders })).then(function (response) {
        return response.text().then(function (text) {
            return {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text
            };
        });
    }).then(function (_ref) {
        var status = _ref.status,
            statusText = _ref.statusText,
            headers = _ref.headers,
            body = _ref.body;

        var json = void 0;
        try {
            json = JSON.parse(body);
        } catch (e) {
            // not json, no big deal
        }
        if (status < 200 || status >= 300) {
            return Promise.reject(new HttpError(json && json.message || statusText, status, json));
        }
        return { status: status, headers: headers, body: body, json: json };
    });
};

export var queryParameters = stringify;

var isValidObject = function isValidObject(value) {
    if (!value) {
        return false;
    }

    var isArray = Array.isArray(value);
    var isBuffer = typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
    var isObject = Object.prototype.toString.call(value) === '[object Object]';
    var hasKeys = !!Object.keys(value).length;

    return !isArray && !isBuffer && isObject && hasKeys;
};

export var flattenObject = function flattenObject(value) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (isValidObject(value)) {
        return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.keys(value).map(function (key) {
            return flattenObject(value[key], path.concat([key]));
        }))));
    } else {
        return path.length ? _defineProperty({}, path.join('.'), value) : value;
    }
};