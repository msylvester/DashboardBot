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

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('@material-ui/core/styles');

var _colorManipulator = require('@material-ui/core/styles/colorManipulator');

var _Delete = require('@material-ui/icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var DeleteButton = function (_Component) {
    (0, _inherits3.default)(DeleteButton, _Component);

    function DeleteButton() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DeleteButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DeleteButton.__proto__ || Object.getPrototypeOf(DeleteButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleDelete = function (event) {
            event.preventDefault();
            var _this$props = _this.props,
                dispatchCrudDelete = _this$props.dispatchCrudDelete,
                startUndoable = _this$props.startUndoable,
                resource = _this$props.resource,
                record = _this$props.record,
                basePath = _this$props.basePath,
                redirect = _this$props.redirect,
                undoable = _this$props.undoable;

            if (undoable) {
                startUndoable((0, _raCore.crudDelete)(resource, record.id, record, basePath, redirect));
            } else {
                dispatchCrudDelete(resource, record.id, record, basePath, redirect);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DeleteButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$label = _props.label,
                label = _props$label === undefined ? 'ra.action.delete' : _props$label,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                className = _props.className;

            return _react2.default.createElement(
                _Button2.default,
                {
                    onClick: this.handleDelete,
                    label: label,
                    className: (0, _classnames2.default)('ra-delete-button', classes.deleteButton, className),
                    key: 'button'
                },
                _react2.default.createElement(_Delete2.default, null)
            );
        }
    }]);
    return DeleteButton;
}(_react.Component);

DeleteButton.propTypes = {
    basePath: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    dispatchCrudDelete: _propTypes2.default.func.isRequired,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object,
    redirect: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.func]),
    resource: _propTypes2.default.string.isRequired,
    startUndoable: _propTypes2.default.func,
    translate: _propTypes2.default.func,
    undoable: _propTypes2.default.bool
};

DeleteButton.defaultProps = {
    redirect: 'list',
    undoable: true
};

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(null, { startUndoable: _raCore.startUndoable, dispatchCrudDelete: _raCore.crudDelete }), _raCore.translate, (0, _styles.withStyles)(styles))(DeleteButton);
module.exports = exports['default'];