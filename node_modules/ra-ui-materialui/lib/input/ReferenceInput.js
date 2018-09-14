'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceInput = exports.ReferenceInputView = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

var _LinearProgress = require('../layout/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Labeled = require('./Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

var _ReferenceError = require('./ReferenceError');

var _ReferenceError2 = _interopRequireDefault(_ReferenceError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var allowEmpty = _ref.allowEmpty,
        basePath = _ref.basePath,
        choices = _ref.choices,
        className = _ref.className,
        component = _ref.component,
        crudGetMatching = _ref.crudGetMatching,
        crudGetOne = _ref.crudGetOne,
        defaultValue = _ref.defaultValue,
        filter = _ref.filter,
        filterToQuery = _ref.filterToQuery,
        formClassName = _ref.formClassName,
        initializeForm = _ref.initializeForm,
        input = _ref.input,
        isRequired = _ref.isRequired,
        label = _ref.label,
        locale = _ref.locale,
        meta = _ref.meta,
        onChange = _ref.onChange,
        optionValue = _ref.optionValue,
        optionText = _ref.optionText,
        perPage = _ref.perPage,
        record = _ref.record,
        reference = _ref.reference,
        referenceSource = _ref.referenceSource,
        resource = _ref.resource,
        setFilter = _ref.setFilter,
        setPagination = _ref.setPagination,
        setSort = _ref.setSort,
        sort = _ref.sort,
        source = _ref.source,
        textAlign = _ref.textAlign,
        translate = _ref.translate,
        translateChoice = _ref.translateChoice,
        validation = _ref.validation,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['allowEmpty', 'basePath', 'choices', 'className', 'component', 'crudGetMatching', 'crudGetOne', 'defaultValue', 'filter', 'filterToQuery', 'formClassName', 'initializeForm', 'input', 'isRequired', 'label', 'locale', 'meta', 'onChange', 'optionValue', 'optionText', 'perPage', 'record', 'reference', 'referenceSource', 'resource', 'setFilter', 'setPagination', 'setSort', 'sort', 'source', 'textAlign', 'translate', 'translateChoice', 'validation']);
    return rest;
};

var ReferenceInputView = function ReferenceInputView(_ref2) {
    var allowEmpty = _ref2.allowEmpty,
        basePath = _ref2.basePath,
        children = _ref2.children,
        choices = _ref2.choices,
        classes = _ref2.classes,
        className = _ref2.className,
        error = _ref2.error,
        input = _ref2.input,
        isRequired = _ref2.isRequired,
        isLoading = _ref2.isLoading,
        label = _ref2.label,
        meta = _ref2.meta,
        onChange = _ref2.onChange,
        resource = _ref2.resource,
        setFilter = _ref2.setFilter,
        setPagination = _ref2.setPagination,
        setSort = _ref2.setSort,
        source = _ref2.source,
        translate = _ref2.translate,
        warning = _ref2.warning,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['allowEmpty', 'basePath', 'children', 'choices', 'classes', 'className', 'error', 'input', 'isRequired', 'isLoading', 'label', 'meta', 'onChange', 'resource', 'setFilter', 'setPagination', 'setSort', 'source', 'translate', 'warning']);

    if (isLoading) {
        return _react2.default.createElement(
            _Labeled2.default,
            {
                label: label,
                source: source,
                resource: resource,
                className: className,
                isRequired: isRequired
            },
            _react2.default.createElement(_LinearProgress2.default, null)
        );
    }

    if (error) {
        return _react2.default.createElement(_ReferenceError2.default, { label: label, error: error });
    }

    return _react2.default.cloneElement(children, (0, _extends3.default)({
        allowEmpty: allowEmpty,
        classes: classes,
        className: className,
        input: input,
        isRequired: isRequired,
        label: label,
        resource: resource,
        meta: (0, _extends3.default)({}, meta, {
            helperText: warning || false
        }),
        source: source,
        choices: choices,
        basePath: basePath,
        onChange: onChange,
        setFilter: setFilter,
        setPagination: setPagination,
        setSort: setSort,
        translateChoice: false
    }, sanitizeRestProps(rest)));
};

exports.ReferenceInputView = ReferenceInputView;
ReferenceInputView.propTypes = {
    allowEmpty: _propTypes2.default.bool,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element,
    choices: _propTypes2.default.array,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    error: _propTypes2.default.string,
    input: _propTypes2.default.object.isRequired,
    isLoading: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    onChange: _propTypes2.default.func,
    resource: _propTypes2.default.string.isRequired,
    setFilter: _propTypes2.default.func,
    setPagination: _propTypes2.default.func,
    setSort: _propTypes2.default.func,
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    warning: _propTypes2.default.string
};

/**
 * An Input component for choosing a reference record. Useful for foreign keys.
 *
 * This component fetches the possible values in the reference resource
 * (using the `CRUD_GET_MATCHING` REST method), then delegates rendering
 * to a subcomponent, to which it passes the possible choices
 * as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<AutocompleteInput>`,
 * `<SelectInput>`, or `<RadioButtonGroupInput>`.
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <AutocompleteInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <SelectInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      perPage={100}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      sort={{ field: 'title', order: 'ASC' }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filter={{ is_published: true }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * The enclosed component may filter results. ReferenceInput passes a `setFilter`
 * function as prop to its child component. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function prop:
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filterToQuery={searchText => ({ title: searchText })}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 */
var ReferenceInput = function ReferenceInput(_ref3) {
    var children = _ref3.children,
        props = (0, _objectWithoutProperties3.default)(_ref3, ['children']);

    if (_react2.default.Children.count(children) !== 1) {
        throw new Error('<ReferenceInput> only accepts a single child');
    }

    return _react2.default.createElement(
        _raCore.ReferenceInputController,
        props,
        function (controllerProps) {
            return _react2.default.createElement(ReferenceInputView, (0, _extends3.default)({}, props, (0, _extends3.default)({ children: children }, controllerProps)));
        }
    );
};

exports.ReferenceInput = ReferenceInput;
ReferenceInput.propTypes = {
    allowEmpty: _propTypes2.default.bool.isRequired,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element.isRequired,
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    filter: _propTypes2.default.object,
    filterToQuery: _propTypes2.default.func.isRequired,
    input: _propTypes2.default.object.isRequired,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    onChange: _propTypes2.default.func,
    perPage: _propTypes2.default.number,
    record: _propTypes2.default.object,
    reference: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string.isRequired,
    sort: _propTypes2.default.shape({
        field: _propTypes2.default.string,
        order: _propTypes2.default.oneOf(['ASC', 'DESC'])
    }),
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired
};

ReferenceInput.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: function filterToQuery(searchText) {
        return { q: searchText };
    },
    perPage: 25,
    sort: { field: 'id', order: 'DESC' }
};

var EnhancedReferenceInput = (0, _compose2.default)(_raCore.addField, _raCore.translate)(ReferenceInput);

exports.default = EnhancedReferenceInput;