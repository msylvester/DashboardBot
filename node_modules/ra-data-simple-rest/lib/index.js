'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _queryString = require('query-string');

var _reactAdmin = require('react-admin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
exports.default = function (apiUrl) {
    var httpClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _reactAdmin.fetchUtils.fetchJson;

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
            case _reactAdmin.GET_LIST:
                {
                    var _params$pagination = params.pagination,
                        page = _params$pagination.page,
                        perPage = _params$pagination.perPage;
                    var _params$sort = params.sort,
                        field = _params$sort.field,
                        order = _params$sort.order;

                    var query = {
                        sort: JSON.stringify([field, order]),
                        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                        filter: JSON.stringify(params.filter)
                    };
                    url = apiUrl + '/' + resource + '?' + (0, _queryString.stringify)(query);
                    break;
                }
            case _reactAdmin.GET_ONE:
                url = apiUrl + '/' + resource + '/' + params.id;
                break;
            case _reactAdmin.GET_MANY:
                {
                    var _query = {
                        filter: JSON.stringify({ id: params.ids })
                    };
                    url = apiUrl + '/' + resource + '?' + (0, _queryString.stringify)(_query);
                    break;
                }
            case _reactAdmin.GET_MANY_REFERENCE:
                {
                    var _params$pagination2 = params.pagination,
                        _page = _params$pagination2.page,
                        _perPage = _params$pagination2.perPage;
                    var _params$sort2 = params.sort,
                        _field = _params$sort2.field,
                        _order = _params$sort2.order;

                    var _query2 = {
                        sort: JSON.stringify([_field, _order]),
                        range: JSON.stringify([(_page - 1) * _perPage, _page * _perPage - 1]),
                        filter: JSON.stringify((0, _extends4.default)({}, params.filter, (0, _defineProperty3.default)({}, params.target, params.id)))
                    };
                    url = apiUrl + '/' + resource + '?' + (0, _queryString.stringify)(_query2);
                    break;
                }
            case _reactAdmin.UPDATE:
                url = apiUrl + '/' + resource + '/' + params.id;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case _reactAdmin.CREATE:
                url = apiUrl + '/' + resource;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case _reactAdmin.DELETE:
                url = apiUrl + '/' + resource + '/' + params.id;
                options.method = 'DELETE';
                break;
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
            case _reactAdmin.GET_LIST:
            case _reactAdmin.GET_MANY_REFERENCE:
                if (!headers.has('content-range')) {
                    throw new Error('The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?');
                }
                return {
                    data: json,
                    total: parseInt(headers.get('content-range').split('/').pop(), 10)
                };
            case _reactAdmin.CREATE:
                return { data: (0, _extends4.default)({}, params.data, { id: json.id }) };
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
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === _reactAdmin.UPDATE_MANY) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient(apiUrl + '/' + resource + '/' + id, {
                    method: 'PUT',
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
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === _reactAdmin.DELETE_MANY) {
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
};

module.exports = exports['default'];