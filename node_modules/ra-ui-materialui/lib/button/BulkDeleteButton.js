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

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Delete = require('@material-ui/icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _styles = require('@material-ui/core/styles');

var _colorManipulator = require('@material-ui/core/styles/colorManipulator');

var _raCore = require('ra-core');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        classes = _ref.classes,
        dispatchCrudDeleteMany = _ref.dispatchCrudDeleteMany,
        filterValues = _ref.filterValues,
        label = _ref.label,
        resource = _ref.resource,
        selectedIds = _ref.selectedIds,
        startUndoable = _ref.startUndoable,
        undoable = _ref.undoable,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['basePath', 'classes', 'dispatchCrudDeleteMany', 'filterValues', 'label', 'resource', 'selectedIds', 'startUndoable', 'undoable']);
    return rest;
};

var styles = function styles(theme) {
    return {
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: (0, _colorManipulator.fade)(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent'
                }
            }
        }
    };
};

var BulkDeleteButton = function (_Component) {
    (0, _inherits3.default)(BulkDeleteButton, _Component);

    function BulkDeleteButton() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, BulkDeleteButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = BulkDeleteButton.__proto__ || Object.getPrototypeOf(BulkDeleteButton)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function () {
            var _this$props = _this.props,
                basePath = _this$props.basePath,
                dispatchCrudDeleteMany = _this$props.dispatchCrudDeleteMany,
                resource = _this$props.resource,
                selectedIds = _this$props.selectedIds,
                startUndoable = _this$props.startUndoable,
                undoable = _this$props.undoable;

            if (undoable) {
                startUndoable((0, _raCore.crudDeleteMany)(resource, selectedIds, basePath));
            } else {
                dispatchCrudDeleteMany(resource, selectedIds, basePath);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(BulkDeleteButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                label = _props.label,
                rest = (0, _objectWithoutProperties3.default)(_props, ['classes', 'label']);

            return _react2.default.createElement(
                _Button2.default,
                (0, _extends3.default)({
                    onClick: this.handleClick,
                    label: label,
                    className: classes.deleteButton
                }, sanitizeRestProps(rest)),
                _react2.default.createElement(_Delete2.default, null)
            );
        }
    }]);
    return BulkDeleteButton;
}(_react.Component);

BulkDeleteButton.propTypes = {
    basePath: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    dispatchCrudDeleteMany: _propTypes2.default.func.isRequired,
    label: _propTypes2.default.string,
    resource: _propTypes2.default.string.isRequired,
    startUndoable: _propTypes2.default.func,
    selectedIds: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    undoable: _propTypes2.default.bool
};

var EnhancedBulkDeleteButton = (0, _compose2.default)((0, _reactRedux.connect)(undefined, {
    startUndoable: _raCore.startUndoable,
    dispatchCrudDeleteMany: _raCore.crudDeleteMany
}), (0, _styles.withStyles)(styles))(BulkDeleteButton);

EnhancedBulkDeleteButton.defaultProps = {
    label: 'ra.action.delete',
    undoable: true
};

exports.default = EnhancedBulkDeleteButton;
module.exports = exports['default'];