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

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        link: {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
    };
};
/**
 * @deprecated Use react-router-dom's Link instead
 */
var Link = function Link(_ref) {
    var to = _ref.to,
        children = _ref.children,
        className = _ref.className,
        classes = _ref.classes;
    return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: to, className: (0, _classnames2.default)(classes.link, className) },
        children
    );
};
Link.propTypes = {
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    children: _propTypes2.default.node,
    to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};

exports.default = (0, _styles.withStyles)(styles)(Link);
module.exports = exports['default'];