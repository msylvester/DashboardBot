'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _HighlightOff = require('@material-ui/icons/HighlightOff');

var _HighlightOff2 = _interopRequireDefault(_HighlightOff);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyRecord = {};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var alwaysOn = _ref.alwaysOn,
        props = (0, _objectWithoutProperties3.default)(_ref, ['alwaysOn']);
    return props;
};

var FilterFormInput = function FilterFormInput(_ref2) {
    var filterElement = _ref2.filterElement,
        handleHide = _ref2.handleHide,
        classes = _ref2.classes,
        resource = _ref2.resource,
        translate = _ref2.translate;
    return _react2.default.createElement(
        'div',
        {
            'data-source': filterElement.props.source,
            className: (0, _classnames2.default)('filter-field', classes.body)
        },
        !filterElement.props.alwaysOn && _react2.default.createElement(
            _IconButton2.default,
            {
                className: 'hide-filter',
                onClick: handleHide,
                'data-key': filterElement.props.source,
                tooltip: translate('ra.action.remove_filter')
            },
            _react2.default.createElement(_HighlightOff2.default, null)
        ),
        _react2.default.createElement(_reduxForm.Field, (0, _extends3.default)({
            allowEmpty: true
        }, sanitizeRestProps(filterElement.props), {
            name: filterElement.props.source,
            component: filterElement.type,
            resource: resource,
            record: emptyRecord
        })),
        _react2.default.createElement(
            'div',
            { className: classes.spacer },
            '\xA0'
        )
    );
};

FilterFormInput.propTypes = {
    filterElement: _propTypes2.default.node,
    handleHide: _propTypes2.default.func,
    classes: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    translate: _propTypes2.default.func
};

exports.default = (0, _raCore.translate)(FilterFormInput);
module.exports = exports['default'];