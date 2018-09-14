'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _GetApp = require('@material-ui/icons/GetApp');

var _GetApp2 = _interopRequireDefault(_GetApp);

var _raCore = require('ra-core');

var _papaparse = require('papaparse/papaparse.min');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        crudGetAll = _ref.crudGetAll,
        dispatch = _ref.dispatch,
        exporter = _ref.exporter,
        filter = _ref.filter,
        maxResults = _ref.maxResults,
        resource = _ref.resource,
        sort = _ref.sort,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'crudGetAll', 'dispatch', 'exporter', 'filter', 'maxResults', 'resource', 'sort']);
    return rest;
};

/**
 * Helper function for calling the data provider with GET_MANY
 * via redux and saga, and getting a Promise in return
 *
 * @example
 *     fetchRelatedRecords(records, 'post_id', 'posts').then(posts =>
 *          posts.map(record => ({
 *              ...record,
 *              post_title: posts[record.post_id].title,
 *          }));
 */
var fetchRelatedRecords = function fetchRelatedRecords(dispatch) {
    return function (data, field, resource) {
        return new Promise(function (resolve, reject) {
            // find unique keys
            var ids = [].concat((0, _toConsumableArray3.default)(new Set(data.map(function (record) {
                return record[field];
            }))));
            dispatch({
                type: _raCore.CRUD_GET_MANY,
                payload: { ids: ids },
                meta: {
                    resource: resource,
                    fetch: _raCore.GET_MANY,
                    onSuccess: {
                        callback: function callback(_ref2) {
                            var data = _ref2.payload.data;

                            resolve(data.reduce(function (acc, post) {
                                acc[post.id] = post;
                                return acc;
                            }, {}));
                        }
                    },
                    onFailure: {
                        notification: {
                            body: 'ra.notification.http_error',
                            level: 'warning'
                        },
                        callback: function callback(_ref3) {
                            var error = _ref3.error;
                            return reject(error);
                        }
                    }
                }
            });
        });
    };
};

var ExportButton = function (_Component) {
    (0, _inherits3.default)(ExportButton, _Component);

    function ExportButton() {
        var _ref4;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ExportButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref4 = ExportButton.__proto__ || Object.getPrototypeOf(ExportButton)).call.apply(_ref4, [this].concat(args))), _this), _this.handleClick = function () {
            var _this$props = _this.props,
                dispatch = _this$props.dispatch,
                exporter = _this$props.exporter,
                filter = _this$props.filter,
                maxResults = _this$props.maxResults,
                sort = _this$props.sort,
                resource = _this$props.resource;

            dispatch((0, _raCore.crudGetAll)(resource, sort, filter, maxResults, function (_ref5) {
                var data = _ref5.payload.data;
                return exporter ? exporter(data, fetchRelatedRecords(dispatch), dispatch) : (0, _raCore.downloadCSV)((0, _papaparse.unparse)(data), resource);
            }));
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ExportButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                rest = (0, _objectWithoutProperties3.default)(_props, ['label']);


            return _react2.default.createElement(
                _Button2.default,
                (0, _extends3.default)({
                    onClick: this.handleClick,
                    label: label
                }, sanitizeRestProps(rest)),
                _react2.default.createElement(_GetApp2.default, null)
            );
        }
    }]);
    return ExportButton;
}(_react.Component);

ExportButton.propTypes = {
    basePath: _propTypes2.default.string,
    dispatch: _propTypes2.default.func,
    exporter: _propTypes2.default.func,
    filter: _propTypes2.default.object,
    label: _propTypes2.default.string,
    maxResults: _propTypes2.default.number.isRequired,
    resource: _propTypes2.default.string.isRequired,
    sort: _propTypes2.default.object
};


ExportButton.defaultProps = {
    label: 'ra.action.export',
    maxResults: 1000
};

exports.default = (0, _reactRedux.connect)()(ExportButton); // inject redux dispatch

module.exports = exports['default'];