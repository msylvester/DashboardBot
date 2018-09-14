'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShowView = undefined;

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

var _ShowActions = require('./ShowActions');

var _ShowActions2 = _interopRequireDefault(_ShowActions);

var _TitleForRecord = require('../layout/TitleForRecord');

var _TitleForRecord2 = _interopRequireDefault(_TitleForRecord);

var _CardContentInner = require('../layout/CardContentInner');

var _CardContentInner2 = _interopRequireDefault(_CardContentInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        rest = (0, _objectWithoutProperties3.default)(_ref, ['actions', 'title', 'children', 'className', 'crudGetOne', 'id', 'data', 'isLoading', 'resource', 'hasCreate', 'hasEdit', 'hasList', 'hasShow', 'translate', 'version', 'match', 'location', 'history', 'options', 'locale', 'permissions']);
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
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['actions', 'basePath', 'children', 'className', 'defaultTitle', 'hasEdit', 'hasList', 'isLoading', 'record', 'resource', 'title', 'version']);

    if (typeof actions === 'undefined' && hasEdit) {
        actions = _react2.default.createElement(_ShowActions2.default, null);
    }
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
            className: (0, _classnames2.default)('show-page', className)
        }, sanitizeRestProps(rest)),
        _react2.default.createElement(_TitleForRecord2.default, {
            title: title,
            record: record,
            defaultTitle: defaultTitle
        }),
        _react2.default.createElement(
            _Card2.default,
            { style: { opacity: isLoading ? 0.8 : 1 } },
            actions && _react2.default.createElement(
                _CardContentInner2.default,
                null,
                _react2.default.cloneElement(actions, {
                    basePath: basePath,
                    data: record,
                    hasList: hasList,
                    hasEdit: hasEdit,
                    resource: resource
                })
            ),
            record && _react2.default.cloneElement(children, {
                resource: resource,
                basePath: basePath,
                record: record,
                version: version
            })
        )
    );
};

exports.ShowView = ShowView;
ShowView.propTypes = {
    actions: _propTypes2.default.element,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element,
    className: _propTypes2.default.string,
    defaultTitle: _propTypes2.default.any,
    hasEdit: _propTypes2.default.bool,
    hasList: _propTypes2.default.bool,
    isLoading: _propTypes2.default.bool,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    title: _propTypes2.default.any,
    version: _propTypes2.default.number
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
    return _react2.default.createElement(
        _raCore.ShowController,
        props,
        function (controllerProps) {
            return _react2.default.createElement(ShowView, (0, _extends3.default)({}, props, controllerProps));
        }
    );
};

Show.propTypes = {
    actions: _propTypes2.default.element,
    children: _propTypes2.default.element,
    className: _propTypes2.default.string,
    hasCreate: _propTypes2.default.bool,
    hasEdit: _propTypes2.default.bool,
    hasList: _propTypes2.default.bool,
    hasShow: _propTypes2.default.bool,
    id: _propTypes2.default.any.isRequired,
    resource: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.any
};

exports.default = Show;