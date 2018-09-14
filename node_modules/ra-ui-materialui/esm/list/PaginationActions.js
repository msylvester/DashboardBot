import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import pure from 'recompose/pure';
import Button from '@material-ui/core/Button';
import TablePaginationActions from '@material-ui/core/TablePaginationActions';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import compose from 'recompose/compose';
import { translate } from 'ra-core';

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

export var PaginationActions = function (_Component) {
    _inherits(PaginationActions, _Component);

    function PaginationActions() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PaginationActions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaginationActions.__proto__ || Object.getPrototypeOf(PaginationActions)).call.apply(_ref, [this].concat(args))), _this), _this.getNbPages = function () {
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PaginationActions, [{
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
                return pageNum === '.' ? React.createElement(
                    'span',
                    { key: 'hyphen_' + index, className: classes.hellip },
                    '\u2026'
                ) : React.createElement(
                    Button,
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
            if (nbPages === 1) return React.createElement('div', { className: classes.actions });
            return React.createElement(
                'div',
                { className: classes.actions },
                page > 0 && React.createElement(
                    Button,
                    {
                        color: 'primary',
                        key: 'prev',
                        onClick: this.prevPage,
                        className: 'previous-page',
                        size: 'small'
                    },
                    React.createElement(ChevronLeft, null),
                    translate('ra.navigation.prev')
                ),
                this.renderPageNums(),
                page !== nbPages - 1 && React.createElement(
                    Button,
                    {
                        color: 'primary',
                        key: 'next',
                        onClick: this.nextPage,
                        className: 'next-page',
                        size: 'small'
                    },
                    translate('ra.navigation.next'),
                    React.createElement(ChevronRight, null)
                )
            );
        }
    }]);

    return PaginationActions;
}(Component);

PaginationActions.propTypes = TablePaginationActions.propTypes;

var enhance = compose(pure, translate, withStyles(styles));

export default enhance(PaginationActions);