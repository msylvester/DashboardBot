import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { FieldTitle } from 'ra-core';

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
        rest = _objectWithoutProperties(_ref, ['children', 'classes', 'className', 'fullWidth', 'input', 'isRequired', 'label', 'meta', 'resource', 'source']);

    if (!label && !source) {
        throw new Error('Cannot create label for component <' + (children && children.type && children.type.name) + '>: You must set either the label or source props. You can also disable automated label insertion by setting \'addLabel: false\' in the component default props');
    }
    var restProps = fullWidth ? _extends({}, rest, { fullWidth: fullWidth }) : rest;

    return React.createElement(
        FormControl,
        {
            className: className,
            margin: 'normal',
            fullWidth: fullWidth,
            error: meta && meta.touched && meta.error
        },
        React.createElement(
            InputLabel,
            { shrink: true, className: classes.label },
            React.createElement(FieldTitle, {
                label: label,
                source: source,
                resource: resource,
                isRequired: isRequired
            })
        ),
        React.createElement(
            'div',
            { className: classes.value },
            children && typeof children.type !== 'string' ? React.cloneElement(children, _extends({
                input: input,
                resource: resource
            }, restProps)) : children
        )
    );
};

export { Labeled };
Labeled.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelStyle: PropTypes.object
};

export default withStyles(styles)(Labeled);