import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { translate } from 'ra-core';

import MenuItemLink from './MenuItemLink';

var DashboardMenuItem = function DashboardMenuItem(_ref) {
    var className = _ref.className,
        onClick = _ref.onClick,
        translate = _ref.translate,
        props = _objectWithoutProperties(_ref, ['className', 'onClick', 'translate']);

    return React.createElement(MenuItemLink, _extends({
        onClick: onClick,
        to: '/',
        primaryText: translate('ra.page.dashboard'),
        leftIcon: React.createElement(DashboardIcon, null),
        exact: true
    }, props));
};

DashboardMenuItem.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    translate: PropTypes.func.isRequired
};

export default translate(DashboardMenuItem);