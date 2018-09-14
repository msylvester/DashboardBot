import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiTab from '@material-ui/core/Tab';
import { translate } from 'ra-core';
import classnames from 'classnames';

import Labeled from '../input/Labeled';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var label = _ref.label,
        icon = _ref.icon,
        value = _ref.value,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['label', 'icon', 'value', 'translate']);

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
    _inherits(Tab, _Component);

    function Tab() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, Tab);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref2, [this].concat(args))), _this), _this.renderHeader = function (_ref3) {
            var className = _ref3.className,
                label = _ref3.label,
                icon = _ref3.icon,
                value = _ref3.value,
                translate = _ref3.translate,
                rest = _objectWithoutProperties(_ref3, ['className', 'label', 'icon', 'value', 'translate']);

            return React.createElement(MuiTab, _extends({
                key: label,
                label: translate(label, { _: label }),
                value: value,
                icon: icon,
                className: classnames('show-tab', className),
                component: Link,
                to: value
            }, sanitizeRestProps(rest)));
        }, _this.renderContent = function (_ref4) {
            var className = _ref4.className,
                children = _ref4.children,
                rest = _objectWithoutProperties(_ref4, ['className', 'children']);

            return React.createElement(
                'span',
                { className: className },
                React.Children.map(children, function (field) {
                    return field && React.createElement(
                        'div',
                        {
                            key: field.props.source,
                            className: classnames('ra-field', 'ra-field-' + field.props.source, field.props.className)
                        },
                        field.props.addLabel ? React.createElement(
                            Labeled,
                            _extends({
                                label: field.props.label,
                                source: field.props.source
                            }, sanitizeRestProps(rest)),
                            field
                        ) : typeof field.type === 'string' ? field : React.cloneElement(field, sanitizeRestProps(rest))
                    );
                })
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tab, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                context = _props.context,
                rest = _objectWithoutProperties(_props, ['children', 'context']);

            return context === 'header' ? this.renderHeader(rest) : this.renderContent(_extends({ children: children }, rest));
        }
    }]);

    return Tab;
}(Component);

Tab.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    context: PropTypes.oneOf(['header', 'content']),
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default translate(Tab);