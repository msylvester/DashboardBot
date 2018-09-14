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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

var _LoadingIndicator = require('./LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _UserMenu = require('./UserMenu');

var _UserMenu2 = _interopRequireDefault(_UserMenu);

var _Headroom = require('./Headroom');

var _Headroom2 = _interopRequireDefault(_Headroom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        toolbar: {
            paddingRight: 24
        },
        menuButton: {
            marginLeft: '0.5em',
            marginRight: '0.5em'
        },
        menuButtonIconClosed: {
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            transform: 'rotate(0deg)'
        },
        menuButtonIconOpen: {
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            transform: 'rotate(180deg)'
        },
        title: {
            flex: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        }
    };
};

var AppBar = function AppBar(_ref) {
    var children = _ref.children,
        classes = _ref.classes,
        className = _ref.className,
        logout = _ref.logout,
        open = _ref.open,
        title = _ref.title,
        toggleSidebar = _ref.toggleSidebar,
        userMenu = _ref.userMenu,
        width = _ref.width,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'classes', 'className', 'logout', 'open', 'title', 'toggleSidebar', 'userMenu', 'width']);
    return _react2.default.createElement(
        _Headroom2.default,
        null,
        _react2.default.createElement(
            _AppBar2.default,
            (0, _extends3.default)({
                className: className,
                color: 'secondary',
                position: 'static'
            }, rest),
            _react2.default.createElement(
                _Toolbar2.default,
                {
                    disableGutters: true,
                    variant: width === 'xs' ? 'regular' : 'dense',
                    className: classes.toolbar
                },
                _react2.default.createElement(
                    _IconButton2.default,
                    {
                        color: 'inherit',
                        'aria-label': 'open drawer',
                        onClick: toggleSidebar,
                        className: (0, _classnames2.default)(classes.menuButton)
                    },
                    _react2.default.createElement(_Menu2.default, {
                        classes: {
                            root: open ? classes.menuButtonIconOpen : classes.menuButtonIconClosed
                        }
                    })
                ),
                _react2.default.createElement(_Typography2.default, {
                    variant: 'title',
                    color: 'inherit',
                    className: classes.title,
                    id: 'react-admin-title'
                }),
                _react2.default.createElement(_LoadingIndicator2.default, null),
                (0, _react.cloneElement)(userMenu, { logout: logout })
            )
        )
    );
};

AppBar.propTypes = {
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    logout: _propTypes2.default.element,
    open: _propTypes2.default.bool,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
    toggleSidebar: _propTypes2.default.func.isRequired,
    userMenu: _propTypes2.default.node,
    width: _propTypes2.default.string
};

AppBar.defaultProps = {
    userMenu: _react2.default.createElement(_UserMenu2.default, null)
};

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(function (state) {
    return {
        locale: state.i18n.locale // force redraw on locale change
    };
}, {
    toggleSidebar: _raCore.toggleSidebar
}), (0, _styles.withStyles)(styles), (0, _withWidth2.default)());

exports.default = enhance(AppBar);
module.exports = exports['default'];