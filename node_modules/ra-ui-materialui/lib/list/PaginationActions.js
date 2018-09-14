'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PaginationActions = undefined;

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

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _TablePaginationActions = require('@material-ui/core/TablePaginationActions');

var _TablePaginationActions2 = _interopRequireDefault(_TablePaginationActions);

var _styles = require('@material-ui/core/styles');

var _ChevronLeft = require('@material-ui/icons/ChevronLeft');

var _ChevronLeft2 = _interopRequireDefault(_ChevronLeft);

var _ChevronRight = require('@material-ui/icons/ChevronRight');

var _ChevronRight2 = _interopRequireDefault(_ChevronRight);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        actions: {
            flexShrink: 0,
            color: theme.palette.text.secondary,
            marginLeft: 20
        },
        hellip: { padding: '1.2em' }
    };
};

var PaginationActions = exports.PaginationActions = function (_Component) {
    (0, _inherits3.default)(PaginationActions, _Component);

    function PaginationActions() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, PaginationActions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PaginationActions.__proto__ || Object.getPrototypeOf(PaginationActions)).call.apply(_ref, [this].concat(args))), _this), _this.getNbPages = function () {
            return Math.ceil(_this.props.count / _this.props.rowsPerPage) || 1;
        }, _this.prevPage = function (event) {
            if (_this.props.page === 0) {
                throw new Error(_this.props.translate('ra.navigation.page_out_from_begin'));
            }
            _this.props.onChangePage(event, _this.props.page - 1);
        }, _this.nextPage = function (event) {
            if (_this.props.page > _this.getNbPages() - 1) {
                throw new Error(_this.props.translate('ra.navigation.page_out_from_end'));
            }
            _this.props.onChangePage(event, _this.props.page + 1);
        }, _this.gotoPage = function (event) {
            var page = parseInt(event.currentTarget.dataset.page, 10);
            if (page < 0 || page > _this.getNbPages() - 1) {
                throw new Error(_this.props.translate('ra.navigation.page_out_of_boundaries', {
                    page: page + 1
                }));
            }
            _this.props.onChangePage(event, page);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(PaginationActions, [{
        key: 'range',

        /**
         * Warning: material-ui's page is 0-based
         */
        value: function range() {
            var _props = this.props,
                page = _props.page,
                rowsPerPage = _props.rowsPerPage,
                count = _props.count;

            var nbPages = Math.ceil(count / rowsPerPage) || 1;
            if (isNaN(page) || nbPages === 1) {
                return [];
            }
            var input = [];
            // display page links around the current page
            if (page > 1) {
                input.push(1);
            }
            if (page === 3) {
                input.push(2);
            }
            if (page > 3) {
                input.push('.');
            }
            if (page > 0) {
                input.push(page);
            }
            input.push(page + 1);
            if (page < nbPages - 1) {
                input.push(page + 2);
            }
            if (page === nbPages - 4) {
                input.push(nbPages - 1);
            }
            if (page < nbPages - 4) {
                input.push('.');
            }
            if (page < nbPages - 2) {
                input.push(nbPages);
            }

            return input;
        }
    }, {
        key: 'renderPageNums',
        value: function renderPageNums() {
            var _this2 = this;

            var _props$classes = this.props.classes,
                classes = _props$classes === undefined ? {} : _props$classes;


            return this.range().map(function (pageNum, index) {
                return pageNum === '.' ? _react2.default.createElement(
                    'span',
                    { key: 'hyphen_' + index, className: classes.hellip },
                    '\u2026'
                ) : _react2.default.createElement(
                    _Button2.default,
                    {
                        className: 'page-number',
                        color: pageNum === _this2.props.page + 1 ? 'default' : 'primary',
                        key: pageNum,
                        'data-page': pageNum - 1,
                        onClick: _this2.gotoPage,
                        size: 'small'
                    },
                    pageNum
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                _props2$classes = _props2.classes,
                classes = _props2$classes === undefined ? {} : _props2$classes,
                page = _props2.page,
                translate = _props2.translate;


            var nbPages = this.getNbPages();
            if (nbPages === 1) return _react2.default.createElement('div', { className: classes.actions });
            return _react2.default.createElement(
                'div',
                { className: classes.actions },
                page > 0 && _react2.default.createElement(
                    _Button2.default,
                    {
                        color: 'primary',
                        key: 'prev',
                        onClick: this.prevPage,
                        className: 'previous-page',
                        size: 'small'
                    },
                    _react2.default.createElement(_ChevronLeft2.default, null),
                    translate('ra.navigation.prev')
                ),
                this.renderPageNums(),
                page !== nbPages - 1 && _react2.default.createElement(
                    _Button2.default,
                    {
                        color: 'primary',
                        key: 'next',
                        onClick: this.nextPage,
                        className: 'next-page',
                        size: 'small'
                    },
                    translate('ra.navigation.next'),
                    _react2.default.createElement(_ChevronRight2.default, null)
                )
            );
        }
    }]);
    return PaginationActions;
}(_react.Component);

PaginationActions.propTypes = _TablePaginationActions2.default.propTypes;

var enhance = (0, _compose2.default)(_pure2.default, _raCore.translate, (0, _styles.withStyles)(styles));

exports.default = enhance(PaginationActions);