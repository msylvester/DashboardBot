'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CardActions = require('../layout/CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

var _button = require('../button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        className = _ref.className,
        hasList = _ref.hasList,
        resource = _ref.resource,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'className', 'hasList', 'resource']);
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
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['basePath', 'className', 'hasList']);
    return _react2.default.createElement(
        _CardActions2.default,
        (0, _extends3.default)({ className: className }, sanitizeRestProps(rest)),
        hasList && _react2.default.createElement(_button.ListButton, { basePath: basePath })
    );
};

CreateActions.propTypes = {
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    hasList: _propTypes2.default.bool
};

exports.default = CreateActions;
module.exports = exports['default'];