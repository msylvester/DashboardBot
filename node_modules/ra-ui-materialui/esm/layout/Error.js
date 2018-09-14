import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Report';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import History from '@material-ui/icons/History';

import Title from './Title';
import { translate } from 'ra-core';

var styles = function styles(theme) {
    var _container;

    return {
        container: (_container = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }, _defineProperty(_container, theme.breakpoints.down('sm'), {
            padding: '1em'
        }), _defineProperty(_container, 'fontFamily', 'Roboto, sans-serif'), _defineProperty(_container, 'opacity', 0.5), _container),
        title: {
            display: 'flex',
            alignItems: 'center'
        },
        icon: {
            width: '2em',
            height: '2em',
            marginRight: '0.5em'
        },
        panel: {
            marginTop: '1em'
        },
        panelDetails: {
            whiteSpace: 'pre-wrap'
        },
        toolbar: {
            marginTop: '2em'
        }
    };
};

function goBack() {
    history.go(-1);
}

var Error = function Error(_ref) {
    var error = _ref.error,
        errorInfo = _ref.errorInfo,
        classes = _ref.classes,
        className = _ref.className,
        title = _ref.title,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['error', 'errorInfo', 'classes', 'className', 'title', 'translate']);

    return React.createElement(
        Fragment,
        null,
        React.createElement(Title, { defaultTitle: title }),
        React.createElement(
            'div',
            _extends({ className: classnames(classes.container, className) }, rest),
            React.createElement(
                'h1',
                { className: classes.title, role: 'alert' },
                React.createElement(ErrorIcon, { className: classes.icon }),
                translate('ra.page.error')
            ),
            React.createElement(
                'div',
                null,
                translate('ra.message.error')
            ),
            process.env.NODE_ENV !== 'production' && React.createElement(
                ExpansionPanel,
                { className: classes.panel },
                React.createElement(
                    ExpansionPanelSummary,
                    { expandIcon: React.createElement(ExpandMoreIcon, null) },
                    translate('ra.message.details')
                ),
                React.createElement(
                    ExpansionPanelDetails,
                    { className: classes.panelDetails },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'h2',
                            null,
                            translate(error.toString())
                        ),
                        errorInfo.componentStack
                    )
                )
            ),
            React.createElement(
                'div',
                { className: classes.toolbar },
                React.createElement(
                    Button,
                    { variant: 'raised', icon: React.createElement(History, null), onClick: goBack },
                    translate('ra.action.back')
                )
            )
        )
    );
};

Error.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    error: PropTypes.object.isRequired,
    errorInfo: PropTypes.object,
    translate: PropTypes.func.isRequired,
    title: PropTypes.string
};

var enhance = compose(withStyles(styles), translate);

export default enhance(Error);