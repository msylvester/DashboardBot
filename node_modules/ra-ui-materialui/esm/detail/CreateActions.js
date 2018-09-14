import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';

import CardActions from '../layout/CardActions';
import { ListButton } from '../button';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        className = _ref.className,
        hasList = _ref.hasList,
        resource = _ref.resource,
        rest = _objectWithoutProperties(_ref, ['basePath', 'className', 'hasList', 'resource']);

    return rest;
};

/**
 * Action Toolbar for the Create view
 *
 * Internal component. If you want to add or remove actions for a Create view,
 * write your own CreateActions Component. Then, in the <Create> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { CardActions, Create, ListButton } from 'react-admin';
 *
 *     const PostCreateActions = ({ basePath }) => (
 *         <CardActions>
 *             <ListButton basePath={basePath} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostCreate = (props) => (
 *         <Create actions={<PostCreateActions />} {...props}>
 *             ...
 *         </Create>
 *     );
 */
var CreateActions = function CreateActions(_ref2) {
    var basePath = _ref2.basePath,
        className = _ref2.className,
        hasList = _ref2.hasList,
        rest = _objectWithoutProperties(_ref2, ['basePath', 'className', 'hasList']);

    return React.createElement(
        CardActions,
        _extends({ className: className }, sanitizeRestProps(rest)),
        hasList && React.createElement(ListButton, { basePath: basePath })
    );
};

CreateActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    hasList: PropTypes.bool
};

export default CreateActions;