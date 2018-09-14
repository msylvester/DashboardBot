'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NullableBooleanInput = undefined;

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

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _styles = require('@material-ui/core/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        input: { width: theme.spacing.unit * 16 }
    };
};

var NullableBooleanInput = exports.NullableBooleanInput = function (_Component) {
    (0, _inherits3.default)(NullableBooleanInput, _Component);

    function NullableBooleanInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, NullableBooleanInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = NullableBooleanInput.__proto__ || Object.getPrototypeOf(NullableBooleanInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            value: _this.props.input.value
        }, _this.handleChange = function (event) {
            _this.props.input.onChange(_this.getBooleanFromString(event.target.value));
            _this.setState({ value: event.target.value });
        }, _this.getBooleanFromString = function (value) {
            if (value === 'true') return true;
            if (value === 'false') return false;
            return null;
        }, _this.getStringFromBoolean = function (value) {
            if (value === true) return 'true';
            if (value === false) return 'false';
            return '';
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(NullableBooleanInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.input.value !== this.props.input.value) {
                this.setState({ value: nextProps.input.value });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                className = _props.className,
                isRequired = _props.isRequired,
                label = _props.label,
                meta = _props.meta,
                options = _props.options,
                resource = _props.resource,
                source = _props.source,
                translate = _props.translate,
                rest = (0, _objectWithoutProperties3.default)(_props, ['classes', 'className', 'isRequired', 'label', 'meta', 'options', 'resource', 'source', 'translate']);
            var touched = meta.touched,
                error = meta.error;

            return _react2.default.createElement(
                _TextField2.default,
                (0, _extends3.default)({
                    select: true,
                    margin: 'normal',
                    value: this.getStringFromBoolean(this.state.value),
                    label: _react2.default.createElement(_raCore.FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired
                    }),
                    error: !!(touched && error),
                    helperText: touched && error,
                    className: (0, _classnames2.default)(classes.input, className)
                }, options, (0, _sanitizeRestProps2.default)(rest), {
                    onChange: this.handleChange
                }),
                _react2.default.createElement(_MenuItem2.default, { value: '' }),
                _react2.default.createElement(
                    _MenuItem2.default,
                    { value: 'false' },
                    translate('ra.boolean.false')
                ),
                _react2.default.createElement(
                    _MenuItem2.default,
                    { value: 'true' },
                    translate('ra.boolean.true')
                )
            );
        }
    }]);
    return NullableBooleanInput;
}(_react.Component);

NullableBooleanInput.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired
};

var enhance = (0, _compose2.default)(_raCore.addField, _raCore.translate, (0, _styles.withStyles)(styles));

exports.default = enhance(NullableBooleanInput);