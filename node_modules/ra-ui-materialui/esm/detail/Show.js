import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import { ShowController } from 'ra-core';

import DefaultActions from './ShowActions';
import TitleForRecord from '../layout/TitleForRecord';
import CardContentInner from '../layout/CardContentInner';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var actions = _ref.actions,
        title = _ref.title,
        children = _ref.children,
        className = _ref.className,
        crudGetOne = _ref.crudGetOne,
        id = _ref.id,
        data = _ref.data,
        isLoading = _ref.isLoading,
        resource = _ref.resource,
        hasCreate = _ref.hasCreate,
        hasEdit = _ref.hasEdit,
        hasList = _ref.hasList,
        hasShow = _ref.hasShow,
        translate = _ref.translate,
        version = _ref.version,
        match = _ref.match,
        location = _ref.location,
        history = _ref.history,
        options = _ref.options,
        locale = _ref.locale,
        permissions = _ref.permissions,
        rest = _objectWithoutProperties(_ref, ['actions', 'title', 'children', 'className', 'crudGetOne', 'id', 'data', 'isLoading', 'resource', 'hasCreate', 'hasEdit', 'hasList', 'hasShow', 'translate', 'version', 'match', 'location', 'history', 'options', 'locale', 'permissions']);

    return rest;
};

var ShowView = function ShowView(_ref2) {
    var actions = _ref2.actions,
        basePath = _ref2.basePath,
        children = _ref2.children,
        className = _ref2.className,
        defaultTitle = _ref2.defaultTitle,
        hasEdit = _ref2.hasEdit,
        hasList = _ref2.hasList,
        isLoading = _ref2.isLoading,
        record = _ref2.record,
        resource = _ref2.resource,
        title = _ref2.title,
        version = _ref2.version,
        rest = _objectWithoutProperties(_ref2, ['actions', 'basePath', 'children', 'className', 'defaultTitle', 'hasEdit', 'hasList', 'isLoading', 'record', 'resource', 'title', 'version']);

    if (typeof actions === 'undefined' && hasEdit) {
        actions = React.createElement(DefaultActions, null);
    }
    return React.createElement(
        'div',
        _extends({
            className: classnames('show-page', className)
        }, sanitizeRestProps(rest)),
        React.createElement(TitleForRecord, {
            title: title,
            record: record,
            defaultTitle: defaultTitle
        }),
        React.createElement(
            Card,
            { style: { opacity: isLoading ? 0.8 : 1 } },
            actions && React.createElement(
                CardContentInner,
                null,
                React.cloneElement(actions, {
                    basePath: basePath,
                    data: record,
                    hasList: hasList,
                    hasEdit: hasEdit,
                    resource: resource
                })
            ),
            record && React.cloneElement(children, {
                resource: resource,
                basePath: basePath,
                record: record,
                version: version
            })
        )
    );
};

export { ShowView };
ShowView.propTypes = {
    actions: PropTypes.element,
    basePath: PropTypes.string,
    children: PropTypes.element,
    className: PropTypes.string,
    defaultTitle: PropTypes.any,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    title: PropTypes.any,
    version: PropTypes.number
};

/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Show>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
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
var Show = function Show(props) {
    return React.createElement(
        ShowController,
        props,
        function (controllerProps) {
            return React.createElement(ShowView, _extends({}, props, controllerProps));
        }
    );
};

Show.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.element,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    id: PropTypes.any.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any
};

export default Show;