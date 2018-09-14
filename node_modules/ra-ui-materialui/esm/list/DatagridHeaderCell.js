import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shouldUpdate from 'recompose/shouldUpdate';
import compose from 'recompose/compose';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { FieldTitle, translate } from 'ra-core';

// remove the sort icons when not active
var styles = {
    icon: {
        display: 'none'
    },
    active: {
        '& $icon': {
            display: 'inline'
        }
    }
};

var DatagridHeaderCell = function DatagridHeaderCell(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        field = _ref.field,
        currentSort = _ref.currentSort,
        updateSort = _ref.updateSort,
        resource = _ref.resource,
        isSorting = _ref.isSorting,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'field', 'currentSort', 'updateSort', 'resource', 'isSorting', 'translate']);

    return React.createElement(
        TableCell,
        _extends({
            className: classnames(className, field.props.headerClassName),
            numeric: field.props.textAlign === 'right',
            padding: 'none',
            variant: 'head'
        }, rest),
        field.props.sortable !== false && (field.props.sortBy || field.props.source) ? React.createElement(
            Tooltip,
            {
                title: translate('ra.action.sort'),
                placement: field.props.textAlign === 'right' ? 'bottom-end' : 'bottom-start',
                enterDelay: 300
            },
            React.createElement(
                TableSortLabel,
                {
                    active: currentSort.field === (field.props.sortBy || field.props.source),
                    direction: currentSort.order === 'ASC' ? 'asc' : 'desc',
                    'data-sort': field.props.sortBy || field.props.source,
                    onClick: updateSort,
                    classes: classes
                },
                React.createElement(FieldTitle, {
                    label: field.props.label,
                    source: field.props.source,
                    resource: resource
                })
            )
        ) : React.createElement(FieldTitle, {
            label: field.props.label,
            source: field.props.source,
            resource: resource
        })
    );
};

export { DatagridHeaderCell };
DatagridHeaderCell.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    field: PropTypes.element,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string
    }).isRequired,
    isSorting: PropTypes.bool,
    sortable: PropTypes.bool,
    resource: PropTypes.string,
    translate: PropTypes.func.isRequired,
    updateSort: PropTypes.func.isRequired
};

var enhance = compose(shouldUpdate(function (props, nextProps) {
    return props.isSorting !== nextProps.isSorting || nextProps.isSorting && props.currentSort.order !== nextProps.currentSort.order;
}), translate, withStyles(styles));

export default enhance(DatagridHeaderCell);