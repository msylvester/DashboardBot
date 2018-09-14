import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { linkToRecord, sanitizeListRestProps } from 'ra-core';

var styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    tertiary: { float: 'right', opacity: 0.541176 }
};

var LinkOrNot = withStyles(styles)(function (_ref) {
    var classes = _ref.classes,
        linkType = _ref.linkType,
        basePath = _ref.basePath,
        id = _ref.id,
        children = _ref.children;
    return linkType === 'edit' || linkType === true ? React.createElement(
        Link,
        { to: linkToRecord(basePath, id), className: classes.link },
        children
    ) : linkType === 'show' ? React.createElement(
        Link,
        {
            to: linkToRecord(basePath, id) + '/show',
            className: classes.link
        },
        children
    ) : React.createElement(
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
        rest = _objectWithoutProperties(_ref2, ['basePath', 'classes', 'className', 'data', 'hasBulkActions', 'ids', 'isLoading', 'leftAvatar', 'leftIcon', 'linkType', 'onToggleItem', 'primaryText', 'rightAvatar', 'rightIcon', 'secondaryText', 'selectedIds', 'tertiaryText', 'total']);

    return (isLoading || total > 0) && React.createElement(
        List,
        _extends({ className: className }, sanitizeListRestProps(rest)),
        ids.map(function (id) {
            return React.createElement(
                LinkOrNot,
                {
                    linkType: linkType,
                    basePath: basePath,
                    id: id,
                    key: id
                },
                React.createElement(
                    ListItem,
                    { button: true },
                    leftIcon && React.createElement(
                        ListItemIcon,
                        null,
                        leftIcon(data[id], id)
                    ),
                    leftAvatar && React.createElement(
                        ListItemAvatar,
                        null,
                        React.createElement(
                            Avatar,
                            null,
                            leftAvatar(data[id], id)
                        )
                    ),
                    React.createElement(ListItemText, {
                        primary: React.createElement(
                            'div',
                            null,
                            primaryText(data[id], id),
                            tertiaryText && React.createElement(
                                'span',
                                { className: classes.tertiary },
                                tertiaryText(data[id], id)
                            )
                        ),
                        secondary: secondaryText && secondaryText(data[id], id)
                    }),
                    (rightAvatar || rightIcon) && React.createElement(
                        ListItemSecondaryAction,
                        null,
                        rightAvatar && React.createElement(
                            Avatar,
                            null,
                            rightAvatar(data[id], id)
                        ),
                        rightIcon && React.createElement(
                            ListItemIcon,
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
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.object,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    leftAvatar: PropTypes.func,
    leftIcon: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onToggleItem: PropTypes.func.isRequired,
    primaryText: PropTypes.func,
    rightAvatar: PropTypes.func,
    rightIcon: PropTypes.func,
    secondaryText: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    tertiaryText: PropTypes.func
};

SimpleList.defaultProps = {
    linkType: 'edit',
    hasBulkActions: false,
    selectedIds: []
};

export default withStyles(styles)(SimpleList);