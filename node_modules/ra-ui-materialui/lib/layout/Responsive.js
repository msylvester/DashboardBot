'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Responsive = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Responsive = function Responsive(_ref) {
    var xsmall = _ref.xsmall,
        small = _ref.small,
        medium = _ref.medium,
        large = _ref.large,
        width = _ref.width,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['xsmall', 'small', 'medium', 'large', 'width']);

    var element = void 0;
    switch (width) {
        case 'xs':
            element = typeof xsmall !== 'undefined' ? xsmall : typeof small !== 'undefined' ? small : typeof medium !== 'undefined' ? medium : large;
            break;
        case 'sm':
            element = typeof small !== 'undefined' ? small : typeof medium !== 'undefined' ? medium : large;
            break;
        case 'md':
            element = typeof medium !== 'undefined' ? medium : typeof large !== 'undefined' ? large : small;
            break;
        case 'lg':
        case 'xl':
            element = typeof large !== 'undefined' ? large : typeof medium !== 'undefined' ? medium : small;
            break;
        default:
            throw new Error('Unknown width ' + width);
    }

    return element ? _react2.default.cloneElement(element, rest) : null;
};

exports.Responsive = Responsive;
Responsive.propTypes = {
    xsmall: _propTypes2.default.element,
    small: _propTypes2.default.element,
    medium: _propTypes2.default.element,
    large: _propTypes2.default.element,
    width: _propTypes2.default.string
};

exports.default = (0, _withWidth2.default)()(Responsive);