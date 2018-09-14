import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ContentFilter from '@material-ui/icons/FilterList';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { translate } from 'ra-core';

import FilterButtonMenuItem from './FilterButtonMenuItem';
import Button from '../button/Button';

var styles = {
    root: { display: 'inline-block' }
};

export var FilterButton = function (_Component) {
    _inherits(FilterButton, _Component);

    function FilterButton(props) {
        _classCallCheck(this, FilterButton);

        var _this = _possibleConstructorReturn(this, (FilterButton.__proto__ || Object.getPrototypeOf(FilterButton)).call(this, props));

        _this.button = null;

        _this.state = {
            open: false
        };
        _this.handleClickButton = _this.handleClickButton.bind(_this);
        _this.handleRequestClose = _this.handleRequestClose.bind(_this);
        _this.handleShow = _this.handleShow.bind(_this);
        return _this;
    }

    _createClass(FilterButton, [{
        key: 'getHiddenFilters',
        value: function getHiddenFilters() {
            var _props = this.props,
                filters = _props.filters,
                displayedFilters = _props.displayedFilters,
                filterValues = _props.filterValues;

            return filters.filter(function (filterElement) {
                return !filterElement.props.alwaysOn && !displayedFilters[filterElement.props.source] && !filterValues[filterElement.props.source];
            });
        }
    }, {
        key: 'handleClickButton',
        value: function handleClickButton(event) {
            // This prevents ghost click.
            event.preventDefault();

            this.setState({
                open: true,
                anchorEl: findDOMNode(this.button) // eslint-disable-line react/no-find-dom-node
            });
        }
    }, {
        key: 'handleRequestClose',
        value: function handleRequestClose() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'handleShow',
        value: function handleShow(_ref) {
            var source = _ref.source,
                defaultValue = _ref.defaultValue;

            this.props.showFilter(source, defaultValue);
            this.setState({
                open: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var hiddenFilters = this.getHiddenFilters();

            var _props2 = this.props,
                _props2$classes = _props2.classes,
                classes = _props2$classes === undefined ? {} : _props2$classes,
                className = _props2.className,
                resource = _props2.resource,
                showFilter = _props2.showFilter,
                displayedFilters = _props2.displayedFilters,
                filterValues = _props2.filterValues,
                translate = _props2.translate,
                rest = _objectWithoutProperties(_props2, ['classes', 'className', 'resource', 'showFilter', 'displayedFilters', 'filterValues', 'translate']);

            var _state = this.state,
                open = _state.open,
                anchorEl = _state.anchorEl;


            return hiddenFilters.length > 0 && React.createElement(
                'div',
                _extends({ className: classnames(classes.root, className) }, rest),
                React.createElement(
                    Button,
                    {
                        ref: function ref(node) {
                            _this2.button = node;
                        },
                        className: 'add-filter',
                        label: 'ra.action.add_filter',
                        onClick: this.handleClickButton
                    },
                    React.createElement(ContentFilter, null)
                ),
                React.createElement(
                    Menu,
                    {
                        open: open,
                        anchorEl: anchorEl,
                        onClose: this.handleRequestClose
                    },
                    hiddenFilters.map(function (filterElement) {
                        return React.createElement(FilterButtonMenuItem, {
                            key: filterElement.props.source,
                            filter: filterElement.props,
                            resource: resource,
                            onShow: _this2.handleShow
                        });
                    })
                )
            );
        }
    }]);

    return FilterButton;
}(Component);

FilterButton.propTypes = {
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    displayedFilters: PropTypes.object.isRequired,
    filterValues: PropTypes.object.isRequired,
    showFilter: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string
};

export default compose(translate, withStyles(styles))(FilterButton);