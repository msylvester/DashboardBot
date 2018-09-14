import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { translate } from 'ra-core';

import Button from '../button/Button';
import BulkDeleteAction from './BulkDeleteAction';

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
        rest = _objectWithoutProperties(_ref, ['basePath', 'classes', 'filterValues', 'resource', 'onUnselectItems']);

    return rest;
};

/**
 * @deprecated pass a Fragment with button children as bulkActionButtons props instead
 */

var BulkActions = function (_Component) {
    _inherits(BulkActions, _Component);

    function BulkActions() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, BulkActions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = BulkActions.__proto__ || Object.getPrototypeOf(BulkActions)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BulkActions, [{
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
                rest = _objectWithoutProperties(_props, ['basePath', 'classes', 'children', 'className', 'filterValues', 'label', 'resource', 'selectedIds', 'translate']);

            var isOpen = this.state.isOpen;


            return React.createElement(
                CSSTransition,
                {
                    'in': selectedIds.length > 0,
                    timeout: timeoutDurations,
                    mountOnEnter: true,
                    unmountOnExit: true,
                    classNames: 'fade'
                },
                React.createElement(
                    'div',
                    { className: classes.bulkActionsButton },
                    React.createElement(
                        Button,
                        _extends({
                            buttonRef: this.storeButtonRef,
                            className: classnames('bulk-actions-button', className),
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
                        React.createElement(FilterNoneIcon, { className: classes.icon })
                    ),
                    React.createElement(
                        Menu,
                        {
                            id: 'bulk-actions-menu',
                            anchorEl: this.anchorElement,
                            onClose: this.handleClose,
                            open: isOpen
                        },
                        Children.map(children, function (child, index) {
                            return React.createElement(
                                MenuItem,
                                _extends({
                                    key: index,
                                    className: classnames('bulk-actions-menu-item', child.props.className),
                                    onClick: function onClick() {
                                        return _this2.handleLaunchAction(index);
                                    }
                                }, sanitizeRestProps(rest)),
                                translate(child.props.label)
                            );
                        })
                    ),
                    Children.map(children, function (child, index) {
                        return _this2.state.activeAction === index && cloneElement(child, {
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
}(Component);

BulkActions.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    filterValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    translate: PropTypes.func.isRequired
};

BulkActions.defaultProps = {
    children: React.createElement(BulkDeleteAction, null),
    label: 'ra.action.bulk_actions',
    selectedIds: []
};

var EnhancedButton = compose(withStyles(styles), translate)(BulkActions);

export default EnhancedButton;