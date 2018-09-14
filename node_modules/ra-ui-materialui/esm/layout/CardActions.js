import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

var styles = {
    cardActions: {
        zIndex: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        padding: 0
    }
};

var CardActions = function CardActions(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'children']);

    return React.createElement(
        'div',
        _extends({ className: classnames(classes.cardActions, className) }, rest),
        children
    );
};

CardActions.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string
};

export default withStyles(styles)(CardActions);