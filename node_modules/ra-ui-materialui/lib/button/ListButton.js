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

var _List = require('@material-ui/icons/List');

var _List2 = _interopRequireDefault(_List);

var _reactRouterDom = require('react-router-dom');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListButton = function ListButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? 'ra.action.list' : _ref$label,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'label']);
    return _react2.default.createElement(
        _Button2.default,
        (0, _extends3.default)({ component: _reactRouterDom.Link, to: basePath, label: label }, rest),
        _react2.default.createElement(_List2.default, null)
    );
};

ListButton.propTypes = {
    basePath: _propTypes2.default.string,
    label: _propTypes2.default.string
};

exports.default = ListButton;
module.exports = exports['default'];