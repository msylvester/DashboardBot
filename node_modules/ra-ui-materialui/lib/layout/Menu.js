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

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _ViewList = require('@material-ui/icons/ViewList');

var _ViewList2 = _interopRequireDefault(_ViewList);

var _DashboardMenuItem = require('./DashboardMenuItem');

var _DashboardMenuItem2 = _interopRequireDefault(_DashboardMenuItem);

var _MenuItemLink = require('./MenuItemLink');

var _MenuItemLink2 = _interopRequireDefault(_MenuItemLink);

var _Responsive = require('../layout/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
};

var translatedResourceName = function translatedResourceName(resource, translate) {
    return translate('resources.' + resource.name + '.name', {
        smart_count: 2,
        _: resource.options && resource.options.label ? translate(resource.options.label, {
            smart_count: 2,
            _: resource.options.label
        }) : _inflection2.default.humanize(_inflection2.default.pluralize(resource.name))
    });
};

var Menu = function Menu(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        dense = _ref.dense,
        hasDashboard = _ref.hasDashboard,
        onMenuClick = _ref.onMenuClick,
        open = _ref.open,
        pathname = _ref.pathname,
        resources = _ref.resources,
        translate = _ref.translate,
        logout = _ref.logout,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'dense', 'hasDashboard', 'onMenuClick', 'open', 'pathname', 'resources', 'translate', 'logout']);
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: (0, _classnames2.default)(classes.main, className) }, rest),
        hasDashboard && _react2.default.createElement(_DashboardMenuItem2.default, { onClick: onMenuClick }),
        resources.filter(function (r) {
            return r.hasList;
        }).map(function (resource) {
            return _react2.default.createElement(_MenuItemLink2.default, {
                key: resource.name,
                to: '/' + resource.name,
                primaryText: translatedResourceName(resource, translate),
                leftIcon: resource.icon ? _react2.default.createElement(resource.icon, null) : _react2.default.createElement(_ViewList2.default, null),
                onClick: onMenuClick,
                dense: dense
            });
        }),
        _react2.default.createElement(_Responsive2.default, { xsmall: logout, medium: null })
    );
};

Menu.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    dense: _propTypes2.default.bool,
    hasDashboard: _propTypes2.default.bool,
    logout: _propTypes2.default.element,
    onMenuClick: _propTypes2.default.func,
    open: _propTypes2.default.bool,
    pathname: _propTypes2.default.string,
    resources: _propTypes2.default.array.isRequired,
    translate: _propTypes2.default.func.isRequired
};

Menu.defaultProps = {
    onMenuClick: function onMenuClick() {
        return null;
    }
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        open: state.admin.ui.sidebarOpen,
        resources: (0, _raCore.getResources)(state),
        pathname: state.routing.location.pathname // used to force redraw on navigation
    };
};

var enhance = (0, _compose2.default)(_raCore.translate, (0, _reactRedux.connect)(mapStateToProps, {}, // Avoid connect passing dispatch in props,
null, {
    areStatePropsEqual: function areStatePropsEqual(prev, next) {
        return prev.resources.every(function (value, index) {
            return value === next.resources[index];
        } // shallow compare resources
        ) && prev.pathname == next.pathname && prev.open == next.open;
    }
}), (0, _styles.withStyles)(styles));

exports.default = enhance(Menu);
module.exports = exports['default'];