'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceArrayInput = exports.ReferenceArrayInputView = undefined;

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

var _Labeled = require('../input/Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

var _ReferenceError = require('./ReferenceError');

var _ReferenceError2 = _interopRequireDefault(_ReferenceError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var alwaysOn = _ref.alwaysOn,
        basePath = _ref.basePath,
        component = _ref.component,
        crudGetMany = _ref.crudGetMany,
        crudGetMatching = _ref.crudGetMatching,
        defaultValue = _ref.defaultValue,
        filterToQuery = _ref.filterToQuery,
        formClassName = _ref.formClassName,
        initializeForm = _ref.initializeForm,
        input = _ref.input,
        isRequired = _ref.isRequired,
        label = _ref.label,
        locale = _ref.locale,
        meta = _ref.meta,
        optionText = _ref.optionText,
        optionValue = _ref.optionValue,
        perPage = _ref.perPage,
        record = _ref.record,
        referenceSource = _ref.referenceSource,
        resource = _ref.resource,
        allowEmpty = _ref.allowEmpty,
        source = _ref.source,
        textAlign = _ref.textAlign,
        translate = _ref.translate,
        translateChoice = _ref.translateChoice,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['alwaysOn', 'basePath', 'component', 'crudGetMany', 'crudGetMatching', 'defaultValue', 'filterToQuery', 'formClassName', 'initializeForm', 'input', 'isRequired', 'label', 'locale', 'meta', 'optionText', 'optionValue', 'perPage', 'record', 'referenceSource', 'resource', 'allowEmpty', 'source', 'textAlign', 'translate', 'translateChoice']);
    return rest;
};

var ReferenceArrayInputView = function ReferenceArrayInputView(_ref2) {
    var allowEmpty = _ref2.allowEmpty,
        basePath = _ref2.basePath,
        children = _ref2.children,
        choices = _ref2.choices,
        className = _ref2.className,
        error = _ref2.error,
        input = _ref2.input,
        isLoading = _ref2.isLoading,
        isRequired = _ref2.isRequired,
        label = _ref2.label,
        meta = _ref2.meta,
        onChange = _ref2.onChange,
        options = _ref2.options,
        resource = _ref2.resource,
        setFilter = _ref2.setFilter,
        setPagination = _ref2.setPagination,
        setSort = _ref2.setSort,
        source = _ref2.source,
        translate = _ref2.translate,
        warning = _ref2.warning,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['allowEmpty', 'basePath', 'children', 'choices', 'className', 'error', 'input', 'isLoading', 'isRequired', 'label', 'meta', 'onChange', 'options', 'resource', 'setFilter', 'setPagination', 'setSort', 'source', 'translate', 'warning']);

    var translatedLabel = translate(label || 'resources.' + resource + '.fields.' + source, { _: label });

    if (isLoading) {
        return _react2.default.createElement(
            _Labeled2.default,
            {
                label: translatedLabel,
                source: source,
                resource: resource,
                className: className,
                isRequired: isRequired
            },
            _react2.default.createElement(_LinearProgress2.default, null)
        );
    }

    if (error) {
        return _react2.default.createElement(_ReferenceError2.default, { label: translatedLabel, error: error });
    }

    return _react2.default.cloneElement(children, (0, _extends3.default)({
        allowEmpty: allowEmpty,
        basePath: basePath,
        choices: choices,
        className: className,
        error: error,
        input: input,
        isRequired: isRequired,
        label: translatedLabel,
        meta: (0, _extends3.default)({}, meta, {
            helperText: warning || false
        }),
        onChange: onChange,
        options: options,
        resource: resource,
        setFilter: setFilter,
        setPagination: setPagination,
        setSort: setSort,
        source: source,
        translateChoice: false,
        limitChoicesToValue: true
    }, sanitizeRestProps(rest)));
};

exports.ReferenceArrayInputView = ReferenceArrayInputView;
ReferenceArrayInputView.propTypes = {
    allowEmpty: _propTypes2.default.bool,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element,
    choices: _propTypes2.default.array,
    className: _propTypes2.default.string,
    error: _propTypes2.default.string,
    isLoading: _propTypes2.default.bool,
    input: _propTypes2.default.object.isRequired,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    onChange: _propTypes2.default.func,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string.isRequired,
    setFilter: _propTypes2.default.func,
    setPagination: _propTypes2.default.func,
    setSort: _propTypes2.default.func,
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    warning: _propTypes2.default.string
};

/**
 * An Input component for fields containing a list of references to another resource.
 * Useful for 'hasMany' relationship.
 *
 * @example
 * The post object has many tags, so the post resource looks like:
 * {
 *    id: 1234,
 *    tag_ids: [ "1", "23", "4" ]
 * }
 *
 * ReferenceArrayInput component fetches the current resources (using the
 * `CRUD_GET_MANY` REST method) as well as possible resources (using the
 * `CRUD_GET_MATCHING` REST method) in the reference endpoint. It then
 * delegates rendering to a subcomponent, to which it passes the possible
 * choices as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<SelectArrayInput>`
 * or <CheckboxGroupInput>.
 *
 * @example
 * export const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceArrayInput source="tag_ids" reference="tags">
 *                 <SelectArrayInput optionText="name" />
 *             </ReferenceArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      perPage={100}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      sort={{ field: 'name', order: 'ASC' }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filter={{ is_public: true }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * The enclosed component may filter results. ReferenceArrayInput passes a
 * `setFilter` function as prop to its child component. It uses the value to
 * create a filter for the query - by default { q: [searchText] }. You can
 * customize the mapping searchText => searchQuery by setting a custom
 * `filterToQuery` function prop:
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filterToQuery={searchText => ({ name: searchText })}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 */
var ReferenceArrayInput = function ReferenceArrayInput(_ref3) {
    var children = _ref3.children,
        props = (0, _objectWithoutProperties3.default)(_ref3, ['children']);

    if (_react2.default.Children.count(children) !== 1) {
        throw new Error('<ReferenceArrayInput> only accepts a single child (like <Datagrid>)');
    }

    return _react2.default.createElement(
        _raCore.ReferenceArrayInputController,
        props,
        function (controllerProps) {
            return _react2.default.createElement(ReferenceArrayInputView, (0, _extends3.default)({}, props, (0, _extends3.default)({ children: children }, controllerProps)));
        }
    );
};

exports.ReferenceArrayInput = ReferenceArrayInput;
ReferenceArrayInput.propTypes = {
    allowEmpty: _propTypes2.default.bool.isRequired,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element.isRequired,
    className: _propTypes2.default.string,
    filter: _propTypes2.default.object,
    filterToQuery: _propTypes2.default.func.isRequired,
    input: _propTypes2.default.object.isRequired,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    perPage: _propTypes2.default.number,
    reference: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string.isRequired,
    sort: _propTypes2.default.shape({
        field: _propTypes2.default.string,
        order: _propTypes2.default.oneOf(['ASC', 'DESC'])
    }),
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired
};

ReferenceArrayInput.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: function filterToQuery(searchText) {
        return { q: searchText };
    },
    perPage: 25,
    sort: { field: 'id', order: 'DESC' }
};

var EnhancedReferenceArrayInput = (0, _compose2.default)(_raCore.addField, _raCore.translate)(ReferenceArrayInput);

exports.default = EnhancedReferenceArrayInput;