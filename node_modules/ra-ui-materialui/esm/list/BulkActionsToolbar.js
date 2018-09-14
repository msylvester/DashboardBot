import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { translate, sanitizeListRestProps } from 'ra-core';

import CardActions from '../layout/CardActions';

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
            backgroundColor: theme.palette.type === 'light' ? lighten(theme.palette.primary.light, 0.85) : theme.palette.primary.dark,
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
        rest = _objectWithoutProperties(_ref, ['classes', 'basePath', 'filterValues', 'label', 'resource', 'selectedIds', 'translate', 'children']);

    return selectedIds.length > 0 ? React.createElement(
        Toolbar,
        _extends({
            'data-test': 'bulk-actions-toolbar',
            className: classes.toolbar
        }, sanitizeListRestProps(rest)),
        React.createElement(
            'div',
            { className: classes.title },
            React.createElement(
                Typography,
                { color: 'inherit', variant: 'subheading' },
                translate(label, {
                    _: label,
                    smart_count: selectedIds.length
                })
            )
        ),
        React.createElement(
            CardActions,
            null,
            Children.map(children, function (child) {
                return cloneElement(child, {
                    basePath: basePath,
                    filterValues: filterValues,
                    resource: resource,
                    selectedIds: selectedIds
                });
            })
        )
    ) : React.createElement(Toolbar, { className: classes.toolbarCollapsed });
};

BulkActionsToolbar.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    basePath: PropTypes.string,
    filterValues: PropTypes.object,
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    translate: PropTypes.func.isRequired
};

BulkActionsToolbar.defaultProps = {
    label: 'ra.action.bulk_actions'
};

var enhance = compose(translate, withStyles(styles));

export default enhance(BulkActionsToolbar);