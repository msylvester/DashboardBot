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

import { crudGetManyAccumulate as crudGetManyAccumulateAction, crudGetMatchingAccumulate as crudGetMatchingAccumulateAction } from '../../actions/accumulateActions';
import { getPossibleReferences, getPossibleReferenceValues, getReferenceResource } from '../../reducer';
import { getStatusForInput as getDataStatus } from './referenceDataStatus';
import translate from '../../i18n/translate';

var referenceSource = function referenceSource(resource, source) {
    return resource + '@' + source;
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
export var ReferenceInputController = function (_Component) {
    _inherits(ReferenceInputController, _Component);

    function ReferenceInputController(props) {
        _classCallCheck(this, ReferenceInputController);

        var _this = _possibleConstructorReturn(this, (ReferenceInputController.__proto__ || Object.getPrototypeOf(ReferenceInputController)).call(this, props));

        _initialiseProps.call(_this);

        var perPage = props.perPage,
            sort = props.sort,
            filter = props.filter;

        _this.state = { pagination: { page: 1, perPage: perPage }, sort: sort, filter: filter };
        _this.debouncedSetFilter = debounce(_this.setFilter.bind(_this), 500);
        return _this;
    }

    _createClass(ReferenceInputController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReferenceAndOptions(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ((this.props.record || {}).id !== (nextProps.record || {}).id) {
                this.fetchReferenceAndOptions(nextProps);
            } else if (this.props.input.value !== nextProps.input.value) {
                this.fetchReference(nextProps);
            } else if (!isEqual(nextProps.filter, this.props.filter) || !isEqual(nextProps.sort, this.props.sort) || nextProps.perPage !== this.props.perPage) {
                this.setState(function (state) {
                    return {
                        filter: nextProps.filter,
                        pagination: _extends({}, state.pagination, {
                            perPage: nextProps.perPage
                        }),
                        sort: nextProps.sort
                    };
                }, this.fetchOptions);
            }
        }
    }, {
        key: 'fetchReferenceAndOptions',
        value: function fetchReferenceAndOptions(props) {
            this.fetchReference(props);
            this.fetchOptions(props);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                input = _props.input,
                referenceRecord = _props.referenceRecord,
                matchingReferences = _props.matchingReferences,
                onChange = _props.onChange,
                children = _props.children,
                translate = _props.translate;
            var _state = this.state,
                pagination = _state.pagination,
                sort = _state.sort,
                filter = _state.filter;


            var dataStatus = getDataStatus({
                input: input,
                matchingReferences: matchingReferences,
                referenceRecord: referenceRecord,
                translate: translate
            });

            return children({
                choices: dataStatus.choices,
                error: dataStatus.error,
                isLoading: dataStatus.waiting,
                onChange: onChange,
                filter: filter,
                setFilter: this.debouncedSetFilter,
                pagination: pagination,
                setPagination: this.setPagination,
                sort: sort,
                setSort: this.setSort,
                warning: dataStatus.warning
            });
        }
    }]);

    return ReferenceInputController;
}(Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.setFilter = function (filter) {
        if (filter !== _this2.state.filter) {
            _this2.setState({ filter: _this2.props.filterToQuery(filter) }, _this2.fetchOptions);
        }
    };

    this.setPagination = function (pagination) {
        if (pagination !== _this2.state.pagination) {
            _this2.setState({ pagination: pagination }, _this2.fetchOptions);
        }
    };

    this.setSort = function (sort) {
        if (sort !== _this2.state.sort) {
            _this2.setState({ sort: sort }, _this2.fetchOptions);
        }
    };

    this.fetchReference = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
        var crudGetManyAccumulate = props.crudGetManyAccumulate,
            input = props.input,
            reference = props.reference;

        var id = input.value;
        if (id) {
            crudGetManyAccumulate(reference, [id], null, false);
        }
    };

    this.fetchOptions = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
        var crudGetMatchingAccumulate = props.crudGetMatchingAccumulate,
            filterFromProps = props.filter,
            reference = props.reference,
            referenceSource = props.referenceSource,
            resource = props.resource,
            source = props.source;
        var _state2 = _this2.state,
            pagination = _state2.pagination,
            sort = _state2.sort,
            filter = _state2.filter;


        crudGetMatchingAccumulate(reference, referenceSource(resource, source), pagination, sort, _extends({}, filterFromProps, filter));
    };
};

ReferenceInputController.propTypes = {
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string,
    children: PropTypes.func.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
    crudGetMatchingAccumulate: PropTypes.func.isRequired,
    crudGetManyAccumulate: PropTypes.func.isRequired,
    filter: PropTypes.object,
    filterToQuery: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    matchingReferences: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    perPage: PropTypes.number,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    referenceRecord: PropTypes.object,
    referenceSource: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC'])
    }),
    source: PropTypes.string,
    translate: PropTypes.func.isRequired
};

ReferenceInputController.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: function filterToQuery(searchText) {
        return { q: searchText };
    },
    matchingReferences: null,
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    referenceRecord: null,
    referenceSource: referenceSource // used in tests
};

var makeMapStateToProps = function makeMapStateToProps() {
    return createSelector([getReferenceResource, getPossibleReferenceValues, function (_, props) {
        return props.input.value;
    }], function (referenceState, possibleValues, inputId) {
        return {
            matchingReferences: getPossibleReferences(referenceState, possibleValues, [inputId]),
            referenceRecord: referenceState && referenceState.data[inputId]
        };
    });
};

var EnhancedReferenceInputController = compose(translate, connect(makeMapStateToProps(), {
    crudGetManyAccumulate: crudGetManyAccumulateAction,
    crudGetMatchingAccumulate: crudGetMatchingAccumulateAction
}))(ReferenceInputController);

EnhancedReferenceInputController.defaultProps = {
    referenceSource: referenceSource // used in makeMapStateToProps
};

export default EnhancedReferenceInputController;