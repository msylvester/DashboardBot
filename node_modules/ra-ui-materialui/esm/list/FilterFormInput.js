import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import ActionHide from '@material-ui/icons/HighlightOff';
import classnames from 'classnames';
import { translate } from 'ra-core';

var emptyRecord = {};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var alwaysOn = _ref.alwaysOn,
        props = _objectWithoutProperties(_ref, ['alwaysOn']);

    return props;
};

var FilterFormInput = function FilterFormInput(_ref2) {
    var filterElement = _ref2.filterElement,
        handleHide = _ref2.handleHide,
        classes = _ref2.classes,
        resource = _ref2.resource,
        translate = _ref2.translate;
    return React.createElement(
        'div',
        {
            'data-source': filterElement.props.source,
            className: classnames('filter-field', classes.body)
        },
        !filterElement.props.alwaysOn && React.createElement(
            IconButton,
            {
                className: 'hide-filter',
                onClick: handleHide,
                'data-key': filterElement.props.source,
                tooltip: translate('ra.action.remove_filter')
            },
            React.createElement(ActionHide, null)
        ),
        React.createElement(Field, _extends({
            allowEmpty: true
        }, sanitizeRestProps(filterElement.props), {
            name: filterElement.props.source,
            component: filterElement.type,
            resource: resource,
            record: emptyRecord
        })),
        React.createElement(
            'div',
            { className: classes.spacer },
            '\xA0'
        )
    );
};

FilterFormInput.propTypes = {
    filterElement: PropTypes.node,
    handleHide: PropTypes.func,
    classes: PropTypes.object,
    resource: PropTypes.string,
    translate: PropTypes.func
};

export default translate(FilterFormInput);