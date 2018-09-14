import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import ViewTitle from './ViewTitle';

var styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    }
};

/**
 * @deprecated
 */
var Header = function Header(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        title = _ref.title,
        actions = _ref.actions,
        actionProps = _ref.actionProps,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'title', 'actions', 'actionProps']);

    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<Header> is deprecated, please use <Title> directly instead');
    }
    return React.createElement(
        'div',
        _extends({ className: classnames(classes.root, className) }, rest),
        React.createElement(ViewTitle, { title: title }),
        actions && React.cloneElement(actions, actionProps)
    );
};

export { Header };
Header.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.any,
    actions: PropTypes.element,
    actionProps: PropTypes.object
};

export default withStyles(styles)(Header);