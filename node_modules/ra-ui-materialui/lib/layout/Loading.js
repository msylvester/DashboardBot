'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _raCore = require('ra-core');

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
        }
    };
};

var Loading = function Loading(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        translate = _ref.translate,
        _ref$loadingPrimary = _ref.loadingPrimary,
        loadingPrimary = _ref$loadingPrimary === undefined ? 'ra.page.loading' : _ref$loadingPrimary,
        _ref$loadingSecondary = _ref.loadingSecondary,
        loadingSecondary = _ref$loadingSecondary === undefined ? 'ra.message.loading' : _ref$loadingSecondary;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(classes.container, className) },
        _react2.default.createElement(
            'div',
            { className: classes.message },
            _react2.default.createElement(_CircularProgress2.default, { className: classes.icon, color: 'primary' }),
            _react2.default.createElement(
                'h1',
                null,
                translate(loadingPrimary)
            ),
            _react2.default.createElement(
                'div',
                null,
                translate(loadingSecondary),
                '.'
            )
        )
    );
};

Loading.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    loadingPrimary: _propTypes2.default.string,
    loadingSecondary: _propTypes2.default.string
};

Loading.defaultProps = {
    loadingPrimary: 'ra.page.loading',
    loadingSecondary: 'ra.message.loading'
};

var enhance = (0, _compose2.default)((0, _styles.withStyles)(styles), _raCore.translate);

exports.default = enhance(Loading);
module.exports = exports['default'];