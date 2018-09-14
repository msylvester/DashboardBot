import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';

import { ShowButton } from '../button';
import CardActions from '../layout/CardActions';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        className = _ref.className,
        record = _ref.record,
        hasShow = _ref.hasShow,
        hasList = _ref.hasList,
        rest = _objectWithoutProperties(_ref, ['basePath', 'className', 'record', 'hasShow', 'hasList']);

    return rest;
};

/**
 * Action Toolbar for the Edit view
 *
 * Internal component. If you want to add or remove actions for a Edit view,
 * write your own EditActions Component. Then, in the <Edit> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { CardActions, ShowButton, Edit } from 'react-admin';
 *
 *     const PostEditActions = ({ basePath, record, rseource }) => (
 *         <CardActions>
 *             <ShowButton basePath={basePath} record={record} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostEdit = (props) => (
 *         <Edit actions={<PostEditActions />} {...props}>
 *             ...
 *         </Edit>
 *     );
 */
var EditActions = function EditActions(_ref2) {
    var basePath = _ref2.basePath,
        className = _ref2.className,
        data = _ref2.data,
        hasShow = _ref2.hasShow,
        resource = _ref2.resource,
        rest = _objectWithoutProperties(_ref2, ['basePath', 'className', 'data', 'hasShow', 'resource']);

    return React.createElement(
        CardActions,
        _extends({ className: className }, sanitizeRestProps(rest)),
        hasShow && React.createElement(ShowButton, { basePath: basePath, record: data })
    );
};

EditActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.object,
    hasShow: PropTypes.bool,
    resource: PropTypes.string
};

export default EditActions;