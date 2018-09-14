import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import Responsive from './Responsive';
import AppBarMobile from './AppBarMobile';

/**
 * @deprecated
 */
var ViewTitle = function ViewTitle(_ref) {
    var className = _ref.className,
        title = _ref.title,
        rest = _objectWithoutProperties(_ref, ['className', 'title']);

    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<ViewTitle> is deprecated, please use <Title> instead');
    }
    return React.createElement(Responsive, {
        xsmall: React.createElement(
            Fragment,
            null,
            React.createElement(AppBarMobile, _extends({
                className: classnames('title', className),
                title: title
            }, rest)),
            React.createElement(
                'span',
                null,
                ' '
            )
        ),
        medium: React.createElement(
            CardContent,
            _extends({
                className: classnames('title', className)
            }, rest),
            React.createElement(
                Typography,
                { variant: 'title' },
                title
            )
        )
    });
};

ViewTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};

export default ViewTitle;