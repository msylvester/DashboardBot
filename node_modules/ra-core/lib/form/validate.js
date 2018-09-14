'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.choices = exports.email = exports.regex = exports.number = exports.maxValue = exports.minValue = exports.maxLength = exports.minLength = exports.required = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
/* @link http://stackoverflow.com/questions/46155/validate-email-address-in-javascript */
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

var isEmpty = function isEmpty(value) {
    return typeof value === 'undefined' || value === null || value === '';
};

var getMessage = function getMessage(message, messageArgs, value, values, props) {
    return typeof message === 'function' ? message((0, _extends3.default)({
        args: messageArgs,
        value: value,
        values: values
    }, props)) : props.translate(message, (0, _extends3.default)({
        _: message
    }, messageArgs));
};

// If we define validation functions directly in JSX, it will
// result in a new function at every render, and then trigger infinite re-render.
// Hence, we memoize every built-in validator to prevent a "Maximum call stack" error.
var memoize = function memoize(fn) {
    return (0, _memoize2.default)(fn, function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return JSON.stringify(args);
    });
};

var required = exports.required = memoize(function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ra.validation.required';
    return Object.assign(function (value, values, props) {
        return isEmpty(value) ? getMessage(message, undefined, value, values, props) : undefined;
    }, { isRequired: true });
});

var minLength = exports.minLength = memoize(function (min) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.minLength';
    return function (value, values, props) {
        return !isEmpty(value) && value.length < min ? getMessage(message, { min: min }, value, values, props) : undefined;
    };
});

var maxLength = exports.maxLength = memoize(function (max) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.maxLength';
    return function (value, values, props) {
        return !isEmpty(value) && value.length > max ? getMessage(message, { max: max }, value, values, props) : undefined;
    };
});

var minValue = exports.minValue = memoize(function (min) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.minValue';
    return function (value, values, props) {
        return !isEmpty(value) && value < min ? getMessage(message, { min: min }, value, values, props) : undefined;
    };
});

var maxValue = exports.maxValue = memoize(function (max) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.maxValue';
    return function (value, values, props) {
        return !isEmpty(value) && value > max ? getMessage(message, { max: max }, value, values, props) : undefined;
    };
});

var number = exports.number = memoize(function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ra.validation.number';
    return function (value, values, props) {
        return !isEmpty(value) && isNaN(Number(value)) ? getMessage(message, undefined, value, values, props) : undefined;
    };
});

var regex = exports.regex = (0, _memoize2.default)(function (pattern) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.regex';
    return function (value, values, props) {
        return !isEmpty(value) && typeof value === 'string' && !pattern.test(value) ? getMessage(message, { pattern: pattern }, value, values, props) : undefined;
    };
}, function (pattern, message) {
    return pattern.toString() + message;
});

var email = exports.email = memoize(function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ra.validation.email';
    return regex(EMAIL_REGEX, message);
});

var oneOfTypeMessage = function oneOfTypeMessage(_ref, value, values, _ref2) {
    var list = _ref.list;
    var translate = _ref2.translate;

    translate('ra.validation.oneOf', {
        options: list.join(', ')
    });
};

var choices = exports.choices = memoize(function (list) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : oneOfTypeMessage;
    return function (value, values, props) {
        return !isEmpty(value) && list.indexOf(value) === -1 ? getMessage(message, { list: list }, value, values, props) : undefined;
    };
});