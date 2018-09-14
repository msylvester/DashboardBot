import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import { withRouter, Route } from 'react-router-dom';
import compose from 'recompose/compose';
import { translate } from 'ra-core';

import CardContentInner from '../layout/CardContentInner';

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
        rest = _objectWithoutProperties(_ref, ['children', 'className', 'record', 'resource', 'basePath', 'version', 'initialValues', 'staticContext', 'translate']);

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
export var TabbedShowLayout = function (_Component) {
    _inherits(TabbedShowLayout, _Component);

    function TabbedShowLayout() {
        _classCallCheck(this, TabbedShowLayout);

        return _possibleConstructorReturn(this, (TabbedShowLayout.__proto__ || Object.getPrototypeOf(TabbedShowLayout)).apply(this, arguments));
    }

    _createClass(TabbedShowLayout, [{
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
                rest = _objectWithoutProperties(_props, ['basePath', 'children', 'className', 'location', 'match', 'record', 'resource', 'translate', 'version', 'value']);

            return React.createElement(
                'div',
                _extends({
                    className: className,
                    key: version
                }, sanitizeRestProps(rest)),
                React.createElement(
                    Tabs
                    // The location pathname will contain the page path including the current tab path
                    // so we can use it as a way to determine the current tab
                    ,
                    { value: location.pathname,
                        indicatorColor: 'primary'
                    },
                    Children.map(children, function (tab, index) {
                        if (!tab) return null;

                        // Builds the full tab tab which is the concatenation of the last matched route in the
                        // TabbedShowLayout hierarchy (ex: '/posts/create', '/posts/12', , '/posts/12/show')
                        // and the tab path.
                        // This will be used as the Tab's value
                        var tabPath = getTabFullPath(tab, index, match.url);

                        return cloneElement(tab, {
                            context: 'header',
                            value: tabPath
                        });
                    })
                ),
                React.createElement(Divider, null),
                React.createElement(
                    CardContentInner,
                    null,
                    Children.map(children, function (tab, index) {
                        return tab && React.createElement(Route, {
                            exact: true,
                            path: getTabFullPath(tab, index, match.url),
                            render: function render() {
                                return cloneElement(tab, {
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
}(Component);

TabbedShowLayout.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    location: PropTypes.object,
    match: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    basePath: PropTypes.string,
    value: PropTypes.number,
    version: PropTypes.number,
    translate: PropTypes.func
};

var enhance = compose(withRouter, translate);

export default enhance(TabbedShowLayout);