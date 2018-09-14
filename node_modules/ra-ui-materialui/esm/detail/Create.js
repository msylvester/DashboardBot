import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import { CreateController } from 'ra-core';

import TitleForRecord from '../layout/TitleForRecord';
import CardContentInner from '../layout/CardContentInner';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var actions = _ref.actions,
        children = _ref.children,
        className = _ref.className,
        crudCreate = _ref.crudCreate,
        isLoading = _ref.isLoading,
        resource = _ref.resource,
        title = _ref.title,
        hasCreate = _ref.hasCreate,
        hasEdit = _ref.hasEdit,
        hasList = _ref.hasList,
        hasShow = _ref.hasShow,
        match = _ref.match,
        location = _ref.location,
        history = _ref.history,
        options = _ref.options,
        locale = _ref.locale,
        permissions = _ref.permissions,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['actions', 'children', 'className', 'crudCreate', 'isLoading', 'resource', 'title', 'hasCreate', 'hasEdit', 'hasList', 'hasShow', 'match', 'location', 'history', 'options', 'locale', 'permissions', 'translate']);

    return rest;
};

var CreateView = function CreateView(_ref2) {
    var actions = _ref2.actions,
        basePath = _ref2.basePath,
        children = _ref2.children,
        className = _ref2.className,
        defaultTitle = _ref2.defaultTitle,
        hasList = _ref2.hasList,
        hasShow = _ref2.hasShow,
        _ref2$record = _ref2.record,
        record = _ref2$record === undefined ? {} : _ref2$record,
        redirect = _ref2.redirect,
        resource = _ref2.resource,
        save = _ref2.save,
        title = _ref2.title,
        rest = _objectWithoutProperties(_ref2, ['actions', 'basePath', 'children', 'className', 'defaultTitle', 'hasList', 'hasShow', 'record', 'redirect', 'resource', 'save', 'title']);

    return React.createElement(
        'div',
        _extends({
            className: classnames('create-page', className)
        }, sanitizeRestProps(rest)),
        React.createElement(TitleForRecord, {
            title: title,
            record: record,
            defaultTitle: defaultTitle
        }),
        React.createElement(
            Card,
            null,
            actions && React.createElement(
                CardContentInner,
                null,
                React.cloneElement(actions, {
                    basePath: basePath,
                    resource: resource,
                    hasList: hasList
                })
            ),
            React.cloneElement(children, {
                basePath: basePath,
                record: record,
                redirect: typeof children.props.redirect === 'undefined' ? redirect : children.props.redirect,
                resource: resource,
                save: save
            })
        )
    );
};

export { CreateView };
CreateView.propTypes = {
    actions: PropTypes.element,
    basePath: PropTypes.string,
    children: PropTypes.element,
    className: PropTypes.string,
    defaultTitle: PropTypes.any,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    resource: PropTypes.string,
    save: PropTypes.func,
    title: PropTypes.any
};

/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Create>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Create, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostCreate = (props) => (
 *         <Create {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Create>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostCreate } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" create={PostCreate} />
 *         </Admin>
 *     );
 *     export default App;
 */
var Create = function Create(props) {
    return React.createElement(
        CreateController,
        props,
        function (controllerProps) {
            return React.createElement(CreateView, _extends({}, props, controllerProps));
        }
    );
};

Create.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.element,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    record: PropTypes.object,
    hasList: PropTypes.bool
};

export default Create;