'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _CardActions = require('@material-ui/core/CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        inputProps = (0, _objectWithoutProperties3.default)(_ref.input, []),
        props = (0, _objectWithoutProperties3.default)(_ref, ['meta', 'input']);
    return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
        error: !!(touched && error),
        helperText: touched && error
    }, inputProps, props, {
        fullWidth: true
    }));
};
var login = function login(auth, dispatch, _ref2) {
    var redirectTo = _ref2.redirectTo;
    return dispatch((0, _raCore.userLogin)(auth, redirectTo));
};

var LoginForm = function LoginForm(_ref3) {
    var classes = _ref3.classes,
        isLoading = _ref3.isLoading,
        handleSubmit = _ref3.handleSubmit,
        translate = _ref3.translate;
    return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit(login) },
        _react2.default.createElement(
            'div',
            { className: classes.form },
            _react2.default.createElement(
                'div',
                { className: classes.input },
                _react2.default.createElement(_reduxForm.Field, {
                    id: 'username',
                    name: 'username',
                    component: renderInput,
                    label: translate('ra.auth.username'),
                    disabled: isLoading
                })
            ),
            _react2.default.createElement(
                'div',
                { className: classes.input },
                _react2.default.createElement(_reduxForm.Field, {
                    id: 'password',
                    name: 'password',
                    component: renderInput,
                    label: translate('ra.auth.password'),
                    type: 'password',
                    disabled: isLoading
                })
            )
        ),
        _react2.default.createElement(
            _CardActions2.default,
            null,
            _react2.default.createElement(
                _Button2.default,
                {
                    variant: 'raised',
                    type: 'submit',
                    color: 'primary',
                    disabled: isLoading,
                    className: classes.button
                },
                isLoading && _react2.default.createElement(_CircularProgress2.default, { size: 25, thickness: 2 }),
                translate('ra.auth.sign_in')
            )
        )
    );
};
LoginForm.propTypes = (0, _extends3.default)({}, _reduxForm.propTypes, {
    classes: _propTypes2.default.object,
    redirectTo: _propTypes2.default.string
});

var mapStateToProps = function mapStateToProps(state) {
    return { isLoading: state.admin.loading > 0 };
};

var enhance = (0, _compose2.default)((0, _styles.withStyles)(styles), _raCore.translate, (0, _reactRedux.connect)(mapStateToProps), (0, _reduxForm.reduxForm)({
    form: 'signIn',
    validate: function validate(values, props) {
        var errors = {};
        var translate = props.translate;

        if (!values.username) errors.username = translate('ra.validation.required');
        if (!values.password) errors.password = translate('ra.validation.required');
        return errors;
    }
}));

exports.default = enhance(LoginForm);
module.exports = exports['default'];