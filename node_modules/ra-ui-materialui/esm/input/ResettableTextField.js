import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import MuiTextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

import { translate } from 'ra-core';

var styles = {
    clearIcon: {
        height: 16,
        width: 0
    },
    visibleClearIcon: {
        width: 16
    },
    clearButton: {
        height: 24,
        width: 0
    },
    visibleClearButton: {
        width: 24
    }
};

/**
 * An override of the default Material-UI TextField which is resettable
 */

var ResettableTextField = function (_Component) {
    _inherits(ResettableTextField, _Component);

    function ResettableTextField() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ResettableTextField);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResettableTextField.__proto__ || Object.getPrototypeOf(ResettableTextField)).call.apply(_ref, [this].concat(args))), _this), _this.state = { showClear: false }, _this.handleClickClearButton = function (event) {
            event.preventDefault();
            _this.props.onChange('');
        }, _this.handleMouseDownClearButton = function (event) {
            event.preventDefault();
        }, _this.handleFocus = function (event) {
            _this.setState({ showClear: true });
            _this.props.onFocus && _this.props.onFocus(event);
        }, _this.handleBlur = function (event) {
            _this.setState({ showClear: false });
            _this.props.onBlur && _this.props.onBlur(event);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ResettableTextField, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                translate = _props.translate,
                classes = _props.classes,
                clearAlwaysVisible = _props.clearAlwaysVisible,
                InputProps = _props.InputProps,
                value = _props.value,
                resettable = _props.resettable,
                props = _objectWithoutProperties(_props, ['translate', 'classes', 'clearAlwaysVisible', 'InputProps', 'value', 'resettable']);

            var showClear = this.state.showClear;

            var clearButton = classes.clearButton,
                clearIcon = classes.clearIcon,
                visibleClearButton = classes.visibleClearButton,
                visibleClearIcon = classes.visibleClearIcon,
                restClasses = _objectWithoutProperties(classes, ['clearButton', 'clearIcon', 'visibleClearButton', 'visibleClearIcon']);

            return React.createElement(MuiTextField, _extends({
                classes: restClasses,
                value: value,
                InputProps: _extends({
                    endAdornment: resettable && value && React.createElement(
                        InputAdornment,
                        { position: 'end' },
                        React.createElement(
                            IconButton,
                            {
                                className: classNames(clearButton, _defineProperty({}, visibleClearButton, clearAlwaysVisible || showClear)),
                                'aria-label': translate('ra.action.clear_input_value'),
                                title: translate('ra.action.clear_input_value'),
                                disableRipple: true,
                                onClick: this.handleClickClearButton,
                                onMouseDown: this.handleMouseDownClearButton
                            },
                            React.createElement(ClearIcon, {
                                className: classNames(clearIcon, _defineProperty({}, visibleClearIcon, clearAlwaysVisible || showClear))
                            })
                        )
                    )
                }, InputProps)
            }, props, {
                onFocus: this.handleFocus,
                onBlur: this.handleBlur
            }));
        }
    }]);

    return ResettableTextField;
}(Component);

ResettableTextField.propTypes = {
    classes: PropTypes.object.isRequired,
    clearAlwaysVisible: PropTypes.bool,
    InputProps: PropTypes.object,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    resettable: PropTypes.bool,
    translate: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
};


export default compose(translate, withStyles(styles))(ResettableTextField);