'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @example
 * <FunctionField source="last_name" label="Name" render={record => `${record.first_name} ${record.last_name}`} />
 */
var FunctionField = function FunctionField(_ref) {
    var className = _ref.className,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        source = _ref.source,
        render = _ref.render,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'record', 'source', 'render']);
    return record ? _react2.default.createElement(
        _Typography2.default,
        (0, _extends3.default)({
            component: 'span',
            body1: 'body1',
            className: className
        }, (0, _sanitizeRestProps2.default)(rest)),
        render(record, source)
    ) : null;
};

FunctionField.propTypes = {
    addLabel: _propTypes2.default.bool,
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    cellClassName: _propTypes2.default.string,
    headerClassName: _propTypes2.default.string,
    label: _propTypes2.default.string,
    render: _propTypes2.default.func.isRequired,
    record: _propTypes2.default.object,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string
};

var PureFunctionField = (0, _pure2.default)(FunctionField);

PureFunctionField.defaultProps = {
    addLabel: true
};

exports.default = PureFunctionField;
module.exports = exports['default'];