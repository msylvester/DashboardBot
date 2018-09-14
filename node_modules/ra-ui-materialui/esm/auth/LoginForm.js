import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { Field, propTypes, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { translate, userLogin } from 'ra-core';

var styles = function styles() {
    return {
        form: {
            padding: '0 1em 1em 1em'
        },
        input: {
            marginTop: '1em'
        },
        button: {
            width: '100%'
        }
    };
};

// see http://redux-form.com/6.4.3/examples/material-ui/
var renderInput = function renderInput(_ref) {
    var _ref$meta = _ref.meta;
    _ref$meta = _ref$meta === undefined ? {} : _ref$meta;

    var touched = _ref$meta.touched,
        error = _ref$meta.error,
        inputProps = _objectWithoutProperties(_ref.input, []),
        props = _objectWithoutProperties(_ref, ['meta', 'input']);

    return React.createElement(TextField, _extends({
        error: !!(touched && error),
        helperText: touched && error
    }, inputProps, props, {
        fullWidth: true
    }));
};
var login = function login(auth, dispatch, _ref2) {
    var redirectTo = _ref2.redirectTo;
    return dispatch(userLogin(auth, redirectTo));
};

var LoginForm = function LoginForm(_ref3) {
    var classes = _ref3.classes,
        isLoading = _ref3.isLoading,
        handleSubmit = _ref3.handleSubmit,
        translate = _ref3.translate;
    return React.createElement(
        'form',
        { onSubmit: handleSubmit(login) },
        React.createElement(
            'div',
            { className: classes.form },
            React.createElement(
                'div',
                { className: classes.input },
                React.createElement(Field, {
                    id: 'username',
                    name: 'username',
                    component: renderInput,
                    label: translate('ra.auth.username'),
                    disabled: isLoading
                })
            ),
            React.createElement(
                'div',
                { className: classes.input },
                React.createElement(Field, {
                    id: 'password',
                    name: 'password',
                    component: renderInput,
                    label: translate('ra.auth.password'),
                    type: 'password',
                    disabled: isLoading
                })
            )
        ),
        React.createElement(
            CardActions,
            null,
            React.createElement(
                Button,
                {
                    variant: 'raised',
                    type: 'submit',
                    color: 'primary',
                    disabled: isLoading,
                    className: classes.button
                },
                isLoading && React.createElement(CircularProgress, { size: 25, thickness: 2 }),
                translate('ra.auth.sign_in')
            )
        )
    );
};
LoginForm.propTypes = _extends({}, propTypes, {
    classes: PropTypes.object,
    redirectTo: PropTypes.string
});

var mapStateToProps = function mapStateToProps(state) {
    return { isLoading: state.admin.loading > 0 };
};

var enhance = compose(withStyles(styles), translate, connect(mapStateToProps), reduxForm({
    form: 'signIn',
    validate: function validate(values, props) {
        var errors = {};
        var translate = props.translate;

        if (!values.username) errors.username = translate('ra.validation.required');
        if (!values.password) errors.password = translate('ra.validation.required');
        return errors;
    }
}));

export default enhance(LoginForm);