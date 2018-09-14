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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Title = function Title(_ref) {
    var className = _ref.className,
        defaultTitle = _ref.defaultTitle,
        record = _ref.record,
        title = _ref.title,
        translate = _ref.translate,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'defaultTitle', 'record', 'title', 'translate']);

    var container = document.getElementById('react-admin-title');
    if (!container) return null;
    if (!defaultTitle && !title && process.env.NODE_ENV !== 'production') {
        console.warn('Missing title prop in <Title> element'); //eslint-disable-line no-console
    }
    var titleElement = !title ? _react2.default.createElement(
        'span',
        (0, _extends3.default)({ className: className }, rest),
        defaultTitle
    ) : typeof title === 'string' ? _react2.default.createElement(
        'span',
        (0, _extends3.default)({ className: className }, rest),
        translate(title, { _: title })
    ) : _react2.default.cloneElement(title, (0, _extends3.default)({ className: className, record: record }, rest));
    return _reactDom2.default.createPortal(titleElement, container);
};

Title.propTypes = {
    defaultTitle: _propTypes2.default.string,
    className: _propTypes2.default.string,
    record: _propTypes2.default.object,
    translate: _propTypes2.default.func.isRequired,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
};

exports.default = (0, _raCore.translate)(Title);
module.exports = exports['default'];