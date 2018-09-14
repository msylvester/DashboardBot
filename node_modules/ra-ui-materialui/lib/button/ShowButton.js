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

var _shouldUpdate = require('recompose/shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _RemoveRedEye = require('@material-ui/icons/RemoveRedEye');

var _RemoveRedEye2 = _interopRequireDefault(_RemoveRedEye);

var _reactRouterDom = require('react-router-dom');

var _raCore = require('ra-core');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowButton = function ShowButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? 'ra.action.show' : _ref$label,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'label', 'record']);
    return _react2.default.createElement(
        _Button2.default,
        (0, _extends3.default)({
            component: _reactRouterDom.Link,
            to: (0, _raCore.linkToRecord)(basePath, record.id) + '/show',
            label: label
        }, rest),
        _react2.default.createElement(_RemoveRedEye2.default, null)
    );
};

ShowButton.propTypes = {
    basePath: _propTypes2.default.string,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object
};

var enhance = (0, _shouldUpdate2.default)(function (props, nextProps) {
    return props.translate !== nextProps.translate || props.record && nextProps.record && props.record.id !== nextProps.record.id || props.basePath !== nextProps.basePath || props.record == null && nextProps.record != null;
});

exports.default = enhance(ShowButton);
module.exports = exports['default'];