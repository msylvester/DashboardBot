import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';

import { EditButton } from '../button';
import CardActions from '../layout/CardActions';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        className = _ref.className,
        record = _ref.record,
        hasEdit = _ref.hasEdit,
        hasList = _ref.hasList,
        resource = _ref.resource,
        rest = _objectWithoutProperties(_ref, ['basePath', 'className', 'record', 'hasEdit', 'hasList', 'resource']);

    return rest;
};

/**
 * Action Toolbar for the Show view
 *
 * Internal component. If you want to add or remove actions for a Show view,
 * write your own ShowActions Component. Then, in the <Show> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { CardActions, EditButton, Show } from 'react-admin';
 *
 *     const PostShowActions = ({ basePath, record, resource }) => (
 *         <CardActions>
 *             <EditButton basePath={basePath} record={record} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostShow = (props) => (
 *         <Show actions={<PostShowActions />} {...props}>
 *             ...
 *         </Show>
 *     );
 */
var ShowActions = function ShowActions(_ref2) {
    var basePath = _ref2.basePath,
        className = _ref2.className,
        data = _ref2.data,
        hasEdit = _ref2.hasEdit,
        resource = _ref2.resource,
        rest = _objectWithoutProperties(_ref2, ['basePath', 'className', 'data', 'hasEdit', 'resource']);

    return React.createElement(
        CardActions,
        _extends({ className: className }, sanitizeRestProps(rest)),
        hasEdit && React.createElement(EditButton, { basePath: basePath, record: data })
    );
};

ShowActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.object,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    resource: PropTypes.string
};

export default ShowActions;