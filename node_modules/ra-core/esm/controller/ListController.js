import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parse, stringify } from 'query-string';
import { push as pushAction } from 'react-router-redux';
import compose from 'recompose/compose';
import { createSelector } from 'reselect';
import inflection from 'inflection';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

import removeEmpty from '../util/removeEmpty';
import queryReducer, { SET_SORT, SET_PAGE, SET_PER_PAGE, SET_FILTER, SORT_DESC } from '../reducer/admin/resource/list/queryReducer';
import { crudGetList as crudGetListAction } from '../actions/dataActions';
import { changeListParams as changeListParamsAction, setListSelectedIds as setListSelectedIdsAction, toggleListItem as toggleListItemAction } from '../actions/listActions';
import translate from '../i18n/translate';
import removeKey from '../util/removeKey';

/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * Props:
 *   - title
 *   - perPage
 *   - sort
 *   - filter (the permanent filter to apply to the query)
 *   - actions
 *   - filters (a React Element used to display the filter form)
 *   - pagination
 *
 * @example
 *     const PostFilter = (props) => (
 *         <Filter {...props}>
 *             <TextInput label="Search" source="q" alwaysOn />
 *             <TextInput label="Title" source="title" />
 *         </Filter>
 *     );
 *     export const PostList = (props) => (
 *         <List {...props}
 *             title="List of posts"
 *             sort={{ field: 'published_at' }}
 *             filter={{ is_published: true }}
 *             filters={<PostFilter />}
 *         >
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="title" />
 *                 <EditButton />
 *             </Datagrid>
 *         </List>
 *     );
 */
export var ListController = function (_Component) {
    _inherits(ListController, _Component);

    function ListController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListController.__proto__ || Object.getPrototypeOf(ListController)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.setSort = function (sort) {
            return _this.changeParams({ type: SET_SORT, payload: sort });
        }, _this.setPage = function (page) {
            return _this.changeParams({ type: SET_PAGE, payload: page });
        }, _this.setPerPage = function (perPage) {
            return _this.changeParams({ type: SET_PER_PAGE, payload: perPage });
        }, _this.setFilters = debounce(function (filters) {
            if (isEqual(filters, _this.props.filterValues)) {
                return;
            }

            // fix for redux-form bug with onChange and enableReinitialize
            var filtersWithoutEmpty = removeEmpty(filters);
            _this.changeParams({ type: SET_FILTER, payload: filtersWithoutEmpty });
        }, _this.props.debounce), _this.showFilter = function (filterName, defaultValue) {
            _this.setState(_defineProperty({}, filterName, true));
            if (typeof defaultValue !== 'undefined') {
                _this.setFilters(_extends({}, _this.props.filterValues, _defineProperty({}, filterName, defaultValue)));
            }
        }, _this.hideFilter = function (filterName) {
            _this.setState(_defineProperty({}, filterName, false));
            var newFilters = removeKey(_this.props.filterValues, filterName);
            _this.setFilters(newFilters);
        }, _this.handleSelect = function (ids) {
            _this.props.setSelectedIds(_this.props.resource, ids);
        }, _this.handleUnselectItems = function () {
            _this.props.setSelectedIds(_this.props.resource, []);
        }, _this.handleToggleItem = function (id) {
            _this.props.toggleItem(_this.props.resource, id);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ListController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.props.query.page && !(this.props.ids || []).length && this.props.params.page > 1 && this.props.total > 0) {
                this.setPage(this.props.params.page - 1);
                return;
            }

            this.updateData();
            if (Object.keys(this.props.query).length > 0) {
                this.props.changeListParams(this.props.resource, this.props.query);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setFilters.cancel();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.resource !== this.props.resource || nextProps.query.sort !== this.props.query.sort || nextProps.query.order !== this.props.query.order || nextProps.query.page !== this.props.query.page || nextProps.query.perPage !== this.props.query.perPage || !isEqual(nextProps.query.filter, this.props.query.filter) || !isEqual(nextProps.filter, this.props.filter) || !isEqual(nextProps.sort, this.props.sort) || !isEqual(nextProps.perPage, this.props.perPage)) {
                this.updateData(Object.keys(nextProps.query).length > 0 ? nextProps.query : nextProps.params);
            }
            if (nextProps.version !== this.props.version) {
                this.updateData();
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.translate === this.props.translate && nextProps.isLoading === this.props.isLoading && nextProps.version === this.props.version && nextState === this.state && nextProps.data === this.props.data && nextProps.selectedIds === this.props.selectedIds && nextProps.total === this.props.total) {
                return false;
            }
            return true;
        }

        /**
         * Merge list params from 4 different sources:
         *   - the query string
         *   - the params stored in the state (from previous navigation)
         *   - the filter defaultValues
         *   - the props passed to the List component
         */

    }, {
        key: 'getQuery',
        value: function getQuery() {
            var query = Object.keys(this.props.query).length > 0 ? this.props.query : _extends({}, this.props.params);
            var filterDefaultValues = this.props.filterDefaultValues || {};

            query.filter = _extends({}, filterDefaultValues, query.filter);

            if (!query.sort) {
                query.sort = this.props.sort.field;
                query.order = this.props.sort.order;
            }
            if (!query.perPage) {
                query.perPage = this.props.perPage;
            }
            if (!query.page) {
                query.page = 1;
            }
            return query;
        }
    }, {
        key: 'updateData',
        value: function updateData(query) {
            var params = query || this.getQuery();
            var sort = params.sort,
                order = params.order,
                _params$page = params.page,
                page = _params$page === undefined ? 1 : _params$page,
                perPage = params.perPage,
                filter = params.filter;

            var pagination = {
                page: parseInt(page, 10),
                perPage: parseInt(perPage, 10)
            };
            var permanentFilter = this.props.filter;
            this.props.crudGetList(this.props.resource, pagination, { field: sort, order: order }, _extends({}, filter, permanentFilter));
        }
    }, {
        key: 'changeParams',
        value: function changeParams(action) {
            var newParams = queryReducer(this.getQuery(), action);
            this.props.push(_extends({}, this.props.location, {
                search: '?' + stringify(_extends({}, newParams, {
                    filter: JSON.stringify(newParams.filter)
                }))
            }));
            this.props.changeListParams(this.props.resource, newParams);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                resource = _props.resource,
                hasCreate = _props.hasCreate,
                data = _props.data,
                ids = _props.ids,
                total = _props.total,
                isLoading = _props.isLoading,
                translate = _props.translate,
                version = _props.version,
                selectedIds = _props.selectedIds;

            var query = this.getQuery();

            var queryFilterValues = query.filter || {};

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 2,
                _: inflection.humanize(inflection.pluralize(resource))
            });
            var defaultTitle = translate('ra.page.list', {
                name: '' + resourceName
            });

            return children({
                basePath: basePath,
                currentSort: {
                    field: query.sort,
                    order: query.order
                },
                data: data,
                defaultTitle: defaultTitle,
                displayedFilters: this.state,
                filterValues: queryFilterValues,
                hasCreate: hasCreate,
                hideFilter: this.hideFilter,
                ids: ids,
                isLoading: isLoading,
                onSelect: this.handleSelect,
                onToggleItem: this.handleToggleItem,
                onUnselectItems: this.handleUnselectItems,
                page: parseInt(query.page || 1, 10),
                perPage: parseInt(query.perPage, 10),
                refresh: this.refresh,
                resource: resource,
                selectedIds: selectedIds,
                setFilters: this.setFilters,
                setPage: this.setPage,
                setPerPage: this.setPerPage,
                setSort: this.setSort,
                showFilter: this.showFilter,
                translate: translate,
                total: total,
                version: version
            });
        }
    }]);

    return ListController;
}(Component);

ListController.propTypes = {
    // the props you can change
    children: PropTypes.func.isRequired,
    filter: PropTypes.object,
    filters: PropTypes.element,
    filterDefaultValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    pagination: PropTypes.element,
    perPage: PropTypes.number.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string
    }),
    // the props managed by react-admin
    authProvider: PropTypes.func,
    basePath: PropTypes.string.isRequired,
    changeListParams: PropTypes.func.isRequired,
    crudGetList: PropTypes.func.isRequired,
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    debounce: PropTypes.number,
    filterValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    hasCreate: PropTypes.bool.isRequired,
    hasEdit: PropTypes.bool.isRequired,
    hasList: PropTypes.bool.isRequired,
    hasShow: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    selectedIds: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    path: PropTypes.string,
    params: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    setSelectedIds: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
    version: PropTypes.number
};

ListController.defaultProps = {
    debounce: 500,
    filter: {},
    filterValues: {},
    perPage: 10,
    sort: {
        field: 'id',
        order: SORT_DESC
    }
};

var injectedProps = ['basePath', 'currentSort', 'data', 'defaultTitle', 'displayedFilters', 'filterValues', 'hasCreate', 'hideFilter', 'ids', 'isLoading', 'onSelect', 'onToggleItem', 'onUnselectItems', 'page', 'perPage', 'refresh', 'resource', 'selectedIds', 'setFilters', 'setPage', 'setPerPage', 'setSort', 'showFilter', 'total', 'translate', 'version'];

/**
 * Select the props injected by the ListController
 * to be passed to the List children need
 * This is an implementation of pick()
 */
export var getListControllerProps = function getListControllerProps(props) {
    return injectedProps.reduce(function (acc, key) {
        return _extends({}, acc, _defineProperty({}, key, props[key]));
    }, {});
};

/**
 * Select the props not injected by the ListController
 * to be used inside the List children to sanitize props injected by List
 * This is an implementation of omit()
 */
export var sanitizeListRestProps = function sanitizeListRestProps(props) {
    return Object.keys(props).filter(function (props) {
        return !injectedProps.includes(props);
    }).reduce(function (acc, key) {
        return _extends({}, acc, _defineProperty({}, key, props[key]));
    }, {});
};

var validQueryParams = ['page', 'perPage', 'sort', 'order', 'filter'];
var getLocationPath = function getLocationPath(props) {
    return props.location.pathname;
};
var getLocationSearch = function getLocationSearch(props) {
    return props.location.search;
};
var selectQuery = createSelector(getLocationPath, getLocationSearch, function (path, search) {
    var query = pickBy(parse(search), function (v, k) {
        return validQueryParams.indexOf(k) !== -1;
    });
    if (query.filter && typeof query.filter === 'string') {
        try {
            query.filter = JSON.parse(query.filter);
        } catch (err) {
            delete query.filter;
        }
    }
    return query;
});

function mapStateToProps(state, props) {
    var resourceState = state.admin.resources[props.resource];

    return {
        query: selectQuery(props),
        params: resourceState.list.params,
        ids: resourceState.list.ids,
        selectedIds: resourceState.list.selectedIds,
        total: resourceState.list.total,
        data: resourceState.data,
        isLoading: state.admin.loading > 0,
        filterValues: resourceState.list.params.filter,
        version: state.admin.ui.viewVersion
    };
}

export default compose(connect(mapStateToProps, {
    crudGetList: crudGetListAction,
    changeListParams: changeListParamsAction,
    setSelectedIds: setListSelectedIdsAction,
    toggleItem: toggleListItemAction,
    push: pushAction
}), translate)(ListController);