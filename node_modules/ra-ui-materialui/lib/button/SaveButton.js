'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaveButton = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _styles = require('@material-ui/core/styles');

var _Save = require('@material-ui/icons/Save');

var _Save2 = _interopRequireDefault(_Save);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    button: {
        position: 'relative'
    },
    iconPaddingStyle: {
        marginRight: '0.5em'
    }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        className = _ref.className,
        classes = _ref.classes,
        saving = _ref.saving,
        label = _ref.label,
        invalid = _ref.invalid,
        variant = _ref.variant,
        translate = _ref.translate,
        handleSubmit = _ref.handleSubmit,
        handleSubmitWithRedirect = _ref.handleSubmitWithRedirect,
        submitOnEnter = _ref.submitOnEnter,
        redirect = _ref.redirect,
        locale = _ref.locale,
        showNotification = _ref.showNotification,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'className', 'classes', 'saving', 'label', 'invalid', 'variant', 'translate', 'handleSubmit', 'handleSubmitWithRedirect', 'submitOnEnter', 'redirect', 'locale', 'showNotification']);
    return rest;
};

var SaveButton = exports.SaveButton = function (_Component) {
    (0, _inherits3.default)(SaveButton, _Component);

    function SaveButton() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SaveButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = SaveButton.__proto__ || Object.getPrototypeOf(SaveButton)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function (e) {
            var _this$props = _this.props,
                handleSubmitWithRedirect = _this$props.handleSubmitWithRedirect,
                invalid = _this$props.invalid,
                redirect = _this$props.redirect,
                saving = _this$props.saving,
                showNotification = _this$props.showNotification;


            if (saving) {
                // prevent double submission
                e.preventDefault();
            } else {
                if (invalid) {
                    showNotification('ra.message.invalid_form', 'warning');
                }
                // always submit form explicitly regardless of button type
                if (e) {
                    e.preventDefault();
                }
                handleSubmitWithRedirect(redirect)();
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(SaveButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                invalid = _props.invalid,
                _props$label = _props.label,
                label = _props$label === undefined ? 'ra.action.save' : _props$label,
                pristine = _props.pristine,
                redirect = _props.redirect,
                saving = _props.saving,
                submitOnEnter = _props.submitOnEnter,
                translate = _props.translate,
                _props$variant = _props.variant,
                variant = _props$variant === undefined ? 'raised' : _props$variant,
                rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'classes', 'invalid', 'label', 'pristine', 'redirect', 'saving', 'submitOnEnter', 'translate', 'variant']);


            var type = submitOnEnter ? 'submit' : 'button';
            return _react2.default.createElement(
                _Button2.default,
                (0, _extends3.default)({
                    className: (0, _classnames2.default)(classes.button, className),
                    variant: variant,
                    type: type,
                    onClick: this.handleClick,
                    color: saving ? 'default' : 'primary'
                }, sanitizeRestProps(rest)),
                saving && saving.redirect === redirect ? _react2.default.createElement(_CircularProgress2.default, {
                    size: 25,
                    thickness: 2,
                    className: classes.iconPaddingStyle
                }) : _react2.default.createElement(_Save2.default, { className: classes.iconPaddingStyle }),
                label && translate(label, { _: label })
            );
        }
    }]);
    return SaveButton;
}(_react.Component);

SaveButton.propTypes = {
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    handleSubmitWithRedirect: _propTypes2.default.func,
    invalid: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    pristine: _propTypes2.default.bool,
    redirect: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.func]),
    saving: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
    showNotification: _propTypes2.default.func,
    submitOnEnter: _propTypes2.default.bool,
    translate: _propTypes2.default.func.isRequired,
    variant: _propTypes2.default.oneOf(['raised', 'flat', 'fab'])
};

SaveButton.defaultProps = {
    handleSubmitWithRedirect: function handleSubmitWithRedirect() {
        return function () {};
    }
};

var enhance = (0, _compose2.default)(_raCore.translate, (0, _reactRedux.connect)(undefined, { showNotification: _raCore.showNotification }), (0, _styles.withStyles)(styles));

exports.default = enhance(SaveButton);