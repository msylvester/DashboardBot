import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as RRLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

var styles = function styles(theme) {
    return {
        link: {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
    };
};
/**
 * @deprecated Use react-router-dom's Link instead
 */
var Link = function Link(_ref) {
    var to = _ref.to,
        children = _ref.children,
        className = _ref.className,
        classes = _ref.classes;
    return React.createElement(
        RRLink,
        { to: to, className: classNames(classes.link, className) },
        children
    );
};
Link.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    children: PropTypes.node,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default withStyles(styles)(Link);