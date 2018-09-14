import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classnames from 'classnames';
import { EditController } from 'ra-core';

import DefaultActions from './EditActions';
import TitleForRecord from '../layout/TitleForRecord';
import CardContentInner from '../layout/CardContentInner';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var actions = _ref.actions,
        children = _ref.children,
        className = _ref.className,
        crudGetOne = _ref.crudGetOne,
        crudUpdate = _ref.crudUpdate,
        data = _ref.data,
        hasCreate = _ref.hasCreate,
        hasEdit = _ref.hasEdit,
        hasList = _ref.hasList,
        hasShow = _ref.hasShow,
        id = _ref.id,
        isLoading = _ref.isLoading,
        resetForm = _ref.resetForm,
        resource = _ref.resource,
        title = _ref.title,
        translate = _ref.translate,
        version = _ref.version,
        match = _ref.match,
        location = _ref.location,
        history = _ref.history,
        options = _ref.options,
        locale = _ref.locale,
        permissions = _ref.permissions,
        undoable = _ref.undoable,
        rest = _objectWithoutProperties(_ref, ['actions', 'children', 'className', 'crudGetOne', 'crudUpdate', 'data', 'hasCreate', 'hasEdit', 'hasList', 'hasShow', 'id', 'isLoading', 'resetForm', 'resource', 'title', 'translate', 'version', 'match', 'location', 'history', 'options', 'locale', 'permissions', 'undoable']);

    return rest;
};

var EditView = function EditView(_ref2) {
    var actions = _ref2.actions,
        basePath = _ref2.basePath,
        children = _ref2.children,
        className = _ref2.className,
        defaultTitle = _ref2.defaultTitle,
        hasList = _ref2.hasList,
        hasShow = _ref2.hasShow,
        record = _ref2.record,
        redirect = _ref2.redirect,
        resource = _ref2.resource,
        save = _ref2.save,
        title = _ref2.title,
        version = _ref2.version,
        rest = _objectWithoutProperties(_ref2, ['actions', 'basePath', 'children', 'className', 'defaultTitle', 'hasList', 'hasShow', 'record', 'redirect', 'resource', 'save', 'title', 'version']);

    if (typeof actions === 'undefined' && hasShow) {
        actions = React.createElement(DefaultActions, null);
    }
    return React.createElement(
        'div',
        _extends({
            className: classnames('edit-page', className)
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
                    data: record,
                    hasShow: hasShow,
                    hasList: hasList,
                    resource: resource
                })
            ),
            record ? React.cloneElement(children, {
                basePath: basePath,
                record: record,
                redirect: typeof children.props.redirect === 'undefined' ? redirect : children.props.redirect,
                resource: resource,
                save: save,
                version: version
            }) : React.createElement(
                CardContent,
                null,
                '\xA0'
            )
        )
    );
};

export { EditView };
EditView.propTypes = {
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
    title: PropTypes.any,
    version: PropTypes.number
};

/**
 * Page component for the Edit view
 *
 * The `<Edit>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Edit>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Edit, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostEdit = (props) => (
 *         <Edit {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostEdit } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" edit={PostEdit} />
 *         </Admin>
 *     );
 *     export default App;
 */
var Edit = function Edit(props) {
    return React.createElement(
        EditController,
        props,
        function (controllerProps) {
            return React.createElement(EditView, _extends({}, props, controllerProps));
        }
    );
};

Edit.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    hasList: PropTypes.bool,
    id: PropTypes.any.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any
};

export default Edit;