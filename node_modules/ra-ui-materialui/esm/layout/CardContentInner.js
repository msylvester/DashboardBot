import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

var styles = {
    root: {
        paddingTop: 0,
        paddingBottom: 0,
        '&:first-child': {
            paddingTop: 16
        },
        '&:last-child': {
            paddingBottom: 16
        }
    }
};

/**
 * Overrides material-ui CardContent to allow inner content
 *
 * When using several CardContent inside the same Card, the top and bottom
 * padding double the spacing between each CardContent, leading to too much
 * wasted space. Use this component as a CardContent alternative.
 */
var CardContentInner = function CardContentInner(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        children = _ref.children;
    return React.createElement(
        CardContent,
        { className: classnames(classes.root, className) },
        children
    );
};

CardContentInner.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    children: PropTypes.node
};

export default withStyles(styles)(CardContentInner);