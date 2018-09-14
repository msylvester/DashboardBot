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
        hasShow = _ref.hasShow,
        hasList = _ref.hasList,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'className', 'record', 'hasShow', 'hasList']);
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
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['basePath', 'className', 'data', 'hasShow', 'resource']);
    return _react2.default.createElement(
        _CardActions2.default,
        (0, _extends3.default)({ className: className }, sanitizeRestProps(rest)),
        hasShow && _react2.default.createElement(_button.ShowButton, { basePath: basePath, record: data })
    );
};

EditActions.propTypes = {
    basePath: _propTypes2.default.string,
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    hasShow: _propTypes2.default.bool,
    resource: _propTypes2.default.string
};

exports.default = EditActions;
module.exports = exports['default'];