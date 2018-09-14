'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Header = undefined;

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

var _ViewTitle = require('./ViewTitle');

var _ViewTitle2 = _interopRequireDefault(_ViewTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    }
};

/**
 * @deprecated
 */
var Header = function Header(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        title = _ref.title,
        actions = _ref.actions,
        actionProps = _ref.actionProps,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'title', 'actions', 'actionProps']);

    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<Header> is deprecated, please use <Title> directly instead');
    }
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: (0, _classnames2.default)(classes.root, className) }, rest),
        _react2.default.createElement(_ViewTitle2.default, { title: title }),
        actions && _react2.default.cloneElement(actions, actionProps)
    );
};

exports.Header = Header;
Header.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    title: _propTypes2.default.any,
    actions: _propTypes2.default.element,
    actionProps: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles)(Header);