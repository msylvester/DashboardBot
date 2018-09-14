import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import Queue from '@material-ui/icons/Queue';
import { Link } from 'react-router-dom';

import Button from './Button';

var omitId = function omitId(_ref) {
    var id = _ref.id,
        rest = _objectWithoutProperties(_ref, ['id']);

    return rest;
};

var CloneButton = function CloneButton(_ref2) {
    var _ref2$basePath = _ref2.basePath,
        basePath = _ref2$basePath === undefined ? '' : _ref2$basePath,
        _ref2$label = _ref2.label,
        label = _ref2$label === undefined ? 'ra.action.clone' : _ref2$label,
        _ref2$record = _ref2.record,
        record = _ref2$record === undefined ? {} : _ref2$record,
        rest = _objectWithoutProperties(_ref2, ['basePath', 'label', 'record']);

    return React.createElement(
        Button,
        _extends({
            component: Link,
            to: {
                pathname: basePath + '/create',
                state: { record: omitId(record) }
            },
            label: label
        }, rest),
        React.createElement(Queue, null)
    );
};

export { CloneButton };
CloneButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object
};

var enhance = shouldUpdate(function (props, nextProps) {
    return props.translate !== nextProps.translate || props.record && nextProps.record && props.record !== nextProps.record || props.basePath !== nextProps.basePath || props.record == null && nextProps.record != null;
});

export default enhance(CloneButton);