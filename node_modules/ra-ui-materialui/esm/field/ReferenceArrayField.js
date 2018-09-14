import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { ReferenceArrayFieldController } from 'ra-core';

var styles = {
    progress: { marginTop: '1em' }
};

export var ReferenceArrayFieldView = function ReferenceArrayFieldView(_ref) {
    var children = _ref.children,
        className = _ref.className,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        data = _ref.data,
        ids = _ref.ids,
        isLoading = _ref.isLoading,
        reference = _ref.reference,
        referenceBasePath = _ref.referenceBasePath;

    if (isLoading) {
        return React.createElement(LinearProgress, { className: classes.progress });
    }

    return React.cloneElement(children, {
        className: className,
        resource: reference,
        ids: ids,
        data: data,
        isLoading: isLoading,
        basePath: referenceBasePath,
        currentSort: {}
    });
};

ReferenceArrayFieldView.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.object,
    ids: PropTypes.array,
    isLoading: PropTypes.bool,
    children: PropTypes.element.isRequired,
    reference: PropTypes.string.isRequired,
    referenceBasePath: PropTypes.string
};

/**
 * A container component that fetches records from another resource specified
 * by an array of *ids* in current record.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the products of the current order as datagrid
 * // order = {
 * //   id: 123,
 * //   product_ids: [456, 457, 458],
 * // }
 * <ReferenceArrayField label="Products" reference="products" source="product_ids">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="description" />
 *         <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceArrayField>
 *
 * @example Display all the categories of the current product as a list of chips
 * // product = {
 * //   id: 456,
 * //   category_ids: [11, 22, 33],
 * // }
 * <ReferenceArrayField label="Categories" reference="categories" source="category_ids">
 *     <SingleFieldList>
 *         <ChipField source="name" />
 *     </SingleFieldList>
 * </ReferenceArrayField>
 *
 */
var ReferenceArrayField = function ReferenceArrayField(_ref2) {
    var children = _ref2.children,
        props = _objectWithoutProperties(_ref2, ['children']);

    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceArrayField> only accepts a single child (like <Datagrid>)');
    }

    return React.createElement(
        ReferenceArrayFieldController,
        props,
        function (controllerProps) {
            return React.createElement(ReferenceArrayFieldView, _extends({}, props, _extends({ children: children }, controllerProps)));
        }
    );
};

export { ReferenceArrayField };
ReferenceArrayField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
    label: PropTypes.string,
    record: PropTypes.object.isRequired,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired
};

var EnhancedReferenceArrayField = withStyles(styles)(ReferenceArrayField);

EnhancedReferenceArrayField.defaultProps = {
    addLabel: true
};

export default EnhancedReferenceArrayField;