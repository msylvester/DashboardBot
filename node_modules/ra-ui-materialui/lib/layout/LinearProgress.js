'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LinearProgress = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LinearProgress = require('@material-ui/core/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        root: {
            margin: theme.spacing.unit + 'px 0',
            width: theme.spacing.unit * 20 + 'px'
        }
    };
};

/**
 * Progress bar formatted to replace an input or a field in a form layout
 *
 * Avoids visual jumps when replaced by value or form input
 *
 * @see ReferenceField
 * @see ReferenceInput
 *
 * @param {object} classes CSS class names injected by withStyles
 */
var LinearProgress = function LinearProgress(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className']);
    return _react2.default.createElement(_LinearProgress2.default, (0, _extends3.default)({ className: (0, _classnames2.default)(classes.root, className) }, rest));
};
exports.LinearProgress = LinearProgress;
LinearProgress.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string
};

exports.default = (0, _styles.withStyles)(styles)(LinearProgress);