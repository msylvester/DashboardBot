import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { isRequired, FieldTitle, withDefaultValue } from 'ra-core';
import { FieldArray } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import sanitizeRestProps from './sanitizeRestProps';

/**
 * To edit arrays of data embedded inside a record, <ArrayInput> creates a list of sub-forms.
 *
 *  @example
 *
 *      import { ArrayInput, SimpleFormIterator, DateInput, UrlInput } from 'react-admin';
 *
 *      <ArrayInput source="backlinks">
 *          <SimpleFormIterator>
 *              <DateInput source="date" />
 *              <UrlInput source="url" />
 *          </SimpleFormIterator>
 *      </ArrayInput>
 *
 * <ArrayInput> allows the edition of embedded arrays, like the backlinks field
 * in the following post record:
 *
 * {
 *   id: 123
 *   backlinks: [
 *         {
 *             date: '2012-08-10T00:00:00.000Z',
 *             url: 'http://example.com/foo/bar.html',
 *         },
 *         {
 *             date: '2012-08-14T00:00:00.000Z',
 *             url: 'https://blog.johndoe.com/2012/08/12/foobar.html',
 *         }
 *    ]
 * }
 *
 * <ArrayInput> expects a single child, which must be a *form iterator* component.
 * A form iterator is a component accepting a fields object
 * as passed by redux-form's <FieldArray> component, and defining a layout for
 * an array of fields. For instance, the <SimpleFormIterator> component
 * displays an array of fields in an unordered list (<ul>), one sub-form by
 * list item (<li>). It also provides controls for adding and removing
 * a sub-record (a backlink in this example).
 *
 * @see https://redux-form.com/7.3.0/examples/fieldarrays/
 */
export var ArrayInput = function (_Component) {
    _inherits(ArrayInput, _Component);

    function ArrayInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ArrayInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArrayInput.__proto__ || Object.getPrototypeOf(ArrayInput)).call.apply(_ref, [this].concat(args))), _this), _this.renderFieldArray = function (fieldProps) {
            var _this$props = _this.props,
                children = _this$props.children,
                record = _this$props.record,
                resource = _this$props.resource,
                source = _this$props.source;

            return cloneElement(children, _extends({}, fieldProps, {
                record: record,
                resource: resource,
                source: source
            }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ArrayInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                defaultValue = _props.defaultValue,
                label = _props.label,
                source = _props.source,
                resource = _props.resource,
                validate = _props.validate,
                rest = _objectWithoutProperties(_props, ['className', 'defaultValue', 'label', 'source', 'resource', 'validate']);

            return React.createElement(
                FormControl,
                _extends({
                    fullWidth: true,
                    margin: 'normal',
                    className: className
                }, sanitizeRestProps(rest)),
                React.createElement(
                    InputLabel,
                    { htmlFor: source, shrink: true },
                    React.createElement(FieldTitle, {
                        label: label,
                        source: source,
                        resource: resource,
                        isRequired: isRequired(validate)
                    })
                ),
                React.createElement(FieldArray, {
                    name: source,
                    defaultValue: defaultValue,
                    component: this.renderFieldArray,
                    validate: validate,
                    isRequired: isRequired(validate)
                })
            );
        }
    }]);

    return ArrayInput;
}(Component);

ArrayInput.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    record: PropTypes.object,
    options: PropTypes.object,
    validate: PropTypes.func
};

ArrayInput.defaultProps = {
    options: {},
    fullWidth: true
};
export default withDefaultValue(ArrayInput);