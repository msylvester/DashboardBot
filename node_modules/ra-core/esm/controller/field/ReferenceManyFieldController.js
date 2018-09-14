import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { crudGetManyReference as crudGetManyReferenceAction } from '../../actions';
import { SORT_ASC, SORT_DESC } from '../../reducer/admin/resource/list/queryReducer';
import { getIds, getReferences, nameRelatedTo } from '../../reducer/admin/references/oneToMany';

/**
 * Render related records to the current one.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 *
 * @example Display all the books by the current author, only the title
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceManyField perPage={10} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceManyField sort={{ field: 'created_at', order: 'DESC' }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceManyField filter={{ is_published: true }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 */
export var ReferenceManyFieldController = function (_Component) {
    _inherits(ReferenceManyFieldController, _Component);

    function ReferenceManyFieldController(props) {
        _classCallCheck(this, ReferenceManyFieldController);

        var _this = _possibleConstructorReturn(this, (ReferenceManyFieldController.__proto__ || Object.getPrototypeOf(ReferenceManyFieldController)).call(this, props));

        _this.setSort = function (field) {
            var order = _this.state.sort.field === field && _this.state.sort.order === SORT_ASC ? SORT_DESC : SORT_ASC;
            _this.setState({ sort: { field: field, order: order } }, _this.fetchReferences);
        };

        _this.state = { sort: props.sort };
        return _this;
    }

    _createClass(ReferenceManyFieldController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReferences();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.record.id !== nextProps.record.id) {
                this.fetchReferences(nextProps);
            }

            if (!isEqual(this.props.sort, nextProps.sort)) {
                this.setState({ sort: nextProps.sort }, this.fetchReferences);
            }
        }
    }, {
        key: 'fetchReferences',
        value: function fetchReferences() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props,
                reference = _ref.reference,
                record = _ref.record,
                resource = _ref.resource,
                target = _ref.target,
                perPage = _ref.perPage,
                filter = _ref.filter,
                source = _ref.source;

            var crudGetManyReference = this.props.crudGetManyReference;

            var pagination = { page: 1, perPage: perPage };
            var relatedTo = nameRelatedTo(reference, record[source], resource, target, filter);
            crudGetManyReference(reference, target, record[source], relatedTo, pagination, this.state.sort, filter);
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


            var referenceBasePath = basePath.replace(resource, reference);

            return children({
                currentSort: this.state.sort,
                data: data,
                ids: ids,
                isLoading: typeof ids === 'undefined',
                referenceBasePath: referenceBasePath,
                setSort: this.setSort
            });
        }
    }]);

    return ReferenceManyFieldController;
}(Component);

ReferenceManyFieldController.propTypes = {
    basePath: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    crudGetManyReference: PropTypes.func.isRequired,
    filter: PropTypes.object,
    ids: PropTypes.array,
    perPage: PropTypes.number,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    data: PropTypes.object,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC'])
    }),
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    isLoading: PropTypes.bool
};

ReferenceManyFieldController.defaultProps = {
    filter: {},
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    source: 'id'
};

function mapStateToProps(state, props) {
    var relatedTo = nameRelatedTo(props.reference, props.record[props.source], props.resource, props.target, props.filter);
    return {
        data: getReferences(state, props.reference, relatedTo),
        ids: getIds(state, relatedTo)
    };
}

export default connect(mapStateToProps, {
    crudGetManyReference: crudGetManyReferenceAction
})(ReferenceManyFieldController);