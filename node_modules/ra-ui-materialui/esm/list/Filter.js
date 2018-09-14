import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { sanitizeListRestProps } from 'ra-core';

import FilterForm from './FilterForm';
import FilterButton from './FilterButton';

var styles = {
    button: {},
    form: {}
};

export var Filter = function (_Component) {
    _inherits(Filter, _Component);

    function Filter(props) {
        _classCallCheck(this, Filter);

        return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));
    }

    _createClass(Filter, [{
        key: 'renderButton',
        value: function renderButton() {
            var _props = this.props,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                context = _props.context,
                debounce = _props.debounce,
                resource = _props.resource,
                children = _props.children,
                showFilter = _props.showFilter,
                hideFilter = _props.hideFilter,
                displayedFilters = _props.displayedFilters,
                filterValues = _props.filterValues,
                rest = _objectWithoutProperties(_props, ['classes', 'context', 'debounce', 'resource', 'children', 'showFilter', 'hideFilter', 'displayedFilters', 'filterValues']);

            return React.createElement(FilterButton, _extends({
                className: classes.button,
                resource: resource,
                filters: React.Children.toArray(children),
                showFilter: showFilter,
                displayedFilters: displayedFilters,
                filterValues: filterValues
            }, sanitizeListRestProps(rest)));
        }
    }, {
        key: 'renderForm',
        value: function renderForm() {
            var _props2 = this.props,
                _props2$classes = _props2.classes,
                classes = _props2$classes === undefined ? {} : _props2$classes,
                context = _props2.context,
                debounce = _props2.debounce,
                resource = _props2.resource,
                children = _props2.children,
                hideFilter = _props2.hideFilter,
                displayedFilters = _props2.displayedFilters,
                showFilter = _props2.showFilter,
                filterValues = _props2.filterValues,
                setFilters = _props2.setFilters,
                rest = _objectWithoutProperties(_props2, ['classes', 'context', 'debounce', 'resource', 'children', 'hideFilter', 'displayedFilters', 'showFilter', 'filterValues', 'setFilters']);

            return React.createElement(FilterForm, _extends({
                className: classes.form,
                resource: resource,
                filters: React.Children.toArray(children),
                hideFilter: hideFilter,
                displayedFilters: displayedFilters,
                initialValues: filterValues,
                setFilters: setFilters
            }, sanitizeListRestProps(rest)));
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.context === 'button' ? this.renderButton() : this.renderForm();
        }
    }]);

    return Filter;
}(Component);

Filter.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    context: PropTypes.oneOf(['form', 'button']),
    debounce: PropTypes.number.isRequired,
    displayedFilters: PropTypes.object,
    filterValues: PropTypes.object,
    hideFilter: PropTypes.func,
    setFilters: PropTypes.func,
    showFilter: PropTypes.func,
    resource: PropTypes.string.isRequired
};

Filter.defaultProps = {
    debounce: 500
};

export default withStyles(styles)(Filter);