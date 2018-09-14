'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DateField = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toLocaleStringSupportsLocales = function () {
    // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    try {
        new Date().toLocaleString('i');
    } catch (error) {
        return error instanceof RangeError;
    }
    return false;
}();

/**
 * Display a date value as a locale string.
 *
 * Uses Intl.DateTimeFormat() if available, passing the locales and options props as arguments.
 * If Intl is not available, it outputs date as is (and ignores the locales and options props).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
 * @example
 * <DateField source="published_at" />
 * // renders the record { id: 1234, published_at: new Date('2012-11-07') } as
 * <span>07/11/2012</span>
 *
 * <DateField source="published_at" className="red" />
 * // renders the record { id: 1234, new Date('2012-11-07') } as
 * <span class="red">07/11/2012</span>
 *
 * <DateField source="share" options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} />
 * // renders the record { id: 1234, new Date('2012-11-07') } as
 * <span>Wednesday, November 7, 2012</span>
 *
 * <DateField source="price" locales="fr-FR" options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} />
 * // renders the record { id: 1234, new Date('2012-11-07') } as
 * <span>mercredi 7 novembre 2012</span>
 */

var DateField = function DateField(_ref) {
    var className = _ref.className,
        locales = _ref.locales,
        options = _ref.options,
        record = _ref.record,
        _ref$showTime = _ref.showTime,
        showTime = _ref$showTime === undefined ? false : _ref$showTime,
        source = _ref.source,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'locales', 'options', 'record', 'showTime', 'source']);

    if (!record) return null;
    var value = (0, _get2.default)(record, source);
    if (value == null) return null;
    var date = value instanceof Date ? value : new Date(value);
    var dateString = showTime ? toLocaleStringSupportsLocales ? date.toLocaleString(locales, options) : date.toLocaleString() : toLocaleStringSupportsLocales ? date.toLocaleDateString(locales, options) : date.toLocaleDateString();

    return _react2.default.createElement(
        _Typography2.default,
        (0, _extends3.default)({
            component: 'span',
            body1: 'body1',
            className: className
        }, (0, _sanitizeRestProps2.default)(rest)),
        dateString
    );
};

exports.DateField = DateField;
DateField.propTypes = {
    addLabel: _propTypes2.default.bool,
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    cellClassName: _propTypes2.default.string,
    headerClassName: _propTypes2.default.string,
    label: _propTypes2.default.string,
    locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
    options: _propTypes2.default.object,
    record: _propTypes2.default.object,
    showTime: _propTypes2.default.bool,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string.isRequired
};

var PureDateField = (0, _pure2.default)(DateField);

PureDateField.defaultProps = {
    addLabel: true
};

exports.default = PureDateField;