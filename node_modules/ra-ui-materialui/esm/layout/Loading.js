import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { translate } from 'ra-core';

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
        }
    };
};

var Loading = function Loading(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        translate = _ref.translate,
        _ref$loadingPrimary = _ref.loadingPrimary,
        loadingPrimary = _ref$loadingPrimary === undefined ? 'ra.page.loading' : _ref$loadingPrimary,
        _ref$loadingSecondary = _ref.loadingSecondary,
        loadingSecondary = _ref$loadingSecondary === undefined ? 'ra.message.loading' : _ref$loadingSecondary;
    return React.createElement(
        'div',
        { className: classnames(classes.container, className) },
        React.createElement(
            'div',
            { className: classes.message },
            React.createElement(CircularProgress, { className: classes.icon, color: 'primary' }),
            React.createElement(
                'h1',
                null,
                translate(loadingPrimary)
            ),
            React.createElement(
                'div',
                null,
                translate(loadingSecondary),
                '.'
            )
        )
    );
};

Loading.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    translate: PropTypes.func.isRequired,
    loadingPrimary: PropTypes.string,
    loadingSecondary: PropTypes.string
};

Loading.defaultProps = {
    loadingPrimary: 'ra.page.loading',
    loadingSecondary: 'ra.message.loading'
};

var enhance = compose(withStyles(styles), translate);

export default enhance(Loading);