'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactHeadroom = require('react-headroom');

var _reactHeadroom2 = _interopRequireDefault(_reactHeadroom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyle = {
    position: 'fixed',
    zIndex: 1300
};

var HeadroomCustom = function HeadroomCustom(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        _reactHeadroom2.default,
        { style: defaultStyle },
        children
    );
};

HeadroomCustom.propTypes = {
    children: _propTypes2.default.node.isRequired
};

exports.default = HeadroomCustom;
module.exports = exports['default'];