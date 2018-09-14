import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';

/**
 * Higher-Order Component for getting access to the `translate` function in props.
 *
 * Requires that the app is decorated by the <TranslationPRovider> to inject
 * the translation dictionaries and function in the context.
 *
 * @example
 *     import React from 'react';
 *     import { translate } from 'react-admin';
 *
 *     const MyHelloButton = ({ translate }) => (
 *         <button>{translate('myroot.hello.world')}</button>
 *     );
 *
 *     export default translate(MyHelloButton);
 *
 * @param {*} BaseComponent The component to decorate
 */
var translate = function translate(BaseComponent) {
    var TranslatedComponent = function (_Component) {
        _inherits(TranslatedComponent, _Component);

        function TranslatedComponent() {
            _classCallCheck(this, TranslatedComponent);

            return _possibleConstructorReturn(this, (TranslatedComponent.__proto__ || Object.getPrototypeOf(TranslatedComponent)).apply(this, arguments));
        }

        _createClass(TranslatedComponent, [{
            key: 'render',
            value: function render() {
                var props = _extends({}, this.context, this.props);
                return React.createElement(BaseComponent, props);
            }
        }]);

        return TranslatedComponent;
    }(Component);

    var _ref = BaseComponent.defaultProps || {},
        translate = _ref.translate,
        defaultProps = _objectWithoutProperties(_ref, ['translate']);

    TranslatedComponent.defaultProps = defaultProps;
    TranslatedComponent.contextTypes = {
        translate: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired
    };
    TranslatedComponent.displayName = wrapDisplayName(BaseComponent, 'translate');

    return TranslatedComponent;
};

export default translate;