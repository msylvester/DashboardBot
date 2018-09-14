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

var _button = require('../button');

var _CardActions = require('../layout/CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        className = _ref.className,
        record = _ref.record,
        hasEdit = _ref.hasEdit,
        hasList = _ref.hasList,
        resource = _ref.resource,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'className', 'record', 'hasEdit', 'hasList', 'resource']);
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
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['basePath', 'className', 'data', 'hasEdit', 'resource']);
    return _react2.default.createElement(
        _CardActions2.default,
        (0, _extends3.default)({ className: className }, sanitizeRestProps(rest)),
        hasEdit && _react2.default.createElement(_button.EditButton, { basePath: basePath, record: data })
    );
};

ShowActions.propTypes = {
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    hasEdit: _propTypes2.default.bool,
    hasList: _propTypes2.default.bool,
    resource: _propTypes2.default.string
};

exports.default = ShowActions;
module.exports = exports['default'];