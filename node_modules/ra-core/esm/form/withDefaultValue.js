import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { initializeForm as initializeFormAction } from '../actions/formActions';

export var DefaultValue = function (_Component) {
    _inherits(DefaultValue, _Component);

    function DefaultValue() {
        _classCallCheck(this, DefaultValue);

        return _possibleConstructorReturn(this, (DefaultValue.__proto__ || Object.getPrototypeOf(DefaultValue)).apply(this, arguments));
    }

    _createClass(DefaultValue, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                defaultValue = _props.defaultValue,
                input = _props.input,
                initializeForm = _props.initializeForm,
                source = _props.source;

            if (typeof defaultValue === 'undefined' || input) {
                return;
            }
            initializeForm(_defineProperty({}, source, typeof defaultValue === 'function' ? defaultValue() : defaultValue));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _props2 = this.props,
                defaultValue = _props2.defaultValue,
                input = _props2.input,
                initializeForm = _props2.initializeForm,
                source = _props2.source;

            if (typeof defaultValue === 'undefined' || input) {
                return;
            }

            if (defaultValue !== prevProps.defaultValue) {
                initializeForm(_defineProperty({}, source, typeof defaultValue === 'function' ? defaultValue() : defaultValue));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                initializeForm = _props3.initializeForm,
                decoratedComponent = _props3.decoratedComponent,
                props = _objectWithoutProperties(_props3, ['initializeForm', 'decoratedComponent']);

            return createElement(decoratedComponent, props);
        }
    }]);

    return DefaultValue;
}(Component);

DefaultValue.propTypes = {
    decoratedComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    defaultValue: PropTypes.any,
    initializeForm: PropTypes.func.isRequired,
    input: PropTypes.object,
    source: PropTypes.string,
    validate: PropTypes.oneOfType([PropTypes.func, PropTypes.array])
};
export default (function (DecoratedComponent) {
    return connect(function () {
        return { decoratedComponent: DecoratedComponent };
    }, { initializeForm: initializeFormAction })(DefaultValue);
});