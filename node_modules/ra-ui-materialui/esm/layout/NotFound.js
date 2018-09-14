import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import HotTub from '@material-ui/icons/HotTub';
import History from '@material-ui/icons/History';
import compose from 'recompose/compose';
import classnames from 'classnames';

import { translate } from 'ra-core';
import Title from './Title';

var styles = function styles(theme) {
    var _container;

    return {
        container: (_container = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }, _defineProperty(_container, theme.breakpoints.up('md'), {
            height: '100%'
        }), _defineProperty(_container, theme.breakpoints.down('sm'), {
            height: '100vh',
            marginTop: '-3em'
        }), _container),
        icon: {
            width: '9em',
            height: '9em'
        },
        message: {
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            opacity: 0.5,
            margin: '0 1em'
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em'
        }
    };
};

function goBack() {
    history.go(-1);
}

var NotFound = function NotFound(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        translate = _ref.translate,
        title = _ref.title,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'translate', 'title']);

    return React.createElement(
        'div',
        _extends({ className: classnames(classes.container, className) }, rest),
        React.createElement(Title, { defaultTitle: title }),
        React.createElement(
            'div',
            { className: classes.message },
            React.createElement(HotTub, { className: classes.icon }),
            React.createElement(
                'h1',
                null,
                translate('ra.page.not_found')
            ),
            React.createElement(
                'div',
                null,
                translate('ra.message.not_found'),
                '.'
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
    );
};

NotFound.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.string,
    translate: PropTypes.func.isRequired
};

var enhance = compose(withStyles(styles), translate);

export default enhance(NotFound);