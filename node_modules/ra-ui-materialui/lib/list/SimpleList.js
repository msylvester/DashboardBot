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

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemAvatar = require('@material-ui/core/ListItemAvatar');

var _ListItemAvatar2 = _interopRequireDefault(_ListItemAvatar);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction');

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _styles = require('@material-ui/core/styles');

var _reactRouterDom = require('react-router-dom');

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    tertiary: { float: 'right', opacity: 0.541176 }
};

var LinkOrNot = (0, _styles.withStyles)(styles)(function (_ref) {
    var classes = _ref.classes,
        linkType = _ref.linkType,
        basePath = _ref.basePath,
        id = _ref.id,
        children = _ref.children;
    return linkType === 'edit' || linkType === true ? _react2.default.createElement(
        _reactRouterDom.Link,
        { to: (0, _raCore.linkToRecord)(basePath, id), className: classes.link },
        children
    ) : linkType === 'show' ? _react2.default.createElement(
        _reactRouterDom.Link,
        {
            to: (0, _raCore.linkToRecord)(basePath, id) + '/show',
            className: classes.link
        },
        children
    ) : _react2.default.createElement(
        'span',
        null,
        children
    );
});

var SimpleList = function SimpleList(_ref2) {
    var basePath = _ref2.basePath,
        _ref2$classes = _ref2.classes,
        classes = _ref2$classes === undefined ? {} : _ref2$classes,
        className = _ref2.className,
        data = _ref2.data,
        hasBulkActions = _ref2.hasBulkActions,
        ids = _ref2.ids,
        isLoading = _ref2.isLoading,
        leftAvatar = _ref2.leftAvatar,
        leftIcon = _ref2.leftIcon,
        linkType = _ref2.linkType,
        onToggleItem = _ref2.onToggleItem,
        primaryText = _ref2.primaryText,
        rightAvatar = _ref2.rightAvatar,
        rightIcon = _ref2.rightIcon,
        secondaryText = _ref2.secondaryText,
        selectedIds = _ref2.selectedIds,
        tertiaryText = _ref2.tertiaryText,
        total = _ref2.total,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['basePath', 'classes', 'className', 'data', 'hasBulkActions', 'ids', 'isLoading', 'leftAvatar', 'leftIcon', 'linkType', 'onToggleItem', 'primaryText', 'rightAvatar', 'rightIcon', 'secondaryText', 'selectedIds', 'tertiaryText', 'total']);
    return (isLoading || total > 0) && _react2.default.createElement(
        _List2.default,
        (0, _extends3.default)({ className: className }, (0, _raCore.sanitizeListRestProps)(rest)),
        ids.map(function (id) {
            return _react2.default.createElement(
                LinkOrNot,
                {
                    linkType: linkType,
                    basePath: basePath,
                    id: id,
                    key: id
                },
                _react2.default.createElement(
                    _ListItem2.default,
                    { button: true },
                    leftIcon && _react2.default.createElement(
                        _ListItemIcon2.default,
                        null,
                        leftIcon(data[id], id)
                    ),
                    leftAvatar && _react2.default.createElement(
                        _ListItemAvatar2.default,
                        null,
                        _react2.default.createElement(
                            _Avatar2.default,
                            null,
                            leftAvatar(data[id], id)
                        )
                    ),
                    _react2.default.createElement(_ListItemText2.default, {
                        primary: _react2.default.createElement(
                            'div',
                            null,
                            primaryText(data[id], id),
                            tertiaryText && _react2.default.createElement(
                                'span',
                                { className: classes.tertiary },
                                tertiaryText(data[id], id)
                            )
                        ),
                        secondary: secondaryText && secondaryText(data[id], id)
                    }),
                    (rightAvatar || rightIcon) && _react2.default.createElement(
                        _ListItemSecondaryAction2.default,
                        null,
                        rightAvatar && _react2.default.createElement(
                            _Avatar2.default,
                            null,
                            rightAvatar(data[id], id)
                        ),
                        rightIcon && _react2.default.createElement(
                            _ListItemIcon2.default,
                            null,
                            rightIcon(data[id], id)
                        )
                    )
                )
            );
        })
    );
};

SimpleList.propTypes = {
    basePath: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    hasBulkActions: _propTypes2.default.bool.isRequired,
    ids: _propTypes2.default.array,
    leftAvatar: _propTypes2.default.func,
    leftIcon: _propTypes2.default.func,
    linkType: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]).isRequired,
    onToggleItem: _propTypes2.default.func.isRequired,
    primaryText: _propTypes2.default.func,
    rightAvatar: _propTypes2.default.func,
    rightIcon: _propTypes2.default.func,
    secondaryText: _propTypes2.default.func,
    selectedIds: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    tertiaryText: _propTypes2.default.func
};

SimpleList.defaultProps = {
    linkType: 'edit',
    hasBulkActions: false,
    selectedIds: []
};

exports.default = (0, _styles.withStyles)(styles)(SimpleList);
module.exports = exports['default'];