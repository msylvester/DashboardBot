'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SimpleShowLayout = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CardContentInner = require('../layout/CardContentInner');

var _CardContentInner2 = _interopRequireDefault(_CardContentInner);

var _Labeled = require('../input/Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var children = _ref.children,
        className = _ref.className,
        record = _ref.record,
        resource = _ref.resource,
        basePath = _ref.basePath,
        version = _ref.version,
        initialValues = _ref.initialValues,
        translate = _ref.translate,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'className', 'record', 'resource', 'basePath', 'version', 'initialValues', 'translate']);
    return rest;
};

/**
 * Simple Layout for a Show view, showing fields in one column.
 *
 * Receives the current `record` from the parent `<Show>` component,
 * and passes it to its childen. Children should be Field-like components.
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
var SimpleShowLayout = function SimpleShowLayout(_ref2) {
    var basePath = _ref2.basePath,
        className = _ref2.className,
        children = _ref2.children,
        record = _ref2.record,
        resource = _ref2.resource,
        version = _ref2.version,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['basePath', 'className', 'children', 'record', 'resource', 'version']);
    return _react2.default.createElement(
        _CardContentInner2.default,
        (0, _extends3.default)({
            className: className,
            key: version
        }, sanitizeRestProps(rest)),
        _react.Children.map(children, function (field) {
            return field ? _react2.default.createElement(
                'div',
                {
                    key: field.props.source,
                    className: (0, _classnames2.default)('ra-field ra-field-' + field.props.source, field.props.className)
                },
                field.props.addLabel ? _react2.default.createElement(
                    _Labeled2.default,
                    {
                        record: record,
                        resource: resource,
                        basePath: basePath,
                        label: field.props.label,
                        source: field.props.source,
                        disabled: false
                    },
                    field
                ) : typeof field.type === 'string' ? field : _react2.default.cloneElement(field, {
                    record: record,
                    resource: resource,
                    basePath: basePath
                })
            ) : null;
        })
    );
};

exports.SimpleShowLayout = SimpleShowLayout;
SimpleShowLayout.propTypes = {
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    version: _propTypes2.default.number
};

exports.default = SimpleShowLayout;