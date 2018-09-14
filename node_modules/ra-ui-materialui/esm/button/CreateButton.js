import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import MuiButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ContentAdd from '@material-ui/icons/Add';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { translate } from 'ra-core';

import Button from './Button';
import Responsive from '../layout/Responsive';

var styles = function styles(theme) {
    return {
        floating: {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 60,
            left: 'auto',
            position: 'fixed',
            zIndex: 1000
        },
        floatingLink: {
            color: 'inherit'
        }
    };
};

var CreateButton = function CreateButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath,
        className = _ref.className,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        translate = _ref.translate,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? 'ra.action.create' : _ref$label,
        rest = _objectWithoutProperties(_ref, ['basePath', 'className', 'classes', 'translate', 'label']);

    return React.createElement(Responsive, {
        small: React.createElement(
            MuiButton,
            _extends({
                component: Link,
                variant: 'fab',
                color: 'primary',
                className: classnames(classes.floating, className),
                to: basePath + '/create'
            }, rest),
            React.createElement(ContentAdd, null)
        ),
        medium: React.createElement(
            Button,
            _extends({
                component: Link,
                to: basePath + '/create',
                className: className,
                label: label && translate(label)
            }, rest),
            React.createElement(ContentAdd, null)
        )
    });
};

CreateButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.object,
    label: PropTypes.string,
    size: PropTypes.string,
    translate: PropTypes.func.isRequired
};

var enhance = compose(translate, onlyUpdateForKeys(['basePath', 'label']), withStyles(styles));

export default enhance(CreateButton);