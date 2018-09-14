'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _Tab = require('@material-ui/core/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _raCore = require('ra-core');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Labeled = require('../input/Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var label = _ref.label,
        icon = _ref.icon,
        value = _ref.value,
        translate = _ref.translate,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['label', 'icon', 'value', 'translate']);
    return rest;
};

/**
 * Tab element for the SimpleShowLayout.
 *
 * The `<Tab>` component accepts the following props:
 *
 * - label: The string displayed for each tab
 * - icon: The icon to show before the label (optional). Must be an element.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import FavoriteIcon from '@material-ui/icons/Favorite';
 *     import PersonPinIcon from '@material-ui/icons/PersonPin';
 *     import { Show, TabbedShowLayout, Tab, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <TabbedShowLayout>
 *                 <Tab label="Content" icon={<FavoriteIcon />}>
 *                     <TextField source="title" />
 *                     <TextField source="subtitle" />
 *                </Tab>
 *                 <Tab label="Metadata" icon={<PersonIcon />}>
 *                     <TextField source="category" />
 *                </Tab>
 *             </TabbedShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */

var Tab = function (_Component) {
    (0, _inherits3.default)(Tab, _Component);

    function Tab() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Tab);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref2, [this].concat(args))), _this), _this.renderHeader = function (_ref3) {
            var className = _ref3.className,
                label = _ref3.label,
                icon = _ref3.icon,
                value = _ref3.value,
                translate = _ref3.translate,
                rest = (0, _objectWithoutProperties3.default)(_ref3, ['className', 'label', 'icon', 'value', 'translate']);
            return _react2.default.createElement(_Tab2.default, (0, _extends3.default)({
                key: label,
                label: translate(label, { _: label }),
                value: value,
                icon: icon,
                className: (0, _classnames2.default)('show-tab', className),
                component: _reactRouterDom.Link,
                to: value
            }, sanitizeRestProps(rest)));
        }, _this.renderContent = function (_ref4) {
            var className = _ref4.className,
                children = _ref4.children,
                rest = (0, _objectWithoutProperties3.default)(_ref4, ['className', 'children']);
            return _react2.default.createElement(
                'span',
                { className: className },
                _react2.default.Children.map(children, function (field) {
                    return field && _react2.default.createElement(
                        'div',
                        {
                            key: field.props.source,
                            className: (0, _classnames2.default)('ra-field', 'ra-field-' + field.props.source, field.props.className)
                        },
                        field.props.addLabel ? _react2.default.createElement(
                            _Labeled2.default,
                            (0, _extends3.default)({
                                label: field.props.label,
                                source: field.props.source
                            }, sanitizeRestProps(rest)),
                            field
                        ) : typeof field.type === 'string' ? field : _react2.default.cloneElement(field, sanitizeRestProps(rest))
                    );
                })
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Tab, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                context = _props.context,
                rest = (0, _objectWithoutProperties3.default)(_props, ['children', 'context']);

            return context === 'header' ? this.renderHeader(rest) : this.renderContent((0, _extends3.default)({ children: children }, rest));
        }
    }]);
    return Tab;
}(_react.Component);

Tab.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    context: _propTypes2.default.oneOf(['header', 'content']),
    icon: _propTypes2.default.element,
    label: _propTypes2.default.string.isRequired,
    translate: _propTypes2.default.func.isRequired,
    value: _propTypes2.default.string
};

exports.default = (0, _raCore.translate)(Tab);
module.exports = exports['default'];