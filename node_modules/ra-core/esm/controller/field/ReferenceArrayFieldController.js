import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { crudGetManyAccumulate as crudGetManyAccumulateAction } from '../../actions';
import { getReferencesByIds } from '../../reducer/admin/references/oneToMany';

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
export var ReferenceArrayFieldController = function (_Component) {
    _inherits(ReferenceArrayFieldController, _Component);

    function ReferenceArrayFieldController() {
        _classCallCheck(this, ReferenceArrayFieldController);

        return _possibleConstructorReturn(this, (ReferenceArrayFieldController.__proto__ || Object.getPrototypeOf(ReferenceArrayFieldController)).apply(this, arguments));
    }

    _createClass(ReferenceArrayFieldController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReferences();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ((this.props.record || {}).id !== (nextProps.record || {}).id) {
                this.fetchReferences(nextProps);
            }
        }
    }, {
        key: 'fetchReferences',
        value: function fetchReferences() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props,
                crudGetManyAccumulate = _ref.crudGetManyAccumulate,
                reference = _ref.reference,
                ids = _ref.ids;

            crudGetManyAccumulate(reference, ids);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                resource = _props.resource,
                reference = _props.reference,
                data = _props.data,
                ids = _props.ids,
                children = _props.children,
                basePath = _props.basePath;


            var referenceBasePath = basePath.replace(resource, reference); // FIXME obviously very weak

            return children({
                isLoading: ids.length !== 0 && !data,
                ids: ids,
                data: data,
                referenceBasePath: referenceBasePath,
                currentSort: {}
            });
        }
    }]);

    return ReferenceArrayFieldController;
}(Component);

ReferenceArrayFieldController.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.func.isRequired,
    crudGetManyAccumulate: PropTypes.func.isRequired,
    data: PropTypes.object,
    ids: PropTypes.array.isRequired,
    label: PropTypes.string,
    record: PropTypes.object.isRequired,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired
};

var mapStateToProps = function mapStateToProps(state, props) {
    var record = props.record,
        source = props.source,
        reference = props.reference;

    var ids = get(record, source) || [];
    return {
        data: getReferencesByIds(state, reference, ids),
        ids: ids
    };
};

export default connect(mapStateToProps, {
    crudGetManyAccumulate: crudGetManyAccumulateAction
})(ReferenceArrayFieldController);