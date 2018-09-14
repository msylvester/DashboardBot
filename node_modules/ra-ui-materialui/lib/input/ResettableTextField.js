'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _styles = require('@material-ui/core/styles');

var _Clear = require('@material-ui/icons/Clear');

var _Clear2 = _interopRequireDefault(_Clear);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(ResettableTextField, _Component);

    function ResettableTextField() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ResettableTextField);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ResettableTextField.__proto__ || Object.getPrototypeOf(ResettableTextField)).call.apply(_ref, [this].concat(args))), _this), _this.state = { showClear: false }, _this.handleClickClearButton = function (event) {
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
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ResettableTextField, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                translate = _props.translate,
                classes = _props.classes,
                clearAlwaysVisible = _props.clearAlwaysVisible,
                InputProps = _props.InputProps,
                value = _props.value,
                resettable = _props.resettable,
                props = (0, _objectWithoutProperties3.default)(_props, ['translate', 'classes', 'clearAlwaysVisible', 'InputProps', 'value', 'resettable']);
            var showClear = this.state.showClear;
            var clearButton = classes.clearButton,
                clearIcon = classes.clearIcon,
                visibleClearButton = classes.visibleClearButton,
                visibleClearIcon = classes.visibleClearIcon,
                restClasses = (0, _objectWithoutProperties3.default)(classes, ['clearButton', 'clearIcon', 'visibleClearButton', 'visibleClearIcon']);


            return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
                classes: restClasses,
                value: value,
                InputProps: (0, _extends3.default)({
                    endAdornment: resettable && value && _react2.default.createElement(
                        _InputAdornment2.default,
                        { position: 'end' },
                        _react2.default.createElement(
                            _IconButton2.default,
                            {
                                className: (0, _classnames2.default)(clearButton, (0, _defineProperty3.default)({}, visibleClearButton, clearAlwaysVisible || showClear)),
                                'aria-label': translate('ra.action.clear_input_value'),
                                title: translate('ra.action.clear_input_value'),
                                disableRipple: true,
                                onClick: this.handleClickClearButton,
                                onMouseDown: this.handleMouseDownClearButton
                            },
                            _react2.default.createElement(_Clear2.default, {
                                className: (0, _classnames2.default)(clearIcon, (0, _defineProperty3.default)({}, visibleClearIcon, clearAlwaysVisible || showClear))
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
}(_react.Component);

ResettableTextField.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    clearAlwaysVisible: _propTypes2.default.bool,
    InputProps: _propTypes2.default.object,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func.isRequired,
    onFocus: _propTypes2.default.func,
    resettable: _propTypes2.default.bool,
    translate: _propTypes2.default.func.isRequired,
    value: _propTypes2.default.any.isRequired
};
exports.default = (0, _compose2.default)(_raCore.translate, (0, _styles.withStyles)(styles))(ResettableTextField);
module.exports = exports['default'];