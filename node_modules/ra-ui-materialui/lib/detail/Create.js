'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CreateView = undefined;

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _TitleForRecord = require('../layout/TitleForRecord');

var _TitleForRecord2 = _interopRequireDefault(_TitleForRecord);

var _CardContentInner = require('../layout/CardContentInner');

var _CardContentInner2 = _interopRequireDefault(_CardContentInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        rest = (0, _objectWithoutProperties3.default)(_ref, ['actions', 'children', 'className', 'crudCreate', 'isLoading', 'resource', 'title', 'hasCreate', 'hasEdit', 'hasList', 'hasShow', 'match', 'location', 'history', 'options', 'locale', 'permissions', 'translate']);
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
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['actions', 'basePath', 'children', 'className', 'defaultTitle', 'hasList', 'hasShow', 'record', 'redirect', 'resource', 'save', 'title']);
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
            className: (0, _classnames2.default)('create-page', className)
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
                    resource: resource,
                    hasList: hasList
                })
            ),
            _react2.default.cloneElement(children, {
                basePath: basePath,
                record: record,
                redirect: typeof children.props.redirect === 'undefined' ? redirect : children.props.redirect,
                resource: resource,
                save: save
            })
        )
    );
};

exports.CreateView = CreateView;
CreateView.propTypes = {
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
    title: _propTypes2.default.any
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
    return _react2.default.createElement(
        _raCore.CreateController,
        props,
        function (controllerProps) {
            return _react2.default.createElement(CreateView, (0, _extends3.default)({}, props, controllerProps));
        }
    );
};

Create.propTypes = {
    actions: _propTypes2.default.element,
    children: _propTypes2.default.element,
    className: _propTypes2.default.string,
    hasCreate: _propTypes2.default.bool,
    hasEdit: _propTypes2.default.bool,
    hasShow: _propTypes2.default.bool,
    resource: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.any,
    record: _propTypes2.default.object,
    hasList: _propTypes2.default.bool
};

exports.default = Create;