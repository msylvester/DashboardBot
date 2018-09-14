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

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    desktopToolbar: {
        justifyContent: 'space-between'
    },
    mobileToolbar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        zIndex: 2
    }
};

var valueOrDefault = function valueOrDefault(value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
};

var Toolbar = function Toolbar(_ref) {
    var basePath = _ref.basePath,
        children = _ref.children,
        classes = _ref.classes,
        className = _ref.className,
        handleSubmit = _ref.handleSubmit,
        handleSubmitWithRedirect = _ref.handleSubmitWithRedirect,
        invalid = _ref.invalid,
        pristine = _ref.pristine,
        record = _ref.record,
        redirect = _ref.redirect,
        resource = _ref.resource,
        saving = _ref.saving,
        submitOnEnter = _ref.submitOnEnter,
        width = _ref.width,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'children', 'classes', 'className', 'handleSubmit', 'handleSubmitWithRedirect', 'invalid', 'pristine', 'record', 'redirect', 'resource', 'saving', 'submitOnEnter', 'width']);
    return _react2.default.createElement(
        _Toolbar2.default,
        (0, _extends3.default)({
            className: (0, _classnames2.default)(width === 'xs' ? classes.mobileToolbar : classes.desktopToolbar, className),
            disableGutters: true
        }, rest),
        _react2.default.createElement(
            'span',
            null,
            _react.Children.count(children) === 0 ? _react2.default.createElement(_button.SaveButton, {
                handleSubmitWithRedirect: handleSubmitWithRedirect,
                invalid: invalid,
                redirect: redirect,
                saving: saving,
                submitOnEnter: submitOnEnter
            }) : _react.Children.map(children, function (button) {
                return button ? _react2.default.cloneElement(button, {
                    basePath: basePath,
                    handleSubmit: valueOrDefault(button.props.handleSubmit, handleSubmit),
                    handleSubmitWithRedirect: valueOrDefault(button.props.handleSubmitWithRedirect, handleSubmitWithRedirect),
                    invalid: invalid,
                    pristine: pristine,
                    saving: saving,
                    submitOnEnter: valueOrDefault(button.props.submitOnEnter, submitOnEnter)
                }) : null;
            })
        ),
        record && typeof record.id !== 'undefined' && _react2.default.createElement(_button.DeleteButton, {
            basePath: basePath,
            record: record,
            resource: resource
        })
    );
};

Toolbar.propTypes = {
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    handleSubmit: _propTypes2.default.func,
    handleSubmitWithRedirect: _propTypes2.default.func,
    invalid: _propTypes2.default.bool,
    pristine: _propTypes2.default.bool,
    record: _propTypes2.default.object,
    redirect: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.func]),
    resource: _propTypes2.default.string,
    saving: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
    submitOnEnter: _propTypes2.default.bool,
    width: _propTypes2.default.string
};

Toolbar.defaultProps = {
    submitOnEnter: true
};

var enhance = (0, _compose2.default)((0, _withWidth2.default)(), (0, _styles.withStyles)(styles));
exports.default = enhance(Toolbar);
module.exports = exports['default'];