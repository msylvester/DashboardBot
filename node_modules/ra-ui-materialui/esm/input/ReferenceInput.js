import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { addField, translate, ReferenceInputController } from 'ra-core';

import LinearProgress from '../layout/LinearProgress';
import Labeled from './Labeled';
import ReferenceError from './ReferenceError';

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
        rest = _objectWithoutProperties(_ref, ['allowEmpty', 'basePath', 'choices', 'className', 'component', 'crudGetMatching', 'crudGetOne', 'defaultValue', 'filter', 'filterToQuery', 'formClassName', 'initializeForm', 'input', 'isRequired', 'label', 'locale', 'meta', 'onChange', 'optionValue', 'optionText', 'perPage', 'record', 'reference', 'referenceSource', 'resource', 'setFilter', 'setPagination', 'setSort', 'sort', 'source', 'textAlign', 'translate', 'translateChoice', 'validation']);

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
        rest = _objectWithoutProperties(_ref2, ['allowEmpty', 'basePath', 'children', 'choices', 'classes', 'className', 'error', 'input', 'isRequired', 'isLoading', 'label', 'meta', 'onChange', 'resource', 'setFilter', 'setPagination', 'setSort', 'source', 'translate', 'warning']);

    if (isLoading) {
        return React.createElement(
            Labeled,
            {
                label: label,
                source: source,
                resource: resource,
                className: className,
                isRequired: isRequired
            },
            React.createElement(LinearProgress, null)
        );
    }

    if (error) {
        return React.createElement(ReferenceError, { label: label, error: error });
    }

    return React.cloneElement(children, _extends({
        allowEmpty: allowEmpty,
        classes: classes,
        className: className,
        input: input,
        isRequired: isRequired,
        label: label,
        resource: resource,
        meta: _extends({}, meta, {
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

export { ReferenceInputView };
ReferenceInputView.propTypes = {
    allowEmpty: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element,
    choices: PropTypes.array,
    classes: PropTypes.object,
    className: PropTypes.string,
    error: PropTypes.string,
    input: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    resource: PropTypes.string.isRequired,
    setFilter: PropTypes.func,
    setPagination: PropTypes.func,
    setSort: PropTypes.func,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
    warning: PropTypes.string
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
        props = _objectWithoutProperties(_ref3, ['children']);

    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceInput> only accepts a single child');
    }

    return React.createElement(
        ReferenceInputController,
        props,
        function (controllerProps) {
            return React.createElement(ReferenceInputView, _extends({}, props, _extends({ children: children }, controllerProps)));
        }
    );
};

export { ReferenceInput };
ReferenceInput.propTypes = {
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
    filter: PropTypes.object,
    filterToQuery: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    perPage: PropTypes.number,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC'])
    }),
    source: PropTypes.string,
    translate: PropTypes.func.isRequired
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

var EnhancedReferenceInput = compose(addField, translate)(ReferenceInput);

export default EnhancedReferenceInput;