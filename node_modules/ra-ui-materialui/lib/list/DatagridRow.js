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

var _TableCell = require('@material-ui/core/TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableRow = require('@material-ui/core/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DatagridCell = require('./DatagridCell');

var _DatagridCell2 = _interopRequireDefault(_DatagridCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        resource = _ref.resource,
        children = _ref.children,
        id = _ref.id,
        isLoading = _ref.isLoading,
        record = _ref.record,
        basePath = _ref.basePath,
        selected = _ref.selected,
        styles = _ref.styles,
        style = _ref.style,
        onToggleItem = _ref.onToggleItem,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'resource', 'children', 'id', 'isLoading', 'record', 'basePath', 'selected', 'styles', 'style', 'onToggleItem']);
    return rest;
};

var DatagridRow = function (_Component) {
    (0, _inherits3.default)(DatagridRow, _Component);

    function DatagridRow() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DatagridRow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = DatagridRow.__proto__ || Object.getPrototypeOf(DatagridRow)).call.apply(_ref2, [this].concat(args))), _this), _this.handleToggle = function () {
            _this.props.onToggleItem(_this.props.id);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DatagridRow, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                classes = _props.classes,
                className = _props.className,
                hasBulkActions = _props.hasBulkActions,
                hover = _props.hover,
                id = _props.id,
                record = _props.record,
                resource = _props.resource,
                selected = _props.selected,
                style = _props.style,
                styles = _props.styles,
                rest = (0, _objectWithoutProperties3.default)(_props, ['basePath', 'children', 'classes', 'className', 'hasBulkActions', 'hover', 'id', 'record', 'resource', 'selected', 'style', 'styles']);

            return _react2.default.createElement(
                _TableRow2.default,
                (0, _extends3.default)({
                    className: className,
                    key: id,
                    style: style,
                    hover: hover
                }, sanitizeRestProps(rest)),
                hasBulkActions && _react2.default.createElement(
                    _TableCell2.default,
                    { padding: 'none' },
                    _react2.default.createElement(_Checkbox2.default, {
                        color: 'primary',
                        className: 'select-item ' + classes.checkbox,
                        checked: selected,
                        onClick: this.handleToggle
                    })
                ),
                _react2.default.Children.map(children, function (field, index) {
                    return field ? _react2.default.createElement(_DatagridCell2.default, (0, _extends3.default)({
                        key: id + '-' + (field.props.source || index),
                        className: (0, _classnames2.default)('column-' + field.props.source, classes.rowCell),
                        record: record,
                        id: id
                    }, { field: field, basePath: basePath, resource: resource })) : null;
                })
            );
        }
    }]);
    return DatagridRow;
}(_react.Component);

DatagridRow.propTypes = {
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    hasBulkActions: _propTypes2.default.bool.isRequired,
    hover: _propTypes2.default.bool,
    id: _propTypes2.default.any,
    onToggleItem: _propTypes2.default.func,
    record: _propTypes2.default.object.isRequired,
    resource: _propTypes2.default.string,
    selected: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    styles: _propTypes2.default.object
};

DatagridRow.defaultProps = {
    hasBulkActions: false,
    hover: true,
    record: {},
    selected: false
};

exports.default = DatagridRow;
module.exports = exports['default'];