'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditView = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Card = require('@material-ui/core/Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _EditActions = require('./EditActions');

var _EditActions2 = _interopRequireDefault(_EditActions);

var _TitleForRecord = require('../layout/TitleForRecord');

var _TitleForRecord2 = _interopRequireDefault(_TitleForRecord);

var _CardContentInner = require('../layout/CardContentInner');

var _CardContentInner2 = _interopRequireDefault(_CardContentInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        rest = (0, _objectWithoutProperties3.default)(_ref, ['actions', 'children', 'className', 'crudGetOne', 'crudUpdate', 'data', 'hasCreate', 'hasEdit', 'hasList', 'hasShow', 'id', 'isLoading', 'resetForm', 'resource', 'title', 'translate', 'version', 'match', 'location', 'history', 'options', 'locale', 'permissions', 'undoable']);
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
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['actions', 'basePath', 'children', 'className', 'defaultTitle', 'hasList', 'hasShow', 'record', 'redirect', 'resource', 'save', 'title', 'version']);

    if (typeof actions === 'undefined' && hasShow) {
        actions = _react2.default.createElement(_EditActions2.default, null);
    }
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
            className: (0, _classnames2.default)('edit-page', className)
        }, sanitizeRestProps(rest)),
        _react2.default.createElement(_TitleForRecord2.default, {
            title: title,
            record: record,
            defaultTitle: defaultTitle
        }),
        _react2.default.createElement(
            _Card2.default,
            null,
            actions && _react2.default.createElement(
                _CardContentInner2.default,
                null,
                _react2.default.cloneElement(actions, {
                    basePath: basePath,
                    data: record,
                    hasShow: hasShow,
                    hasList: hasList,
                    resource: resource
                })
            ),
            record ? _react2.default.cloneElement(children, {
                basePath: basePath,
                record: record,
                redirect: typeof children.props.redirect === 'undefined' ? redirect : children.props.redirect,
                resource: resource,
                save: save,
                version: version
            }) : _react2.default.createElement(
                _CardContent2.default,
                null,
                '\xA0'
            )
        )
    );
};

exports.EditView = EditView;
EditView.propTypes = {
    actions: _propTypes2.default.element,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element,
    className: _propTypes2.default.string,
    defaultTitle: _propTypes2.default.any,
    hasList: _propTypes2.default.bool,
    hasShow: _propTypes2.default.bool,
    record: _propTypes2.default.object,
    redirect: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    resource: _propTypes2.default.string,
    save: _propTypes2.default.func,
    title: _propTypes2.default.any,
    version: _propTypes2.default.number
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
    return _react2.default.createElement(
        _raCore.EditController,
        props,
        function (controllerProps) {
            return _react2.default.createElement(EditView, (0, _extends3.default)({}, props, controllerProps));
        }
    );
};

Edit.propTypes = {
    actions: _propTypes2.default.element,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    hasCreate: _propTypes2.default.bool,
    hasEdit: _propTypes2.default.bool,
    hasShow: _propTypes2.default.bool,
    hasList: _propTypes2.default.bool,
    id: _propTypes2.default.any.isRequired,
    resource: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.any
};

exports.default = Edit;