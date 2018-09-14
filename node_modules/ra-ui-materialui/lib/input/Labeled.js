'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Labeled = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        label: {
            position: 'relative'
        },
        value: {
            fontFamily: theme.typography.fontFamily,
            color: 'currentColor',
            padding: theme.spacing.unit + 'px 0 ' + theme.spacing.unit / 2 + 'px',
            border: 0,
            boxSizing: 'content-box',
            verticalAlign: 'middle',
            background: 'none',
            margin: 0, // Reset for Safari
            display: 'block',
            width: '100%'
        }
    };
};

/**
 * Use any component as read-only Input, labeled just like other Inputs.
 *
 * Useful to use a Field in the Edit or Create components.
 * The child component will receive the current record.
 *
 * This component name doesn't have a typo. We had to choose between
 * the American English "Labeled", and the British English "Labelled".
 * We flipped a coin.
 *
 * @example
 * <Labeled label="Comments">
 *     <FooComponent source="title" />
 * </Labeled>
 */
var Labeled = function Labeled(_ref) {
    var children = _ref.children,
        classes = _ref.classes,
        className = _ref.className,
        fullWidth = _ref.fullWidth,
        input = _ref.input,
        isRequired = _ref.isRequired,
        label = _ref.label,
        meta = _ref.meta,
        resource = _ref.resource,
        source = _ref.source,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'classes', 'className', 'fullWidth', 'input', 'isRequired', 'label', 'meta', 'resource', 'source']);

    if (!label && !source) {
        throw new Error('Cannot create label for component <' + (children && children.type && children.type.name) + '>: You must set either the label or source props. You can also disable automated label insertion by setting \'addLabel: false\' in the component default props');
    }
    var restProps = fullWidth ? (0, _extends3.default)({}, rest, { fullWidth: fullWidth }) : rest;

    return _react2.default.createElement(
        _FormControl2.default,
        {
            className: className,
            margin: 'normal',
            fullWidth: fullWidth,
            error: meta && meta.touched && meta.error
        },
        _react2.default.createElement(
            _InputLabel2.default,
            { shrink: true, className: classes.label },
            _react2.default.createElement(_raCore.FieldTitle, {
                label: label,
                source: source,
                resource: resource,
                isRequired: isRequired
            })
        ),
        _react2.default.createElement(
            'div',
            { className: classes.value },
            children && typeof children.type !== 'string' ? _react2.default.cloneElement(children, (0, _extends3.default)({
                input: input,
                resource: resource
            }, restProps)) : children
        )
    );
};

exports.Labeled = Labeled;
Labeled.propTypes = {
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    fullWidth: _propTypes2.default.bool,
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    onChange: _propTypes2.default.func,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    labelStyle: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles)(Labeled);