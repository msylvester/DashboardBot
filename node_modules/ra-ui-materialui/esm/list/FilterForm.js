import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import lodashSet from 'lodash/set';

import FilterFormInput from './FilterFormInput';

var styles = function styles(_ref) {
    var primary1Color = _ref.palette.primary1Color;
    return {
        form: {
            marginTop: '-10px',
            paddingTop: 0,
            display: 'flex',
            alignItems: 'flex-end',
            flexWrap: 'wrap'
        },
        body: { display: 'flex', alignItems: 'flex-end' },
        spacer: { width: '1em' },
        icon: { color: primary1Color || '#00bcd4', paddingBottom: 0 },
        clearFix: { clear: 'right' }
    };
};

var sanitizeRestProps = function sanitizeRestProps(_ref2) {
    var anyTouched = _ref2.anyTouched,
        asyncValidate = _ref2.asyncValidate,
        asyncValidating = _ref2.asyncValidating,
        autofill = _ref2.autofill,
        blur = _ref2.blur,
        change = _ref2.change,
        clearAsyncError = _ref2.clearAsyncError,
        clearFields = _ref2.clearFields,
        clearSubmit = _ref2.clearSubmit,
        clearSubmitErrors = _ref2.clearSubmitErrors,
        destroy = _ref2.destroy,
        dirty = _ref2.dirty,
        dispatch = _ref2.dispatch,
        displayedFilters = _ref2.displayedFilters,
        filterValues = _ref2.filterValues,
        handleSubmit = _ref2.handleSubmit,
        hideFilter = _ref2.hideFilter,
        initialize = _ref2.initialize,
        initialized = _ref2.initialized,
        initialValues = _ref2.initialValues,
        invalid = _ref2.invalid,
        pristine = _ref2.pristine,
        pure = _ref2.pure,
        reset = _ref2.reset,
        resetSection = _ref2.resetSection,
        save = _ref2.save,
        setFilter = _ref2.setFilter,
        setFilters = _ref2.setFilters,
        submit = _ref2.submit,
        submitFailed = _ref2.submitFailed,
        submitSucceeded = _ref2.submitSucceeded,
        submitting = _ref2.submitting,
        touch = _ref2.touch,
        triggerSubmit = _ref2.triggerSubmit,
        untouch = _ref2.untouch,
        valid = _ref2.valid,
        validate = _ref2.validate,
        props = _objectWithoutProperties(_ref2, ['anyTouched', 'asyncValidate', 'asyncValidating', 'autofill', 'blur', 'change', 'clearAsyncError', 'clearFields', 'clearSubmit', 'clearSubmitErrors', 'destroy', 'dirty', 'dispatch', 'displayedFilters', 'filterValues', 'handleSubmit', 'hideFilter', 'initialize', 'initialized', 'initialValues', 'invalid', 'pristine', 'pure', 'reset', 'resetSection', 'save', 'setFilter', 'setFilters', 'submit', 'submitFailed', 'submitSucceeded', 'submitting', 'touch', 'triggerSubmit', 'untouch', 'valid', 'validate']);

    return props;
};

export var FilterForm = function (_Component) {
    _inherits(FilterForm, _Component);

    function FilterForm() {
        var _ref3;

        var _temp, _this, _ret;

        _classCallCheck(this, FilterForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = FilterForm.__proto__ || Object.getPrototypeOf(FilterForm)).call.apply(_ref3, [this].concat(args))), _this), _this.handleHide = function (event) {
            return _this.props.hideFilter(event.currentTarget.dataset.key);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FilterForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.filters.forEach(function (filter) {
                if (filter.props.alwaysOn && filter.props.defaultValue) {
                    throw new Error('Cannot use alwaysOn and defaultValue on a filter input. Please set the filterDefaultValues props on the <List> element instead.');
                }
            });
        }
    }, {
        key: 'getShownFilters',
        value: function getShownFilters() {
            var _props = this.props,
                filters = _props.filters,
                displayedFilters = _props.displayedFilters,
                initialValues = _props.initialValues;


            return filters.filter(function (filterElement) {
                return filterElement.props.alwaysOn || displayedFilters[filterElement.props.source] || typeof initialValues[filterElement.props.source] !== 'undefined';
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                _props2$classes = _props2.classes,
                classes = _props2$classes === undefined ? {} : _props2$classes,
                className = _props2.className,
                resource = _props2.resource,
                rest = _objectWithoutProperties(_props2, ['classes', 'className', 'resource']);

            return React.createElement(
                'div',
                _extends({
                    className: classnames(className, classes.form)
                }, sanitizeRestProps(rest)),
                this.getShownFilters().map(function (filterElement) {
                    return React.createElement(FilterFormInput, {
                        key: filterElement.props.source,
                        filterElement: filterElement,
                        handleHide: _this2.handleHide,
                        classes: classes,
                        resource: resource
                    });
                }),
                React.createElement('div', { className: classes.clearFix })
            );
        }
    }]);

    return FilterForm;
}(Component);

FilterForm.propTypes = {
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    displayedFilters: PropTypes.object.isRequired,
    hideFilter: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    classes: PropTypes.object,
    className: PropTypes.string
};

export var mergeInitialValuesWithDefaultValues = function mergeInitialValuesWithDefaultValues(_ref4) {
    var initialValues = _ref4.initialValues,
        filters = _ref4.filters;
    return {
        initialValues: _extends({}, filters.filter(function (filterElement) {
            return filterElement.props.alwaysOn && filterElement.props.defaultValue;
        }).reduce(function (acc, filterElement) {
            return lodashSet(_extends({}, acc), filterElement.props.source, filterElement.props.defaultValue);
        }, {}), initialValues)
    };
};

var enhance = compose(withStyles(styles), withProps(mergeInitialValuesWithDefaultValues), reduxForm({
    form: 'filterForm',
    enableReinitialize: true,
    destroyOnUnmount: false, // do not destroy to preserve state across navigation
    onChange: function onChange(values, dispatch, props) {
        return props && props.setFilters(values);
    }
}));

export default enhance(FilterForm);