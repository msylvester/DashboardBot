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

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _styles = require('@material-ui/core/styles');

var _colorManipulator = require('@material-ui/core/styles/colorManipulator');

var _raCore = require('ra-core');

var _CardActions = require('../layout/CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        toolbar: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            color: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.text.primary,
            justifyContent: 'space-between',
            backgroundColor: theme.palette.type === 'light' ? (0, _colorManipulator.lighten)(theme.palette.primary.light, 0.85) : theme.palette.primary.dark,
            minHeight: 64,
            height: 64,
            transition: theme.transitions.create('height') + ', ' + theme.transitions.create('min-height')
        },
        toolbarCollapsed: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            minHeight: 0,
            height: 0,
            overflowY: 'hidden',
            transition: theme.transitions.create('all')
        },
        title: {
            flex: '0 0 auto'
        }
    };
};

var BulkActionsToolbar = function BulkActionsToolbar(_ref) {
    var classes = _ref.classes,
        basePath = _ref.basePath,
        filterValues = _ref.filterValues,
        label = _ref.label,
        resource = _ref.resource,
        selectedIds = _ref.selectedIds,
        translate = _ref.translate,
        children = _ref.children,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'basePath', 'filterValues', 'label', 'resource', 'selectedIds', 'translate', 'children']);
    return selectedIds.length > 0 ? _react2.default.createElement(
        _Toolbar2.default,
        (0, _extends3.default)({
            'data-test': 'bulk-actions-toolbar',
            className: classes.toolbar
        }, (0, _raCore.sanitizeListRestProps)(rest)),
        _react2.default.createElement(
            'div',
            { className: classes.title },
            _react2.default.createElement(
                _Typography2.default,
                { color: 'inherit', variant: 'subheading' },
                translate(label, {
                    _: label,
                    smart_count: selectedIds.length
                })
            )
        ),
        _react2.default.createElement(
            _CardActions2.default,
            null,
            _react.Children.map(children, function (child) {
                return (0, _react.cloneElement)(child, {
                    basePath: basePath,
                    filterValues: filterValues,
                    resource: resource,
                    selectedIds: selectedIds
                });
            })
        )
    ) : _react2.default.createElement(_Toolbar2.default, { className: classes.toolbarCollapsed });
};

BulkActionsToolbar.propTypes = {
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    basePath: _propTypes2.default.string,
    filterValues: _propTypes2.default.object,
    label: _propTypes2.default.string,
    resource: _propTypes2.default.string,
    selectedIds: _propTypes2.default.array,
    translate: _propTypes2.default.func.isRequired
};

BulkActionsToolbar.defaultProps = {
    label: 'ra.action.bulk_actions'
};

var enhance = (0, _compose2.default)(_raCore.translate, (0, _styles.withStyles)(styles));

exports.default = enhance(BulkActionsToolbar);
module.exports = exports['default'];