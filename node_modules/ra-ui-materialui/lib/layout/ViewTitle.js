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

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Responsive = require('./Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _AppBarMobile = require('./AppBarMobile');

var _AppBarMobile2 = _interopRequireDefault(_AppBarMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @deprecated
 */
var ViewTitle = function ViewTitle(_ref) {
    var className = _ref.className,
        title = _ref.title,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'title']);

    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<ViewTitle> is deprecated, please use <Title> instead');
    }
    return _react2.default.createElement(_Responsive2.default, {
        xsmall: _react2.default.createElement(
            _react.Fragment,
            null,
            _react2.default.createElement(_AppBarMobile2.default, (0, _extends3.default)({
                className: (0, _classnames2.default)('title', className),
                title: title
            }, rest)),
            _react2.default.createElement(
                'span',
                null,
                ' '
            )
        ),
        medium: _react2.default.createElement(
            _CardContent2.default,
            (0, _extends3.default)({
                className: (0, _classnames2.default)('title', className)
            }, rest),
            _react2.default.createElement(
                _Typography2.default,
                { variant: 'title' },
                title
            )
        )
    });
};

ViewTitle.propTypes = {
    className: _propTypes2.default.string,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired
};

exports.default = ViewTitle;
module.exports = exports['default'];