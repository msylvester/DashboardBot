'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require('react-transition-group');

var _Menu = require('@material-ui/core/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _styles = require('@material-ui/core/styles');

var _FilterNone = require('@material-ui/icons/FilterNone');

var _FilterNone2 = _interopRequireDefault(_FilterNone);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _Button = require('../button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _BulkDeleteAction = require('./BulkDeleteAction');

var _BulkDeleteAction2 = _interopRequireDefault(_BulkDeleteAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        bulkActionsButton: {
            opacity: 1,
            transition: theme.transitions.create('opacity', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            '&.fade-enter': {
                opacity: 0
            },
            '&.fade-enter-done': {
                opacity: 1
            },
            '&.fade-exit': {
                opacity: 0
            },
            '&.fade-exit-done': {
                opacity: 0
            }
        },
        icon: {
            marginRight: theme.spacing.unit
        }
    };
};

var timeoutDurations = {
    enter: 0,
    exit: 300
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        classes = _ref.classes,
        filterValues = _ref.filterValues,
        resource = _ref.resource,
        onUnselectItems = _ref.onUnselectItems,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'classes', 'filterValues', 'resource', 'onUnselectItems']);
    return rest;
};

/**
 * @deprecated pass a Fragment with button children as bulkActionButtons props instead
 */

var BulkActions = function (_Component) {
    (0, _inherits3.default)(BulkActions, _Component);

    function BulkActions() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, BulkActions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = BulkActions.__proto__ || Object.getPrototypeOf(BulkActions)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
            isOpen: false,
            activeAction: null
        }, _this.storeButtonRef = function (node) {
            _this.anchorElement = node;
        }, _this.handleClick = function () {
            _this.setState({ isOpen: true });
        }, _this.handleClose = function () {
            _this.setState({ isOpen: false });
        }, _this.handleLaunchAction = function (action) {
            _this.setState({ activeAction: action, isOpen: false });
        }, _this.handleExitAction = function () {
            _this.setState({ activeAction: null });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(BulkActions, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn('<BulkActions> is deprecated. Use the bulkActionButtons prop instead.');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                basePath = _props.basePath,
                classes = _props.classes,
                children = _props.children,
                className = _props.className,
                filterValues = _props.filterValues,
                label = _props.label,
                resource = _props.resource,
                selectedIds = _props.selectedIds,
                translate = _props.translate,
                rest = (0, _objectWithoutProperties3.default)(_props, ['basePath', 'classes', 'children', 'className', 'filterValues', 'label', 'resource', 'selectedIds', 'translate']);
            var isOpen = this.state.isOpen;


            return _react2.default.createElement(
                _reactTransitionGroup.CSSTransition,
                {
                    'in': selectedIds.length > 0,
                    timeout: timeoutDurations,
                    mountOnEnter: true,
                    unmountOnExit: true,
                    classNames: 'fade'
                },
                _react2.default.createElement(
                    'div',
                    { className: classes.bulkActionsButton },
                    _react2.default.createElement(
                        _Button2.default,
                        (0, _extends3.default)({
                            buttonRef: this.storeButtonRef,
                            className: (0, _classnames2.default)('bulk-actions-button', className),
                            alignIcon: 'left',
                            'aria-owns': isOpen ? 'bulk-actions-menu' : null,
                            'aria-haspopup': 'true',
                            onClick: this.handleClick
                        }, sanitizeRestProps(rest), {
                            label: translate(label, {
                                _: label,
                                smart_count: selectedIds.length
                            })
                        }),
                        _react2.default.createElement(_FilterNone2.default, { className: classes.icon })
                    ),
                    _react2.default.createElement(
                        _Menu2.default,
                        {
                            id: 'bulk-actions-menu',
                            anchorEl: this.anchorElement,
                            onClose: this.handleClose,
                            open: isOpen
                        },
                        _react.Children.map(children, function (child, index) {
                            return _react2.default.createElement(
                                _MenuItem2.default,
                                (0, _extends3.default)({
                                    key: index,
                                    className: (0, _classnames2.default)('bulk-actions-menu-item', child.props.className),
                                    onClick: function onClick() {
                                        return _this2.handleLaunchAction(index);
                                    }
                                }, sanitizeRestProps(rest)),
                                translate(child.props.label)
                            );
                        })
                    ),
                    _react.Children.map(children, function (child, index) {
                        return _this2.state.activeAction === index && (0, _react.cloneElement)(child, {
                            basePath: basePath,
                            filterValues: filterValues,
                            onExit: _this2.handleExitAction,
                            resource: resource,
                            selectedIds: selectedIds
                        });
                    })
                )
            );
        }
    }]);
    return BulkActions;
}(_react.Component);

BulkActions.propTypes = {
    basePath: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    filterValues: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
    label: _propTypes2.default.string,
    resource: _propTypes2.default.string,
    selectedIds: _propTypes2.default.arrayOf(_propTypes2.default.any),
    translate: _propTypes2.default.func.isRequired
};

BulkActions.defaultProps = {
    children: _react2.default.createElement(_BulkDeleteAction2.default, null),
    label: 'ra.action.bulk_actions',
    selectedIds: []
};

var EnhancedButton = (0, _compose2.default)((0, _styles.withStyles)(styles), _raCore.translate)(BulkActions);

exports.default = EnhancedButton;
module.exports = exports['default'];