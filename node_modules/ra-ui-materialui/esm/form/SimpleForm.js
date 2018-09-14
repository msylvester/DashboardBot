import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { getDefaultValues, translate, REDUX_FORM_NAME } from 'ra-core';

import FormInput from './FormInput';
import Toolbar from './Toolbar';
import CardContentInner from '../layout/CardContentInner';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var anyTouched = _ref.anyTouched,
        array = _ref.array,
        asyncBlurFields = _ref.asyncBlurFields,
        asyncValidate = _ref.asyncValidate,
        asyncValidating = _ref.asyncValidating,
        autofill = _ref.autofill,
        blur = _ref.blur,
        change = _ref.change,
        clearAsyncError = _ref.clearAsyncError,
        clearFields = _ref.clearFields,
        clearSubmit = _ref.clearSubmit,
        clearSubmitErrors = _ref.clearSubmitErrors,
        destroy = _ref.destroy,
        dirty = _ref.dirty,
        dispatch = _ref.dispatch,
        form = _ref.form,
        handleSubmit = _ref.handleSubmit,
        initialize = _ref.initialize,
        initialized = _ref.initialized,
        initialValues = _ref.initialValues,
        pristine = _ref.pristine,
        pure = _ref.pure,
        redirect = _ref.redirect,
        reset = _ref.reset,
        resetSection = _ref.resetSection,
        save = _ref.save,
        submit = _ref.submit,
        submitFailed = _ref.submitFailed,
        submitSucceeded = _ref.submitSucceeded,
        submitting = _ref.submitting,
        touch = _ref.touch,
        translate = _ref.translate,
        triggerSubmit = _ref.triggerSubmit,
        untouch = _ref.untouch,
        valid = _ref.valid,
        validate = _ref.validate,
        props = _objectWithoutProperties(_ref, ['anyTouched', 'array', 'asyncBlurFields', 'asyncValidate', 'asyncValidating', 'autofill', 'blur', 'change', 'clearAsyncError', 'clearFields', 'clearSubmit', 'clearSubmitErrors', 'destroy', 'dirty', 'dispatch', 'form', 'handleSubmit', 'initialize', 'initialized', 'initialValues', 'pristine', 'pure', 'redirect', 'reset', 'resetSection', 'save', 'submit', 'submitFailed', 'submitSucceeded', 'submitting', 'touch', 'translate', 'triggerSubmit', 'untouch', 'valid', 'validate']);

    return props;
};

export var SimpleForm = function (_Component) {
    _inherits(SimpleForm, _Component);

    function SimpleForm() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, SimpleForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SimpleForm.__proto__ || Object.getPrototypeOf(SimpleForm)).call.apply(_ref2, [this].concat(args))), _this), _this.handleSubmitWithRedirect = function () {
            var redirect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.redirect;
            return _this.props.handleSubmit(function (values) {
                return _this.props.save(values, redirect);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SimpleForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                className = _props.className,
                invalid = _props.invalid,
                pristine = _props.pristine,
                record = _props.record,
                redirect = _props.redirect,
                resource = _props.resource,
                saving = _props.saving,
                submitOnEnter = _props.submitOnEnter,
                toolbar = _props.toolbar,
                version = _props.version,
                rest = _objectWithoutProperties(_props, ['basePath', 'children', 'className', 'invalid', 'pristine', 'record', 'redirect', 'resource', 'saving', 'submitOnEnter', 'toolbar', 'version']);

            return React.createElement(
                'form',
                _extends({
                    className: classnames('simple-form', className)
                }, sanitizeRestProps(rest)),
                React.createElement(
                    CardContentInner,
                    { key: version },
                    Children.map(children, function (input) {
                        return React.createElement(FormInput, {
                            basePath: basePath,
                            input: input,
                            record: record,
                            resource: resource
                        });
                    })
                ),
                toolbar && React.createElement(
                    CardContentInner,
                    null,
                    React.cloneElement(toolbar, {
                        basePath: basePath,
                        handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                        handleSubmit: this.props.handleSubmit,
                        invalid: invalid,
                        pristine: pristine,
                        record: record,
                        redirect: redirect,
                        resource: resource,
                        saving: saving,
                        submitOnEnter: submitOnEnter
                    })
                )
            );
        }
    }]);

    return SimpleForm;
}(Component);

SimpleForm.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    handleSubmit: PropTypes.func, // passed by redux-form
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    submitOnEnter: PropTypes.bool,
    toolbar: PropTypes.element,
    validate: PropTypes.func,
    version: PropTypes.number
};

SimpleForm.defaultProps = {
    submitOnEnter: true,
    toolbar: React.createElement(Toolbar, null)
};

var enhance = compose(connect(function (state, props) {
    return {
        form: props.form || REDUX_FORM_NAME,
        initialValues: getDefaultValues(state, props),
        saving: props.saving || state.admin.saving
    };
}), translate, // Must be before reduxForm so that it can be used in validation
reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}));

export default enhance(SimpleForm);