'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BooleanField = undefined;

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

var _Clear = require('@material-ui/icons/Clear');

var _Clear2 = _interopRequireDefault(_Clear);

var _Done = require('@material-ui/icons/Done');

var _Done2 = _interopRequireDefault(_Done);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooleanField = function BooleanField(_ref) {
    var className = _ref.className,
        source = _ref.source,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'source', 'record']);

    if ((0, _get2.default)(record, source) === false) {
        return _react2.default.createElement(
            _Typography2.default,
            (0, _extends3.default)({
                component: 'span',
                body1: 'body1',
                className: className
            }, (0, _sanitizeRestProps2.default)(rest)),
            _react2.default.createElement(_Clear2.default, null)
        );
    }

    if ((0, _get2.default)(record, source) === true) {
        return _react2.default.createElement(
            _Typography2.default,
            (0, _extends3.default)({
                component: 'span',
                body1: 'body1',
                className: className
            }, (0, _sanitizeRestProps2.default)(rest)),
            _react2.default.createElement(_Done2.default, null)
        );
    }

    return _react2.default.createElement(_Typography2.default, (0, _extends3.default)({
        component: 'span',
        body1: 'body1',
        className: className
    }, (0, _sanitizeRestProps2.default)(rest)));
};

exports.BooleanField = BooleanField;
BooleanField.propTypes = {
    addLabel: _propTypes2.default.bool,
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    cellClassName: _propTypes2.default.string,
    headerClassName: _propTypes2.default.string,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string.isRequired
};

var PureBooleanField = (0, _pure2.default)(BooleanField);

PureBooleanField.defaultProps = {
    addLabel: true
};

exports.default = PureBooleanField;