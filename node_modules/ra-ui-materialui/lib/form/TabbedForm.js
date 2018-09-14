'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findTabsWithErrors = exports.TabbedForm = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Tabs = require('@material-ui/core/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _CardContentInner = require('../layout/CardContentInner');

var _CardContentInner2 = _interopRequireDefault(_CardContentInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        errorTabButton: { color: theme.palette.error.main }
    };
};

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
        staticContext = _ref.staticContext,
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
        props = (0, _objectWithoutProperties3.default)(_ref, ['anyTouched', 'array', 'asyncBlurFields', 'asyncValidate', 'asyncValidating', 'autofill', 'blur', 'change', 'clearAsyncError', 'clearFields', 'clearSubmit', 'clearSubmitErrors', 'destroy', 'dirty', 'dispatch', 'form', 'handleSubmit', 'initialize', 'initialized', 'initialValues', 'pristine', 'pure', 'redirect', 'reset', 'resetSection', 'save', 'staticContext', 'submit', 'submitFailed', 'submitSucceeded', 'submitting', 'touch', 'translate', 'triggerSubmit', 'untouch', 'valid', 'validate']);
    return props;
};

var getTabFullPath = function getTabFullPath(tab, index, baseUrl) {
    return '' + baseUrl + (tab.props.path ? '/' + tab.props.path : index > 0 ? '/' + index : '');
};

var TabbedForm = exports.TabbedForm = function (_Component) {
    (0, _inherits3.default)(TabbedForm, _Component);

    function TabbedForm() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, TabbedForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = TabbedForm.__proto__ || Object.getPrototypeOf(TabbedForm)).call.apply(_ref2, [this].concat(args))), _this), _this.handleSubmitWithRedirect = function () {
            var redirect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.redirect;
            return _this.props.handleSubmit(function (values) {
                return _this.props.save(values, redirect);
            });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(TabbedForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                className = _props.className,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                invalid = _props.invalid,
                location = _props.location,
                match = _props.match,
                pristine = _props.pristine,
                record = _props.record,
                redirect = _props.redirect,
                resource = _props.resource,
                saving = _props.saving,
                submitOnEnter = _props.submitOnEnter,
                tabsWithErrors = _props.tabsWithErrors,
                toolbar = _props.toolbar,
                translate = _props.translate,
                value = _props.value,
                version = _props.version,
                rest = (0, _objectWithoutProperties3.default)(_props, ['basePath', 'children', 'className', 'classes', 'invalid', 'location', 'match', 'pristine', 'record', 'redirect', 'resource', 'saving', 'submitOnEnter', 'tabsWithErrors', 'toolbar', 'translate', 'value', 'version']);


            var validTabPaths = _react.Children.toArray(children).map(function (tab, index) {
                return getTabFullPath(tab, index, match.url);
            });

            // This ensure we don't get warnings from material-ui Tabs component when
            // the current location pathname targets a dynamically added Tab
            // In the case the targeted Tab is not present at first render (when
            // using permissions for example) we temporarily switch to the first
            // available tab. The current location will be applied again on the
            // first render containing the targeted tab. This is almost transparent
            // for the user who may just see an short tab selection animation
            var tabsValue = validTabPaths.includes(location.pathname) ? location.pathname : validTabPaths[0];

            return _react2.default.createElement(
                'form',
                (0, _extends3.default)({
                    className: (0, _classnames2.default)('tabbed-form', className),
                    key: version
                }, sanitizeRestProps(rest)),
                _react2.default.createElement(
                    _Tabs2.default
                    // The location pathname will contain the page path including the current tab path
                    // so we can use it as a way to determine the current tab
                    ,
                    { value: tabsValue,
                        indicatorColor: 'primary'
                    },
                    _react.Children.map(children, function (tab, index) {
                        if (!tab) return null;

                        // Builds the full tab tab which is the concatenation of the last matched route in the
                        // TabbedShowLayout hierarchy (ex: '/posts/create', '/posts/12', , '/posts/12/show')
                        // and the tab path.
                        // This will be used as the Tab's value
                        var tabPath = getTabFullPath(tab, index, match.url);

                        return _react2.default.cloneElement(tab, {
                            context: 'header',
                            value: tabPath,
                            className: tabsWithErrors.includes(tab.props.label) && location.pathname !== tabPath ? classes.errorTabButton : null
                        });
                    })
                ),
                _react2.default.createElement(_Divider2.default, null),
                _react2.default.createElement(
                    _CardContentInner2.default,
                    null,
                    _react.Children.map(children, function (tab, index) {
                        return tab && _react2.default.createElement(
                            _reactRouterDom.Route,
                            {
                                exact: true,
                                path: getTabFullPath(tab, index, match.url)
                            },
                            function (routeProps) {
                                return _react2.default.cloneElement(tab, {
                                    context: 'content',
                                    resource: resource,
                                    record: record,
                                    basePath: basePath,
                                    hidden: !routeProps.match,
                                    /**
                                     * Force redraw when the tab becomes active
                                     *
                                     * This is because the fields, decorated by redux-form and connect,
                                     * aren't redrawn by default when the tab becomes active.
                                     * Unfortunately, some material-ui fields (like multiline TextField)
                                     * compute their size based on the scrollHeight of a dummy DOM element,
                                     * and scrollHeight is 0 in a hidden div. So they must be redrawn
                                     * once the tab becomes active.
                                     *
                                     * @ref https://github.com/marmelab/react-admin/issues/1956
                                     */
                                    key: index + '_' + !routeProps.match
                                });
                            }
                        );
                    })
                ),
                toolbar && _react2.default.createElement(
                    _CardContentInner2.default,
                    null,
                    _react2.default.cloneElement(toolbar, {
                        basePath: basePath,
                        className: 'toolbar',
                        handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                        handleSubmit: this.props.handleSubmit,
                        invalid: invalid,
                        pristine: pristine,
                        record: record,
                        redirect: redirect,
                        resource: resource,
                        saving: saving,
                        submitOnEnter: submitOnEnter
                    }),
                    ' '
                )
            );
        }
    }]);
    return TabbedForm;
}(_react.Component);

TabbedForm.propTypes = {
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    handleSubmit: _propTypes2.default.func, // passed by redux-form
    invalid: _propTypes2.default.bool,
    location: _propTypes2.default.object,
    match: _propTypes2.default.object,
    pristine: _propTypes2.default.bool,
    record: _propTypes2.default.object,
    redirect: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.func]),
    resource: _propTypes2.default.string,
    save: _propTypes2.default.func, // the handler defined in the parent, which triggers the REST submission
    saving: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
    submitOnEnter: _propTypes2.default.bool,
    tabsWithErrors: _propTypes2.default.arrayOf(_propTypes2.default.string),
    toolbar: _propTypes2.default.element,
    translate: _propTypes2.default.func,
    validate: _propTypes2.default.func,
    value: _propTypes2.default.number,
    version: _propTypes2.default.number
};

TabbedForm.defaultProps = {
    submitOnEnter: true,
    toolbar: _react2.default.createElement(_Toolbar2.default, null)
};

var collectErrors = function collectErrors(state, props) {
    var syncErrors = (0, _reduxForm.getFormSyncErrors)(props.form)(state);
    var asyncErrors = (0, _reduxForm.getFormAsyncErrors)(props.form)(state);
    var submitErrors = (0, _reduxForm.getFormSubmitErrors)(props.form)(state);

    return (0, _extends3.default)({}, syncErrors, asyncErrors, submitErrors);
};

var findTabsWithErrors = exports.findTabsWithErrors = function findTabsWithErrors(state, props) {
    var collectErrorsImpl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : collectErrors;

    var errors = collectErrorsImpl(state, props);

    return _react.Children.toArray(props.children).reduce(function (acc, child) {
        var inputs = _react.Children.toArray(child.props.children);

        if (inputs.some(function (input) {
            return errors[input.props.source];
        })) {
            return [].concat((0, _toConsumableArray3.default)(acc), [child.props.label]);
        }

        return acc;
    }, []);
};

var enhance = (0, _compose2.default)(_reactRouterDom.withRouter, (0, _reactRedux.connect)(function (state, props) {
    var children = _react.Children.toArray(props.children).reduce(function (acc, child) {
        return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(_react.Children.toArray(child.props.children)));
    }, []);

    return {
        form: props.form || _raCore.REDUX_FORM_NAME,
        initialValues: (0, _raCore.getDefaultValues)(state, (0, _extends3.default)({}, props, { children: children })),
        saving: props.saving || state.admin.saving,
        tabsWithErrors: findTabsWithErrors(state, (0, _extends3.default)({
            form: _raCore.REDUX_FORM_NAME
        }, props))
    };
}), _raCore.translate, // Must be before reduxForm so that it can be used in validation
(0, _reduxForm.reduxForm)({
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}), (0, _styles.withStyles)(styles));

exports.default = enhance(TabbedForm);