'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CloneButton = undefined;

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

var _Queue = require('@material-ui/icons/Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _reactRouterDom = require('react-router-dom');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var omitId = function omitId(_ref) {
    var id = _ref.id,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['id']);
    return rest;
};

var CloneButton = function CloneButton(_ref2) {
    var _ref2$basePath = _ref2.basePath,
        basePath = _ref2$basePath === undefined ? '' : _ref2$basePath,
        _ref2$label = _ref2.label,
        label = _ref2$label === undefined ? 'ra.action.clone' : _ref2$label,
        _ref2$record = _ref2.record,
        record = _ref2$record === undefined ? {} : _ref2$record,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['basePath', 'label', 'record']);
    return _react2.default.createElement(
        _Button2.default,
        (0, _extends3.default)({
            component: _reactRouterDom.Link,
            to: {
                pathname: basePath + '/create',
                state: { record: omitId(record) }
            },
            label: label
        }, rest),
        _react2.default.createElement(_Queue2.default, null)
    );
};

exports.CloneButton = CloneButton;
CloneButton.propTypes = {
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object
};

var enhance = (0, _shouldUpdate2.default)(function (props, nextProps) {
    return props.translate !== nextProps.translate || props.record && nextProps.record && props.record !== nextProps.record || props.basePath !== nextProps.basePath || props.record == null && nextProps.record != null;
});

exports.default = enhance(CloneButton);