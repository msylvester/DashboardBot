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

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    cardActions: {
        zIndex: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        padding: 0
    }
};

var CardActions = function CardActions(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        children = _ref.children,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'children']);
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: (0, _classnames2.default)(classes.cardActions, className) }, rest),
        children
    );
};

CardActions.propTypes = {
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string
};

exports.default = (0, _styles.withStyles)(styles)(CardActions);
module.exports = exports['default'];