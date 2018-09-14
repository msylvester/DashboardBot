import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { addField, translate, FieldTitle } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

var styles = function styles(theme) {
    return {
        input: { width: theme.spacing.unit * 16 }
    };
};

export var NullableBooleanInput = function (_Component) {
    _inherits(NullableBooleanInput, _Component);

    function NullableBooleanInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NullableBooleanInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NullableBooleanInput.__proto__ || Object.getPrototypeOf(NullableBooleanInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            value: _this.props.input.value
        }, _this.handleChange = function (event) {
            _this.props.input.onChange(_this.getBooleanFromString(event.target.value));
            _this.setState({ value: event.target.value });
        }, _this.getBooleanFromString = function (value) {
            if (value === 'true') return true;
            if (value === 'false') return false;
            return null;
        }, _this.getStringFromBoolean = function (value) {
            if (value === true) return 'true';
            if (value === false) return 'false';
            return '';
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NullableBooleanInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.input.value !== this.props.input.value) {
                this.setState({ value: nextProps.input.value });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                className = _props.className,
                isRequired = _props.isRequired,
                label = _props.label,
                meta = _props.meta,
                options = _props.options,
                resource = _props.resource,
                source = _props.source,
                translate = _props.translate,
                rest = _objectWithoutProperties(_props, ['classes', 'className', 'isRequired', 'label', 'meta', 'options', 'resource', 'source', 'translate']);

            var touched = meta.touched,
                error = meta.error;

            return React.createElement(
                TextField,
                _extends({
                    select: true,
                    margin: 'normal',
                    value: this.getStringFromBoolean(this.state.value),
                    label: React.createElement(FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired
                    }),
                    error: !!(touched && error),
                    helperText: touched && error,
                    className: classnames(classes.input, className)
                }, options, sanitizeRestProps(rest), {
                    onChange: this.handleChange
                }),
                React.createElement(MenuItem, { value: '' }),
                React.createElement(
                    MenuItem,
                    { value: 'false' },
                    translate('ra.boolean.false')
                ),
                React.createElement(
                    MenuItem,
                    { value: 'true' },
                    translate('ra.boolean.true')
                )
            );
        }
    }]);

    return NullableBooleanInput;
}(Component);

NullableBooleanInput.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired
};

var enhance = compose(addField, translate, withStyles(styles));

export default enhance(NullableBooleanInput);