import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import MuiButton from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { translate } from 'ra-core';

import Responsive from '../layout/Responsive';

var styles = {
    button: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    label: {
        paddingLeft: '0.5em'
    },
    labelRightIcon: {
        paddingRight: '0.5em'
    },
    smallIcon: {
        fontSize: 20
    },
    mediumIcon: {
        fontSize: 22
    },
    largeIcon: {
        fontSize: 24
    }
};

var Button = function Button(_ref) {
    var _classnames;

    var _ref$alignIcon = _ref.alignIcon,
        alignIcon = _ref$alignIcon === undefined ? 'left' : _ref$alignIcon,
        children = _ref.children,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        className = _ref.className,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? 'primary' : _ref$color,
        label = _ref.label,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 'small' : _ref$size,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['alignIcon', 'children', 'classes', 'className', 'color', 'label', 'size', 'translate']);

    return React.createElement(Responsive, {
        small: React.createElement(
            Tooltip,
            { title: label && translate(label, { _: label }) },
            React.createElement(
                IconButton,
                _extends({
                    'arial-label': label && translate(label, { _: label }),
                    className: className,
                    color: color
                }, rest),
                children
            )
        ),
        medium: React.createElement(
            MuiButton,
            _extends({
                className: classnames(classes.button, className),
                color: color,
                size: size
            }, rest),
            alignIcon === 'left' && children && React.cloneElement(children, {
                className: classes[size + 'Icon']
            }),
            React.createElement(
                'span',
                {
                    className: classnames((_classnames = {}, _defineProperty(_classnames, classes.label, alignIcon === 'left'), _defineProperty(_classnames, classes.labelRightIcon, alignIcon !== 'left'), _classnames))
                },
                label && translate(label, { _: label })
            ),
            alignIcon === 'right' && children && React.cloneElement(children, {
                className: classes[size + 'Icon']
            })
        )
    });
};

Button.propTypes = {
    alignIcon: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string,
    translate: PropTypes.func.isRequired
};

var enhance = compose(withStyles(styles), translate);

export default enhance(Button);