import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import inflection from 'inflection';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { getResources, translate } from 'ra-core';
import DefaultIcon from '@material-ui/icons/ViewList';

import DashboardMenuItem from './DashboardMenuItem';
import MenuItemLink from './MenuItemLink';
import Responsive from '../layout/Responsive';

var styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
};

var translatedResourceName = function translatedResourceName(resource, translate) {
    return translate('resources.' + resource.name + '.name', {
        smart_count: 2,
        _: resource.options && resource.options.label ? translate(resource.options.label, {
            smart_count: 2,
            _: resource.options.label
        }) : inflection.humanize(inflection.pluralize(resource.name))
    });
};

var Menu = function Menu(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        dense = _ref.dense,
        hasDashboard = _ref.hasDashboard,
        onMenuClick = _ref.onMenuClick,
        open = _ref.open,
        pathname = _ref.pathname,
        resources = _ref.resources,
        translate = _ref.translate,
        logout = _ref.logout,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'dense', 'hasDashboard', 'onMenuClick', 'open', 'pathname', 'resources', 'translate', 'logout']);

    return React.createElement(
        'div',
        _extends({ className: classnames(classes.main, className) }, rest),
        hasDashboard && React.createElement(DashboardMenuItem, { onClick: onMenuClick }),
        resources.filter(function (r) {
            return r.hasList;
        }).map(function (resource) {
            return React.createElement(MenuItemLink, {
                key: resource.name,
                to: '/' + resource.name,
                primaryText: translatedResourceName(resource, translate),
                leftIcon: resource.icon ? React.createElement(resource.icon, null) : React.createElement(DefaultIcon, null),
                onClick: onMenuClick,
                dense: dense
            });
        }),
        React.createElement(Responsive, { xsmall: logout, medium: null })
    );
};

Menu.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    dense: PropTypes.bool,
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuClick: PropTypes.func,
    open: PropTypes.bool,
    pathname: PropTypes.string,
    resources: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired
};

Menu.defaultProps = {
    onMenuClick: function onMenuClick() {
        return null;
    }
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        open: state.admin.ui.sidebarOpen,
        resources: getResources(state),
        pathname: state.routing.location.pathname // used to force redraw on navigation
    };
};

var enhance = compose(translate, connect(mapStateToProps, {}, // Avoid connect passing dispatch in props,
null, {
    areStatePropsEqual: function areStatePropsEqual(prev, next) {
        return prev.resources.every(function (value, index) {
            return value === next.resources[index];
        } // shallow compare resources
        ) && prev.pathname == next.pathname && prev.open == next.open;
    }
}), withStyles(styles));

export default enhance(Menu);