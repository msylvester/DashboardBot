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

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _raCore = require('ra-core');

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DisabledInput = function DisabledInput(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        record = _ref.record,
        value = _ref.input.value,
        label = _ref.label,
        resource = _ref.resource,
        source = _ref.source,
        options = _ref.options,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'record', 'input', 'label', 'resource', 'source', 'options']);
    return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
        disabled: true,
        margin: 'normal',
        value: value,
        label: _react2.default.createElement(_raCore.FieldTitle, { label: label, source: source, resource: resource }),
        className: className,
        classes: classes
    }, options, (0, _sanitizeRestProps2.default)(rest)));
};

DisabledInput.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    label: _propTypes2.default.string,
    input: _propTypes2.default.object,
    options: _propTypes2.default.object,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string
};

exports.default = (0, _raCore.addField)(DisabledInput);
module.exports = exports['default'];