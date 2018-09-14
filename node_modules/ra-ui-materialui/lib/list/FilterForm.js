'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mergeInitialValuesWithDefaultValues = exports.FilterForm = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('@material-ui/core/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _withProps = require('recompose/withProps');

var _withProps2 = _interopRequireDefault(_withProps);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

var _FilterFormInput = require('./FilterFormInput');

var _FilterFormInput2 = _interopRequireDefault(_FilterFormInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        props = (0, _objectWithoutProperties3.default)(_ref2, ['anyTouched', 'asyncValidate', 'asyncValidating', 'autofill', 'blur', 'change', 'clearAsyncError', 'clearFields', 'clearSubmit', 'clearSubmitErrors', 'destroy', 'dirty', 'dispatch', 'displayedFilters', 'filterValues', 'handleSubmit', 'hideFilter', 'initialize', 'initialized', 'initialValues', 'invalid', 'pristine', 'pure', 'reset', 'resetSection', 'save', 'setFilter', 'setFilters', 'submit', 'submitFailed', 'submitSucceeded', 'submitting', 'touch', 'triggerSubmit', 'untouch', 'valid', 'validate']);
    return props;
};

var FilterForm = exports.FilterForm = function (_Component) {
    (0, _inherits3.default)(FilterForm, _Component);

    function FilterForm() {
        var _ref3;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, FilterForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref3 = FilterForm.__proto__ || Object.getPrototypeOf(FilterForm)).call.apply(_ref3, [this].concat(args))), _this), _this.handleHide = function (event) {
            return _this.props.hideFilter(event.currentTarget.dataset.key);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(FilterForm, [{
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
                rest = (0, _objectWithoutProperties3.default)(_props2, ['classes', 'className', 'resource']);


            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({
                    className: (0, _classnames2.default)(className, classes.form)
                }, sanitizeRestProps(rest)),
                this.getShownFilters().map(function (filterElement) {
                    return _react2.default.createElement(_FilterFormInput2.default, {
                        key: filterElement.props.source,
                        filterElement: filterElement,
                        handleHide: _this2.handleHide,
                        classes: classes,
                        resource: resource
                    });
                }),
                _react2.default.createElement('div', { className: classes.clearFix })
            );
        }
    }]);
    return FilterForm;
}(_react.Component);

FilterForm.propTypes = {
    resource: _propTypes2.default.string.isRequired,
    filters: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired,
    displayedFilters: _propTypes2.default.object.isRequired,
    hideFilter: _propTypes2.default.func.isRequired,
    initialValues: _propTypes2.default.object,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string
};

var mergeInitialValuesWithDefaultValues = exports.mergeInitialValuesWithDefaultValues = function mergeInitialValuesWithDefaultValues(_ref4) {
    var initialValues = _ref4.initialValues,
        filters = _ref4.filters;
    return {
        initialValues: (0, _extends3.default)({}, filters.filter(function (filterElement) {
            return filterElement.props.alwaysOn && filterElement.props.defaultValue;
        }).reduce(function (acc, filterElement) {
            return (0, _set2.default)((0, _extends3.default)({}, acc), filterElement.props.source, filterElement.props.defaultValue);
        }, {}), initialValues)
    };
};

var enhance = (0, _compose2.default)((0, _styles.withStyles)(styles), (0, _withProps2.default)(mergeInitialValuesWithDefaultValues), (0, _reduxForm.reduxForm)({
    form: 'filterForm',
    enableReinitialize: true,
    destroyOnUnmount: false, // do not destroy to preserve state across navigation
    onChange: function onChange(values, dispatch, props) {
        return props && props.setFilters(values);
    }
}));

exports.default = enhance(FilterForm);