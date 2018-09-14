import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { addField, FieldTitle } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

export var BooleanInput = function (_Component) {
    _inherits(BooleanInput, _Component);

    function BooleanInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BooleanInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BooleanInput.__proto__ || Object.getPrototypeOf(BooleanInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event, value) {
            _this.props.input.onChange(value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BooleanInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                input = _props.input,
                isRequired = _props.isRequired,
                label = _props.label,
                source = _props.source,
                resource = _props.resource,
                options = _props.options,
                rest = _objectWithoutProperties(_props, ['className', 'input', 'isRequired', 'label', 'source', 'resource', 'options']);

            var value = input.value,
                inputProps = _objectWithoutProperties(input, ['value']);

            return React.createElement(
                FormGroup,
                _extends({ className: className }, sanitizeRestProps(rest)),
                React.createElement(FormControlLabel, {
                    control: React.createElement(Switch, _extends({
                        color: 'primary',
                        checked: !!value,
                        onChange: this.handleChange
                    }, inputProps, options)),
                    label: React.createElement(FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired
                    })
                })
            );
        }
    }]);

    return BooleanInput;
}(Component);

BooleanInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object
};

BooleanInput.defaultProps = {
    options: {}
};

export default addField(BooleanInput);