'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BooleanInput = undefined;

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

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormGroup = require('@material-ui/core/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _raCore = require('ra-core');

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooleanInput = exports.BooleanInput = function (_Component) {
    (0, _inherits3.default)(BooleanInput, _Component);

    function BooleanInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, BooleanInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BooleanInput.__proto__ || Object.getPrototypeOf(BooleanInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event, value) {
            _this.props.input.onChange(value);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(BooleanInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                input = _props.input,
                isRequired = _props.isRequired,
                label = _props.label,
                source = _props.source,
                resource = _props.resource,
                options = _props.options,
                rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'input', 'isRequired', 'label', 'source', 'resource', 'options']);
            var value = input.value,
                inputProps = (0, _objectWithoutProperties3.default)(input, ['value']);


            return _react2.default.createElement(
                _FormGroup2.default,
                (0, _extends3.default)({ className: className }, (0, _sanitizeRestProps2.default)(rest)),
                _react2.default.createElement(_FormControlLabel2.default, {
                    control: _react2.default.createElement(_Switch2.default, (0, _extends3.default)({
                        color: 'primary',
                        checked: !!value,
                        onChange: this.handleChange
                    }, inputProps, options)),
                    label: _react2.default.createElement(_raCore.FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired
                    })
                })
            );
        }
    }]);
    return BooleanInput;
}(_react.Component);

BooleanInput.propTypes = {
    className: _propTypes2.default.string,
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    options: _propTypes2.default.object
};

BooleanInput.defaultProps = {
    options: {}
};

exports.default = (0, _raCore.addField)(BooleanInput);