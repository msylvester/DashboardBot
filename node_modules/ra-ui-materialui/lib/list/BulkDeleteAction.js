'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BulkDeleteAction = function (_Component) {
    (0, _inherits3.default)(BulkDeleteAction, _Component);

    function BulkDeleteAction() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, BulkDeleteAction);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BulkDeleteAction.__proto__ || Object.getPrototypeOf(BulkDeleteAction)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn('<BulkDeleteAction> is deprecated. Use the <BulkDeleteButton> component instead, via the bulkActionButton props.');
            }
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
            _this.props.onExit();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(BulkDeleteAction, [{
        key: 'render',
        value: function render() {
            return null;
        }
    }]);
    return BulkDeleteAction;
}(_react.Component);

BulkDeleteAction.propTypes = {
    basePath: _propTypes2.default.string,
    dispatchCrudDeleteMany: _propTypes2.default.func.isRequired,
    label: _propTypes2.default.string,
    onExit: _propTypes2.default.func.isRequired,
    resource: _propTypes2.default.string.isRequired,
    startUndoable: _propTypes2.default.func,
    selectedIds: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    translate: _propTypes2.default.func.isRequired,
    undoable: _propTypes2.default.bool
};

var EnhancedBulkDeleteAction = (0, _compose2.default)((0, _reactRedux.connect)(undefined, {
    startUndoable: _raCore.startUndoable,
    dispatchCrudDeleteMany: _raCore.crudDeleteMany
}), _raCore.translate)(BulkDeleteAction);

EnhancedBulkDeleteAction.defaultProps = {
    label: 'ra.action.delete',
    undoable: true
};

exports.default = EnhancedBulkDeleteAction;
module.exports = exports['default'];