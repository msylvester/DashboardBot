import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { FieldTitle } from 'ra-core';

var FilterButtonMenuItem = function (_Component) {
    _inherits(FilterButtonMenuItem, _Component);

    function FilterButtonMenuItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FilterButtonMenuItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilterButtonMenuItem.__proto__ || Object.getPrototypeOf(FilterButtonMenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleShow = function () {
            var _this$props = _this.props,
                filter = _this$props.filter,
                onShow = _this$props.onShow;

            onShow({ source: filter.source, defaultValue: filter.defaultValue });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FilterButtonMenuItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                filter = _props.filter,
                resource = _props.resource;


            return React.createElement(
                MenuItem,
                {
                    className: 'new-filter-item',
                    'data-key': filter.source,
                    'data-default-value': filter.defaultValue,
                    key: filter.source,
                    onClick: this.handleShow
                },
                React.createElement(FieldTitle, {
                    label: filter.label,
                    source: filter.source,
                    resource: resource
                })
            );
        }
    }]);

    return FilterButtonMenuItem;
}(Component);

FilterButtonMenuItem.propTypes = {
    filter: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired
};


export default FilterButtonMenuItem;