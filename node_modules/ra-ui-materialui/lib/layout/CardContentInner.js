'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    root: {
        paddingTop: 0,
        paddingBottom: 0,
        '&:first-child': {
            paddingTop: 16
        },
        '&:last-child': {
            paddingBottom: 16
        }
    }
};

/**
 * Overrides material-ui CardContent to allow inner content
 *
 * When using several CardContent inside the same Card, the top and bottom
 * padding double the spacing between each CardContent, leading to too much
 * wasted space. Use this component as a CardContent alternative.
 */
var CardContentInner = function CardContentInner(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        children = _ref.children;
    return _react2.default.createElement(
        _CardContent2.default,
        { className: (0, _classnames2.default)(classes.root, className) },
        children
    );
};

CardContentInner.propTypes = {
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object.isRequired,
    children: _propTypes2.default.node
};

exports.default = (0, _styles.withStyles)(styles)(CardContentInner);
module.exports = exports['default'];