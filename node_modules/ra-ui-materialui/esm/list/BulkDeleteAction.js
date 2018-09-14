import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { crudDeleteMany, startUndoable, translate } from 'ra-core';

var BulkDeleteAction = function (_Component) {
    _inherits(BulkDeleteAction, _Component);

    function BulkDeleteAction() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BulkDeleteAction);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BulkDeleteAction.__proto__ || Object.getPrototypeOf(BulkDeleteAction)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
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
                startUndoable(crudDeleteMany(resource, selectedIds, basePath));
            } else {
                dispatchCrudDeleteMany(resource, selectedIds, basePath);
            }
            _this.props.onExit();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BulkDeleteAction, [{
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return BulkDeleteAction;
}(Component);

BulkDeleteAction.propTypes = {
    basePath: PropTypes.string,
    dispatchCrudDeleteMany: PropTypes.func.isRequired,
    label: PropTypes.string,
    onExit: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    translate: PropTypes.func.isRequired,
    undoable: PropTypes.bool
};

var EnhancedBulkDeleteAction = compose(connect(undefined, {
    startUndoable: startUndoable,
    dispatchCrudDeleteMany: crudDeleteMany
}), translate)(BulkDeleteAction);

EnhancedBulkDeleteAction.defaultProps = {
    label: 'ra.action.delete',
    undoable: true
};

export default EnhancedBulkDeleteAction;