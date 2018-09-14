'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabbedShowLayout = undefined;

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

var _Tabs = require('@material-ui/core/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _reactRouterDom = require('react-router-dom');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

var _CardContentInner = require('../layout/CardContentInner');

var _CardContentInner2 = _interopRequireDefault(_CardContentInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var children = _ref.children,
        className = _ref.className,
        record = _ref.record,
        resource = _ref.resource,
        basePath = _ref.basePath,
        version = _ref.version,
        initialValues = _ref.initialValues,
        staticContext = _ref.staticContext,
        translate = _ref.translate,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'className', 'record', 'resource', 'basePath', 'version', 'initialValues', 'staticContext', 'translate']);
    return rest;
};

var getTabFullPath = function getTabFullPath(tab, index, baseUrl) {
    return '' + baseUrl + (tab.props.path ? '/' + tab.props.path : index > 0 ? '/' + index : '');
};

/**
 * Tabbed Layout for a Show view, showing fields grouped in tabs.
 *
 * Receives the current `record` from the parent `<Show>` component,
 * and passes it to its childen. Children should be Tab components.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, TabbedShowLayout, Tab, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <TabbedShowLayout>
 *                 <Tab label="Content">
 *                     <TextField source="title" />
 *                     <TextField source="subtitle" />
 *                </Tab>
 *                 <Tab label="Metadata">
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

var TabbedShowLayout = exports.TabbedShowLayout = function (_Component) {
    (0, _inherits3.default)(TabbedShowLayout, _Component);

    function TabbedShowLayout() {
        (0, _classCallCheck3.default)(this, TabbedShowLayout);
        return (0, _possibleConstructorReturn3.default)(this, (TabbedShowLayout.__proto__ || Object.getPrototypeOf(TabbedShowLayout)).apply(this, arguments));
    }

    (0, _createClass3.default)(TabbedShowLayout, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                className = _props.className,
                location = _props.location,
                match = _props.match,
                record = _props.record,
                resource = _props.resource,
                translate = _props.translate,
                version = _props.version,
                value = _props.value,
                rest = (0, _objectWithoutProperties3.default)(_props, ['basePath', 'children', 'className', 'location', 'match', 'record', 'resource', 'translate', 'version', 'value']);


            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({
                    className: className,
                    key: version
                }, sanitizeRestProps(rest)),
                _react2.default.createElement(
                    _Tabs2.default
                    // The location pathname will contain the page path including the current tab path
                    // so we can use it as a way to determine the current tab
                    ,
                    { value: location.pathname,
                        indicatorColor: 'primary'
                    },
                    _react.Children.map(children, function (tab, index) {
                        if (!tab) return null;

                        // Builds the full tab tab which is the concatenation of the last matched route in the
                        // TabbedShowLayout hierarchy (ex: '/posts/create', '/posts/12', , '/posts/12/show')
                        // and the tab path.
                        // This will be used as the Tab's value
                        var tabPath = getTabFullPath(tab, index, match.url);

                        return (0, _react.cloneElement)(tab, {
                            context: 'header',
                            value: tabPath
                        });
                    })
                ),
                _react2.default.createElement(_Divider2.default, null),
                _react2.default.createElement(
                    _CardContentInner2.default,
                    null,
                    _react.Children.map(children, function (tab, index) {
                        return tab && _react2.default.createElement(_reactRouterDom.Route, {
                            exact: true,
                            path: getTabFullPath(tab, index, match.url),
                            render: function render() {
                                return (0, _react.cloneElement)(tab, {
                                    context: 'content',
                                    resource: resource,
                                    record: record,
                                    basePath: basePath
                                });
                            }
                        });
                    })
                )
            );
        }
    }]);
    return TabbedShowLayout;
}(_react.Component);

TabbedShowLayout.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    location: _propTypes2.default.object,
    match: _propTypes2.default.object,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    basePath: _propTypes2.default.string,
    value: _propTypes2.default.number,
    version: _propTypes2.default.number,
    translate: _propTypes2.default.func
};

var enhance = (0, _compose2.default)(_reactRouterDom.withRouter, _raCore.translate);

exports.default = enhance(TabbedShowLayout);