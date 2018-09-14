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

var _reactRedux = require('react-redux');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _styles = require('@material-ui/core/styles');

var _Menu = require('@material-ui/icons/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

var _LoadingIndicator = require('./LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    title: {
        fontSize: '1.25em',
        lineHeight: '2.5em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        paddingRight: '1.5em'
    },
    icon: {
        marginTop: 0,
        marginRight: 0,
        marginLeft: '-12px'
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    }
};

/**
 * @deprecated
 */
var AppBarMobile = function AppBarMobile(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        title = _ref.title,
        toggleSidebar = _ref.toggleSidebar,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'title', 'toggleSidebar']);

    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('<AppBarMobile> is deprecated, please use <AppBar>, which is now responsive');
    }
    return _react2.default.createElement(
        _AppBar2.default,
        (0, _extends3.default)({
            className: className,
            color: 'secondary',
            position: 'fixed'
        }, rest),
        _react2.default.createElement(
            _Toolbar2.default,
            null,
            _react2.default.createElement(
                _IconButton2.default,
                {
                    color: 'inherit',
                    'aria-label': 'open drawer',
                    onClick: toggleSidebar,
                    className: classes.icon
                },
                _react2.default.createElement(_Menu2.default, null)
            ),
            _react2.default.createElement(
                _Typography2.default,
                {
                    className: classes.title,
                    variant: 'title',
                    color: 'inherit'
                },
                title
            ),
            _react2.default.createElement(_LoadingIndicator2.default, null)
        )
    );
};

AppBarMobile.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
    toggleSidebar: _propTypes2.default.func.isRequired
};

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(null, { toggleSidebar: _raCore.toggleSidebar }), (0, _styles.withStyles)(styles));

exports.default = enhance(AppBarMobile);
module.exports = exports['default'];