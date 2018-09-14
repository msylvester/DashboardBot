import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { stringify } from 'query-string';
import { fetchUtils, GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, UPDATE_MANY, DELETE, DELETE_MANY } from 'react-admin';

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (function (apiUrl) {
    var httpClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fetchUtils.fetchJson;

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    var convertDataRequestToHTTP = function convertDataRequestToHTTP(type, resource, params) {
        var url = '';
        var options = {};
        switch (type) {
            case GET_LIST:
                {
                    var _params$pagination = params.pagination,
                        page = _params$pagination.page,
                        perPage = _params$pagination.perPage;
                    var _params$sort = params.sort,
                        field = _params$sort.field,
                        order = _params$sort.order;

                    var query = _extends({}, fetchUtils.flattenObject(params.filter), {
                        _sort: field,
                        _order: order,
                        _start: (page - 1) * perPage,
                        _end: page * perPage
                    });
                    url = apiUrl + '/' + resource + '?' + stringify(query);
                    break;
                }
            case GET_ONE:
                url = apiUrl + '/' + resource + '/' + params.id;
                break;
            case GET_MANY_REFERENCE:
                {
                    var _extends2;

                    var _params$pagination2 = params.pagination,
                        _page = _params$pagination2.page,
                        _perPage = _params$pagination2.perPage;
                    var _params$sort2 = params.sort,
                        _field = _params$sort2.field,
                        _order = _params$sort2.order;

                    var _query = _extends({}, fetchUtils.flattenObject(params.filter), (_extends2 = {}, _defineProperty(_extends2, params.target, params.id), _defineProperty(_extends2, '_sort', _field), _defineProperty(_extends2, '_order', _order), _defineProperty(_extends2, '_start', (_page - 1) * _perPage), _defineProperty(_extends2, '_end', _page * _perPage), _extends2));
                    url = apiUrl + '/' + resource + '?' + stringify(_query);
                    break;
                }
            case UPDATE:
                url = apiUrl + '/' + resource + '/' + params.id;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = apiUrl + '/' + resource;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = apiUrl + '/' + resource + '/' + params.id;
                options.method = 'DELETE';
                break;
            case GET_MANY:
                {
                    var _query2 = _defineProperty({}, 'id_like', params.ids.join('|'));
                    url = apiUrl + '/' + resource + '?' + stringify(_query2);
                    break;
                }
            default:
                throw new Error('Unsupported fetch action type ' + type);
        }
        return { url: url, options: options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    var convertHTTPResponse = function convertHTTPResponse(response, type, resource, params) {
        var headers = response.headers,
            json = response.json;

        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!headers.has('x-total-count')) {
                    throw new Error('The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?');
                }
                return {
                    data: json,
                    total: parseInt(headers.get('x-total-count').split('/').pop(), 10)
                };
            case CREATE:
                return { data: _extends({}, params.data, { id: json.id }) };
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return function (type, resource, params) {
        // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient(apiUrl + '/' + resource + '/' + id, {
                    method: 'PATCH',
                    body: JSON.stringify(params.data)
                });
            })).then(function (responses) {
                return {
                    data: responses.map(function (response) {
                        return response.json;
                    })
                };
            });
        }
        // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient(apiUrl + '/' + resource + '/' + id, {
                    method: 'DELETE'
                });
            })).then(function (responses) {
                return {
                    data: responses.map(function (response) {
                        return response.json;
                    })
                };
            });
        }

        var _convertDataRequestTo = convertDataRequestToHTTP(type, resource, params),
            url = _convertDataRequestTo.url,
            options = _convertDataRequestTo.options;

        return httpClient(url, options).then(function (response) {
            return convertHTTPResponse(response, type, resource, params);
        });
    };
});