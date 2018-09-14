import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import compose from 'recompose/compose';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';

import { crudGetMany as crudGetManyAction, crudGetMatching as crudGetMatchingAction } from '../../actions/dataActions';
import { getPossibleReferences, getPossibleReferenceValues, getReferenceResource } from '../../reducer';
import { getStatusForArrayInput as getDataStatus } from './referenceDataStatus';
import translate from '../../i18n/translate';

var referenceSource = function referenceSource(resource, source) {
    return resource + '@' + source;
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
export var ReferenceArrayInputController = function (_Component) {
    _inherits(ReferenceArrayInputController, _Component);

    function ReferenceArrayInputController(props) {
        _classCallCheck(this, ReferenceArrayInputController);

        var _this = _possibleConstructorReturn(this, (ReferenceArrayInputController.__proto__ || Object.getPrototypeOf(ReferenceArrayInputController)).call(this, props));

        _initialiseProps.call(_this);

        var perPage = props.perPage,
            sort = props.sort,
            filter = props.filter;
        // stored as a property rather than state because we don't want redraw of async updates

        _this.params = { pagination: { page: 1, perPage: perPage }, sort: sort, filter: filter };
        _this.debouncedSetFilter = debounce(_this.setFilter.bind(_this), 500);
        return _this;
    }

    _createClass(ReferenceArrayInputController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReferencesAndOptions();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var shouldFetchOptions = false;

            if ((this.props.record || {}).id !== (nextProps.record || {}).id) {
                this.fetchReferencesAndOptions(nextProps);
            } else if (this.props.input.value !== nextProps.input.value) {
                this.fetchReferences(nextProps);
            } else {
                if (!isEqual(nextProps.filter, this.props.filter)) {
                    this.params = _extends({}, this.params, { filter: nextProps.filter });
                    shouldFetchOptions = true;
                }
                if (!isEqual(nextProps.sort, this.props.sort)) {
                    this.params = _extends({}, this.params, { sort: nextProps.sort });
                    shouldFetchOptions = true;
                }
                if (nextProps.perPage !== this.props.perPage) {
                    this.params = _extends({}, this.params, {
                        pagination: _extends({}, this.params.pagination, {
                            perPage: nextProps.perPage
                        })
                    });
                    shouldFetchOptions = true;
                }
            }
            if (shouldFetchOptions) {
                this.fetchOptions();
            }
        }
    }, {
        key: 'fetchReferencesAndOptions',
        value: function fetchReferencesAndOptions(nextProps) {
            this.fetchReferences(nextProps);
            this.fetchOptions(nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                input = _props.input,
                referenceRecords = _props.referenceRecords,
                matchingReferences = _props.matchingReferences,
                onChange = _props.onChange,
                children = _props.children,
                translate = _props.translate;


            var dataStatus = getDataStatus({
                input: input,
                matchingReferences: matchingReferences,
                referenceRecords: referenceRecords,
                translate: translate
            });

            return children({
                choices: dataStatus.choices,
                error: dataStatus.error,
                isLoading: dataStatus.waiting,
                onChange: onChange,
                setFilter: this.debouncedSetFilter,
                setPagination: this.setPagination,
                setSort: this.setSort,
                warning: dataStatus.warning
            });
        }
    }]);

    return ReferenceArrayInputController;
}(Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.setFilter = function (filter) {
        if (filter !== _this2.params.filter) {
            _this2.params.filter = _this2.props.filterToQuery(filter);
            _this2.fetchOptions();
        }
    };

    this.setPagination = function (pagination) {
        if (pagination !== _this2.params.pagination) {
            _this2.params.pagination = pagination;
            _this2.fetchOptions();
        }
    };

    this.setSort = function (sort) {
        if (sort !== _this2.params.sort) {
            _this2.params.sort = sort;
            _this2.fetchOptions();
        }
    };

    this.fetchReferences = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
        var crudGetMany = props.crudGetMany,
            input = props.input,
            reference = props.reference;

        var ids = input.value;
        if (ids) {
            if (!Array.isArray(ids)) {
                throw Error('The value of ReferenceArrayInput should be an array');
            }
            crudGetMany(reference, ids);
        }
    };

    this.fetchOptions = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
        var crudGetMatching = props.crudGetMatching,
            reference = props.reference,
            source = props.source,
            resource = props.resource,
            referenceSource = props.referenceSource;
        var _params = _this2.params,
            pagination = _params.pagination,
            sort = _params.sort,
            filter = _params.filter;

        crudGetMatching(reference, referenceSource(resource, source), pagination, sort, filter);
    };
};

ReferenceArrayInputController.propTypes = {
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string,
    children: PropTypes.func.isRequired,
    className: PropTypes.string,
    crudGetMatching: PropTypes.func.isRequired,
    crudGetMany: PropTypes.func.isRequired,
    filter: PropTypes.object,
    filterToQuery: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    matchingReferences: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    meta: PropTypes.object,
    onChange: PropTypes.func,
    perPage: PropTypes.number,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    referenceRecords: PropTypes.array,
    referenceSource: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC'])
    }),
    source: PropTypes.string,
    translate: PropTypes.func.isRequired
};

ReferenceArrayInputController.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: function filterToQuery(searchText) {
        return { q: searchText };
    },
    matchingReferences: null,
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    referenceRecords: [],
    referenceSource: referenceSource // used in unit tests
};

var makeMapStateToProps = function makeMapStateToProps() {
    return createSelector([getReferenceResource, getPossibleReferenceValues, function (_, _ref) {
        var referenceIds = _ref.input.value;
        return referenceIds || [];
    }], function (referenceState, possibleValues, inputIds) {
        return {
            matchingReferences: getPossibleReferences(referenceState, possibleValues, inputIds),
            referenceRecords: referenceState && inputIds.reduce(function (references, referenceId) {
                if (referenceState.data[referenceId]) {
                    references.push(referenceState.data[referenceId]);
                }
                return references;
            }, [])
        };
    });
};

var EnhancedReferenceArrayInputController = compose(translate, connect(makeMapStateToProps(), {
    crudGetMany: crudGetManyAction,
    crudGetMatching: crudGetMatchingAction
}))(ReferenceArrayInputController);

EnhancedReferenceArrayInputController.defaultProps = {
    referenceSource: referenceSource // used in makeMapStateToProps
};

export default EnhancedReferenceArrayInputController;