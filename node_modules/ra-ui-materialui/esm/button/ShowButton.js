import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import ImageEye from '@material-ui/icons/RemoveRedEye';
import { Link } from 'react-router-dom';
import { linkToRecord } from 'ra-core';

import Button from './Button';

var ShowButton = function ShowButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? 'ra.action.show' : _ref$label,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        rest = _objectWithoutProperties(_ref, ['basePath', 'label', 'record']);

    return React.createElement(
        Button,
        _extends({
            component: Link,
            to: linkToRecord(basePath, record.id) + '/show',
            label: label
        }, rest),
        React.createElement(ImageEye, null)
    );
};

ShowButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object
};

var enhance = shouldUpdate(function (props, nextProps) {
    return props.translate !== nextProps.translate || props.record && nextProps.record && props.record.id !== nextProps.record.id || props.basePath !== nextProps.basePath || props.record == null && nextProps.record != null;
});

export default enhance(ShowButton);