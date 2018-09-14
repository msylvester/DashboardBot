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

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('@material-ui/core/styles');

var _HotTub = require('@material-ui/icons/HotTub');

var _HotTub2 = _interopRequireDefault(_HotTub);

var _History = require('@material-ui/icons/History');

var _History2 = _interopRequireDefault(_History);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    var _container;

    return {
        container: (_container = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }, (0, _defineProperty3.default)(_container, theme.breakpoints.up('md'), {
            height: '100%'
        }), (0, _defineProperty3.default)(_container, theme.breakpoints.down('sm'), {
            height: '100vh',
            marginTop: '-3em'
        }), _container),
        icon: {
            width: '9em',
            height: '9em'
        },
        message: {
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            opacity: 0.5,
            margin: '0 1em'
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em'
        }
    };
};

function goBack() {
    history.go(-1);
}

var NotFound = function NotFound(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        translate = _ref.translate,
        title = _ref.title,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'translate', 'title']);
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: (0, _classnames2.default)(classes.container, className) }, rest),
        _react2.default.createElement(_Title2.default, { defaultTitle: title }),
        _react2.default.createElement(
            'div',
            { className: classes.message },
            _react2.default.createElement(_HotTub2.default, { className: classes.icon }),
            _react2.default.createElement(
                'h1',
                null,
                translate('ra.page.not_found')
            ),
            _react2.default.createElement(
                'div',
                null,
                translate('ra.message.not_found'),
                '.'
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
    );
};

NotFound.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    title: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired
};

var enhance = (0, _compose2.default)((0, _styles.withStyles)(styles), _raCore.translate);

exports.default = enhance(NotFound);
module.exports = exports['default'];