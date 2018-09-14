import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import MuiToolbar from '@material-ui/core/Toolbar';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { SaveButton, DeleteButton } from '../button';

var styles = {
    desktopToolbar: {
        justifyContent: 'space-between'
    },
    mobileToolbar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        zIndex: 2
    }
};

var valueOrDefault = function valueOrDefault(value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
};

var Toolbar = function Toolbar(_ref) {
    var basePath = _ref.basePath,
        children = _ref.children,
        classes = _ref.classes,
        className = _ref.className,
        handleSubmit = _ref.handleSubmit,
        handleSubmitWithRedirect = _ref.handleSubmitWithRedirect,
        invalid = _ref.invalid,
        pristine = _ref.pristine,
        record = _ref.record,
        redirect = _ref.redirect,
        resource = _ref.resource,
        saving = _ref.saving,
        submitOnEnter = _ref.submitOnEnter,
        width = _ref.width,
        rest = _objectWithoutProperties(_ref, ['basePath', 'children', 'classes', 'className', 'handleSubmit', 'handleSubmitWithRedirect', 'invalid', 'pristine', 'record', 'redirect', 'resource', 'saving', 'submitOnEnter', 'width']);

    return React.createElement(
        MuiToolbar,
        _extends({
            className: classnames(width === 'xs' ? classes.mobileToolbar : classes.desktopToolbar, className),
            disableGutters: true
        }, rest),
        React.createElement(
            'span',
            null,
            Children.count(children) === 0 ? React.createElement(SaveButton, {
                handleSubmitWithRedirect: handleSubmitWithRedirect,
                invalid: invalid,
                redirect: redirect,
                saving: saving,
                submitOnEnter: submitOnEnter
            }) : Children.map(children, function (button) {
                return button ? React.cloneElement(button, {
                    basePath: basePath,
                    handleSubmit: valueOrDefault(button.props.handleSubmit, handleSubmit),
                    handleSubmitWithRedirect: valueOrDefault(button.props.handleSubmitWithRedirect, handleSubmitWithRedirect),
                    invalid: invalid,
                    pristine: pristine,
                    saving: saving,
                    submitOnEnter: valueOrDefault(button.props.submitOnEnter, submitOnEnter)
                }) : null;
            })
        ),
        record && typeof record.id !== 'undefined' && React.createElement(DeleteButton, {
            basePath: basePath,
            record: record,
            resource: resource
        })
    );
};

Toolbar.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleSubmitWithRedirect: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    resource: PropTypes.string,
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    submitOnEnter: PropTypes.bool,
    width: PropTypes.string
};

Toolbar.defaultProps = {
    submitOnEnter: true
};

var enhance = compose(withWidth(), withStyles(styles));
export default enhance(Toolbar);