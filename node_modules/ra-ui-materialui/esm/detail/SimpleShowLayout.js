import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CardContentInner from '../layout/CardContentInner';
import Labeled from '../input/Labeled';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var children = _ref.children,
        className = _ref.className,
        record = _ref.record,
        resource = _ref.resource,
        basePath = _ref.basePath,
        version = _ref.version,
        initialValues = _ref.initialValues,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['children', 'className', 'record', 'resource', 'basePath', 'version', 'initialValues', 'translate']);

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
        rest = _objectWithoutProperties(_ref2, ['basePath', 'className', 'children', 'record', 'resource', 'version']);

    return React.createElement(
        CardContentInner,
        _extends({
            className: className,
            key: version
        }, sanitizeRestProps(rest)),
        Children.map(children, function (field) {
            return field ? React.createElement(
                'div',
                {
                    key: field.props.source,
                    className: classnames('ra-field ra-field-' + field.props.source, field.props.className)
                },
                field.props.addLabel ? React.createElement(
                    Labeled,
                    {
                        record: record,
                        resource: resource,
                        basePath: basePath,
                        label: field.props.label,
                        source: field.props.source,
                        disabled: false
                    },
                    field
                ) : typeof field.type === 'string' ? field : React.cloneElement(field, {
                    record: record,
                    resource: resource,
                    basePath: basePath
                })
            ) : null;
        })
    );
};

export { SimpleShowLayout };
SimpleShowLayout.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    record: PropTypes.object,
    resource: PropTypes.string,
    version: PropTypes.number
};

export default SimpleShowLayout;