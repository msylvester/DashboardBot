'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pagination = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _TablePagination = require('@material-ui/core/TablePagination');

var _TablePagination2 = _interopRequireDefault(_TablePagination);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

var _PaginationActions = require('./PaginationActions');

var _PaginationActions2 = _interopRequireDefault(_PaginationActions);

var _PaginationLimit = require('./PaginationLimit');

var _PaginationLimit2 = _interopRequireDefault(_PaginationLimit);

var _Responsive = require('../layout/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyArray = [];

var Pagination = exports.Pagination = function (_Component) {
    (0, _inherits3.default)(Pagination, _Component);

    function Pagination() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Pagination);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call.apply(_ref, [this].concat(args))), _this), _this.getNbPages = function () {
            return Math.ceil(_this.props.total / _this.props.perPage) || 1;
        }, _this.handlePageChange = function (event, page) {
            event.stopPropagation();
            if (page < 0 || page > _this.getNbPages() - 1) {
                throw new Error(_this.props.translate('ra.navigation.page_out_of_boundaries', {
                    page: page + 1
                }));
            }
            _this.props.setPage(page + 1);
        }, _this.handlePerPageChange = function (event) {
            _this.props.setPerPage(event.target.value);
        }, _this.labelDisplayedRows = function (_ref2) {
            var from = _ref2.from,
                to = _ref2.to,
                count = _ref2.count;
            var translate = _this.props.translate;

            return translate('ra.navigation.page_range_info', {
                offsetBegin: from,
                offsetEnd: to,
                total: count
            });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    /**
     * Warning: material-ui's page is 0-based
     */


    (0, _createClass3.default)(Pagination, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                isLoading = _props.isLoading,
                page = _props.page,
                perPage = _props.perPage,
                rowsPerPageOptions = _props.rowsPerPageOptions,
                total = _props.total,
                translate = _props.translate,
                rest = (0, _objectWithoutProperties3.default)(_props, ['isLoading', 'page', 'perPage', 'rowsPerPageOptions', 'total', 'translate']);


            if (!isLoading && total === 0 || page < 1 || page > this.getNbPages()) {
                return _react2.default.createElement(_PaginationLimit2.default, { total: total, page: page });
            }

            return _react2.default.createElement(_Responsive2.default, {
                small: _react2.default.createElement(_TablePagination2.default, (0, _extends3.default)({
                    count: total,
                    rowsPerPage: perPage,
                    page: page - 1,
                    onChangePage: this.handlePageChange,
                    rowsPerPageOptions: emptyArray,
                    component: 'span',
                    labelDisplayedRows: this.labelDisplayedRows
                }, (0, _raCore.sanitizeListRestProps)(rest))),
                medium: _react2.default.createElement(_TablePagination2.default, (0, _extends3.default)({
                    count: total,
                    rowsPerPage: perPage,
                    page: page - 1,
                    onChangePage: this.handlePageChange,
                    onChangeRowsPerPage: this.handlePerPageChange,
                    ActionsComponent: _PaginationActions2.default,
                    component: 'span',
                    labelRowsPerPage: translate('ra.navigation.page_rows_per_page'),
                    labelDisplayedRows: this.labelDisplayedRows,
                    rowsPerPageOptions: rowsPerPageOptions
                }, (0, _raCore.sanitizeListRestProps)(rest)))
            });
        }
    }]);
    return Pagination;
}(_react.Component);

Pagination.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    ids: _propTypes2.default.array,
    isLoading: _propTypes2.default.bool,
    page: _propTypes2.default.number,
    perPage: _propTypes2.default.number,
    rowsPerPageOptions: _propTypes2.default.arrayOf(_propTypes2.default.number),
    setPage: _propTypes2.default.func,
    setPerPage: _propTypes2.default.func,
    translate: _propTypes2.default.func.isRequired,
    total: _propTypes2.default.number
};

Pagination.defaultProps = {
    rowsPerPageOptions: [5, 10, 25]
};

var enhance = (0, _compose2.default)(_pure2.default, _raCore.translate);

exports.default = enhance(Pagination);