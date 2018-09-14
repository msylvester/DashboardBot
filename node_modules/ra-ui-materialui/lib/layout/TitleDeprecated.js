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

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @deprecated Use Title instead
 */
var Title = function Title(_ref) {
    var className = _ref.className,
        defaultTitle = _ref.defaultTitle,
        record = _ref.record,
        title = _ref.title,
        translate = _ref.translate,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'defaultTitle', 'record', 'title', 'translate']);

    if (!title) {
        return _react2.default.createElement(
            'span',
            (0, _extends3.default)({ className: className }, rest),
            defaultTitle
        );
    }
    if (typeof title === 'string') {
        return _react2.default.createElement(
            'span',
            (0, _extends3.default)({ className: className }, rest),
            translate(title, { _: title })
        );
    }
    return _react2.default.cloneElement(title, (0, _extends3.default)({ className: className, record: record }, rest));
};

Title.propTypes = {
    defaultTitle: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    record: _propTypes2.default.object,
    translate: _propTypes2.default.func.isRequired,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
};

exports.default = (0, _raCore.translate)(Title);
module.exports = exports['default'];