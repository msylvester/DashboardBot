import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import compose from 'recompose/compose';

import RefreshIconButton from '../button/RefreshIconButton';

var styles = {
    loader: {
        margin: 14
    }
};

var LoadingIndicator = function LoadingIndicator(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        isLoading = _ref.isLoading,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'isLoading']);

    return isLoading ? React.createElement(CircularProgress, _extends({
        className: classNames('app-loader', classes.loader, className),
        color: 'inherit',
        size: 18,
        thickness: 5
    }, rest)) : React.createElement(RefreshIconButton, null);
};

export { LoadingIndicator };
LoadingIndicator.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    width: PropTypes.string
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0
    };
};

export default compose(connect(mapStateToProps, {} // Avoid connect passing dispatch in props
), withStyles(styles))(LoadingIndicator);