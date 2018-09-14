import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import ContentSave from '@material-ui/icons/Save';
import classnames from 'classnames';
import { showNotification, translate } from 'ra-core';

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
        rest = _objectWithoutProperties(_ref, ['basePath', 'className', 'classes', 'saving', 'label', 'invalid', 'variant', 'translate', 'handleSubmit', 'handleSubmitWithRedirect', 'submitOnEnter', 'redirect', 'locale', 'showNotification']);

    return rest;
};

export var SaveButton = function (_Component) {
    _inherits(SaveButton, _Component);

    function SaveButton() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, SaveButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SaveButton.__proto__ || Object.getPrototypeOf(SaveButton)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function (e) {
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SaveButton, [{
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
                rest = _objectWithoutProperties(_props, ['className', 'classes', 'invalid', 'label', 'pristine', 'redirect', 'saving', 'submitOnEnter', 'translate', 'variant']);

            var type = submitOnEnter ? 'submit' : 'button';
            return React.createElement(
                Button,
                _extends({
                    className: classnames(classes.button, className),
                    variant: variant,
                    type: type,
                    onClick: this.handleClick,
                    color: saving ? 'default' : 'primary'
                }, sanitizeRestProps(rest)),
                saving && saving.redirect === redirect ? React.createElement(CircularProgress, {
                    size: 25,
                    thickness: 2,
                    className: classes.iconPaddingStyle
                }) : React.createElement(ContentSave, { className: classes.iconPaddingStyle }),
                label && translate(label, { _: label })
            );
        }
    }]);

    return SaveButton;
}(Component);

SaveButton.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    handleSubmitWithRedirect: PropTypes.func,
    invalid: PropTypes.bool,
    label: PropTypes.string,
    pristine: PropTypes.bool,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    showNotification: PropTypes.func,
    submitOnEnter: PropTypes.bool,
    translate: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['raised', 'flat', 'fab'])
};

SaveButton.defaultProps = {
    handleSubmitWithRedirect: function handleSubmitWithRedirect() {
        return function () {};
    }
};

var enhance = compose(translate, connect(undefined, { showNotification: showNotification }), withStyles(styles));

export default enhance(SaveButton);