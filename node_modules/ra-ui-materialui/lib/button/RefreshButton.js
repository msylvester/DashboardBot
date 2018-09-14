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

var _Refresh = require('@material-ui/icons/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

var _raCore = require('ra-core');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

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
                label = _props.label,
                refreshView = _props.refreshView,
                rest = (0, _objectWithoutProperties3.default)(_props, ['label', 'refreshView']);


            return _react2.default.createElement(
                _Button2.default,
                (0, _extends3.default)({ label: label, onClick: this.handleClick }, rest),
                _react2.default.createElement(_Refresh2.default, null)
            );
        }
    }]);
    return RefreshButton;
}(_react.Component);

RefreshButton.propTypes = {
    label: _propTypes2.default.string,
    refreshView: _propTypes2.default.func.isRequired
};
RefreshButton.defaultProps = {
    label: 'ra.action.refresh'
};


var enhance = (0, _reactRedux.connect)(null, { refreshView: _raCore.refreshView });

exports.default = enhance(RefreshButton);
module.exports = exports['default'];