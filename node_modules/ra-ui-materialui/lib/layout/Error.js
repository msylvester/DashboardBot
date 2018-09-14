'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _ExpansionPanel = require('@material-ui/core/ExpansionPanel');

var _ExpansionPanel2 = _interopRequireDefault(_ExpansionPanel);

var _ExpansionPanelDetails = require('@material-ui/core/ExpansionPanelDetails');

var _ExpansionPanelDetails2 = _interopRequireDefault(_ExpansionPanelDetails);

var _ExpansionPanelSummary = require('@material-ui/core/ExpansionPanelSummary');

var _ExpansionPanelSummary2 = _interopRequireDefault(_ExpansionPanelSummary);

var _styles = require('@material-ui/core/styles');

var _Report = require('@material-ui/icons/Report');

var _Report2 = _interopRequireDefault(_Report);

var _ExpandMore = require('@material-ui/icons/ExpandMore');

var _ExpandMore2 = _interopRequireDefault(_ExpandMore);

var _History = require('@material-ui/icons/History');

var _History2 = _interopRequireDefault(_History);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    var _container;

    return {
        container: (_container = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }, (0, _defineProperty3.default)(_container, theme.breakpoints.down('sm'), {
            padding: '1em'
        }), (0, _defineProperty3.default)(_container, 'fontFamily', 'Roboto, sans-serif'), (0, _defineProperty3.default)(_container, 'opacity', 0.5), _container),
        title: {
            display: 'flex',
            alignItems: 'center'
        },
        icon: {
            width: '2em',
            height: '2em',
            marginRight: '0.5em'
        },
        panel: {
            marginTop: '1em'
        },
        panelDetails: {
            whiteSpace: 'pre-wrap'
        },
        toolbar: {
            marginTop: '2em'
        }
    };
};

function goBack() {
    history.go(-1);
}

var Error = function Error(_ref) {
    var error = _ref.error,
        errorInfo = _ref.errorInfo,
        classes = _ref.classes,
        className = _ref.className,
        title = _ref.title,
        translate = _ref.translate,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['error', 'errorInfo', 'classes', 'className', 'title', 'translate']);
    return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_Title2.default, { defaultTitle: title }),
        _react2.default.createElement(
            'div',
            (0, _extends3.default)({ className: (0, _classnames2.default)(classes.container, className) }, rest),
            _react2.default.createElement(
                'h1',
                { className: classes.title, role: 'alert' },
                _react2.default.createElement(_Report2.default, { className: classes.icon }),
                translate('ra.page.error')
            ),
            _react2.default.createElement(
                'div',
                null,
                translate('ra.message.error')
            ),
            process.env.NODE_ENV !== 'production' && _react2.default.createElement(
                _ExpansionPanel2.default,
                { className: classes.panel },
                _react2.default.createElement(
                    _ExpansionPanelSummary2.default,
                    { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
                    translate('ra.message.details')
                ),
                _react2.default.createElement(
                    _ExpansionPanelDetails2.default,
                    { className: classes.panelDetails },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h2',
                            null,
                            translate(error.toString())
                        ),
                        errorInfo.componentStack
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: classes.toolbar },
                _react2.default.createElement(
                    _Button2.default,
                    { variant: 'raised', icon: _react2.default.createElement(_History2.default, null), onClick: goBack },
                    translate('ra.action.back')
                )
            )
        )
    );
};

Error.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    error: _propTypes2.default.object.isRequired,
    errorInfo: _propTypes2.default.object,
    translate: _propTypes2.default.func.isRequired,
    title: _propTypes2.default.string
};

var enhance = (0, _compose2.default)((0, _styles.withStyles)(styles), _raCore.translate);

exports.default = enhance(Error);
module.exports = exports['default'];