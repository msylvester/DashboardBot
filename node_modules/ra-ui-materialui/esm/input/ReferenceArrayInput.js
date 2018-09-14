import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { addField, translate, ReferenceArrayInputController } from 'ra-core';

import LinearProgress from '../layout/LinearProgress';
import Labeled from '../input/Labeled';
import ReferenceError from './ReferenceError';

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
        rest = _objectWithoutProperties(_ref, ['alwaysOn', 'basePath', 'component', 'crudGetMany', 'crudGetMatching', 'defaultValue', 'filterToQuery', 'formClassName', 'initializeForm', 'input', 'isRequired', 'label', 'locale', 'meta', 'optionText', 'optionValue', 'perPage', 'record', 'referenceSource', 'resource', 'allowEmpty', 'source', 'textAlign', 'translate', 'translateChoice']);

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
        rest = _objectWithoutProperties(_ref2, ['allowEmpty', 'basePath', 'children', 'choices', 'className', 'error', 'input', 'isLoading', 'isRequired', 'label', 'meta', 'onChange', 'options', 'resource', 'setFilter', 'setPagination', 'setSort', 'source', 'translate', 'warning']);

    var translatedLabel = translate(label || 'resources.' + resource + '.fields.' + source, { _: label });

    if (isLoading) {
        return React.createElement(
            Labeled,
            {
                label: translatedLabel,
                source: source,
                resource: resource,
                className: className,
                isRequired: isRequired
            },
            React.createElement(LinearProgress, null)
        );
    }

    if (error) {
        return React.createElement(ReferenceError, { label: translatedLabel, error: error });
    }

    return React.cloneElement(children, _extends({
        allowEmpty: allowEmpty,
        basePath: basePath,
        choices: choices,
        className: className,
        error: error,
        input: input,
        isRequired: isRequired,
        label: translatedLabel,
        meta: _extends({}, meta, {
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

export { ReferenceArrayInputView };
ReferenceArrayInputView.propTypes = {
    allowEmpty: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element,
    choices: PropTypes.array,
    className: PropTypes.string,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    options: PropTypes.object,
    resource: PropTypes.string.isRequired,
    setFilter: PropTypes.func,
    setPagination: PropTypes.func,
    setSort: PropTypes.func,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
    warning: PropTypes.string
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
        props = _objectWithoutProperties(_ref3, ['children']);

    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceArrayInput> only accepts a single child (like <Datagrid>)');
    }

    return React.createElement(
        ReferenceArrayInputController,
        props,
        function (controllerProps) {
            return React.createElement(ReferenceArrayInputView, _extends({}, props, _extends({ children: children }, controllerProps)));
        }
    );
};

export { ReferenceArrayInput };
ReferenceArrayInput.propTypes = {
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    filter: PropTypes.object,
    filterToQuery: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object,
    perPage: PropTypes.number,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC'])
    }),
    source: PropTypes.string,
    translate: PropTypes.func.isRequired
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

var EnhancedReferenceArrayInput = compose(addField, translate)(ReferenceArrayInput);

export default EnhancedReferenceArrayInput;