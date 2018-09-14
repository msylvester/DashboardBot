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

var _onlyUpdateForKeys = require('recompose/onlyUpdateForKeys');

var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('@material-ui/core/styles');

var _Add = require('@material-ui/icons/Add');

var _Add2 = _interopRequireDefault(_Add);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouterDom = require('react-router-dom');

var _raCore = require('ra-core');

var _Button3 = require('./Button');

var _Button4 = _interopRequireDefault(_Button3);

var _Responsive = require('../layout/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        floating: {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 60,
            left: 'auto',
            position: 'fixed',
            zIndex: 1000
        },
        floatingLink: {
            color: 'inherit'
        }
    };
};

var CreateButton = function CreateButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath,
        className = _ref.className,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        translate = _ref.translate,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? 'ra.action.create' : _ref$label,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'className', 'classes', 'translate', 'label']);
    return _react2.default.createElement(_Responsive2.default, {
        small: _react2.default.createElement(
            _Button2.default,
            (0, _extends3.default)({
                component: _reactRouterDom.Link,
                variant: 'fab',
                color: 'primary',
                className: (0, _classnames2.default)(classes.floating, className),
                to: basePath + '/create'
            }, rest),
            _react2.default.createElement(_Add2.default, null)
        ),
        medium: _react2.default.createElement(
            _Button4.default,
            (0, _extends3.default)({
                component: _reactRouterDom.Link,
                to: basePath + '/create',
                className: className,
                label: label && translate(label)
            }, rest),
            _react2.default.createElement(_Add2.default, null)
        )
    });
};

CreateButton.propTypes = {
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    label: _propTypes2.default.string,
    size: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired
};

var enhance = (0, _compose2.default)(_raCore.translate, (0, _onlyUpdateForKeys2.default)(['basePath', 'label']), (0, _styles.withStyles)(styles));

exports.default = enhance(CreateButton);
module.exports = exports['default'];