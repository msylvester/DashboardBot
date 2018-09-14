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

var _Dashboard = require('@material-ui/icons/Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _raCore = require('ra-core');

var _MenuItemLink = require('./MenuItemLink');

var _MenuItemLink2 = _interopRequireDefault(_MenuItemLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DashboardMenuItem = function DashboardMenuItem(_ref) {
    var className = _ref.className,
        onClick = _ref.onClick,
        translate = _ref.translate,
        props = (0, _objectWithoutProperties3.default)(_ref, ['className', 'onClick', 'translate']);
    return _react2.default.createElement(_MenuItemLink2.default, (0, _extends3.default)({
        onClick: onClick,
        to: '/',
        primaryText: translate('ra.page.dashboard'),
        leftIcon: _react2.default.createElement(_Dashboard2.default, null),
        exact: true
    }, props));
};

DashboardMenuItem.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    translate: _propTypes2.default.func.isRequired
};

exports.default = (0, _raCore.translate)(DashboardMenuItem);
module.exports = exports['default'];