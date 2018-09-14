'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Tooltip = require('@material-ui/core/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Refresh = require('@material-ui/icons/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RefreshButton = function (_Component) {
    (0, _inherits3.default)(RefreshButton, _Component);

    function RefreshButton() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RefreshButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RefreshButton.__proto__ || Object.getPrototypeOf(RefreshButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.preventDefault();
            _this.props.refreshView();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RefreshButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                label = _props.label,
                refreshView = _props.refreshView,
                translate = _props.translate,
                rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'label', 'refreshView', 'translate']);


            return _react2.default.createElement(
                _Tooltip2.default,
                { title: label && translate(label, { _: label }) },
                _react2.default.createElement(
                    _IconButton2.default,
                    (0, _extends3.default)({
                        'arial-label': label && translate(label, { _: label }),
                        className: className,
                        color: 'inherit',
                        onClick: this.handleClick
                    }, rest),
                    _react2.default.createElement(_Refresh2.default, null)
                )
            );
        }
    }]);
    return RefreshButton;
}(_react.Component);

RefreshButton.propTypes = {
    className: _propTypes2.default.string,
    label: _propTypes2.default.string,
    refreshView: _propTypes2.default.func.isRequired,
    translate: _propTypes2.default.func.isRequired
};
RefreshButton.defaultProps = {
    label: 'ra.action.refresh'
};


var enhance = (0, _compose2.default)((0, _reactRedux.connect)(null, { refreshView: _raCore.refreshView }), _raCore.translate);
exports.default = enhance(RefreshButton);
module.exports = exports['default'];