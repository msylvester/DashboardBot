import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import ActionList from '@material-ui/icons/List';
import { Link } from 'react-router-dom';

import Button from './Button';

var ListButton = function ListButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? 'ra.action.list' : _ref$label,
        rest = _objectWithoutProperties(_ref, ['basePath', 'label']);

    return React.createElement(
        Button,
        _extends({ component: Link, to: basePath, label: label }, rest),
        React.createElement(ActionList, null)
    );
};

ListButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string
};

export default ListButton;