'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileInputPreview = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _styles = require('@material-ui/core/styles');

var _RemoveCircle = require('@material-ui/icons/RemoveCircle');

var _RemoveCircle2 = _interopRequireDefault(_RemoveCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        removeButton: {},
        removeIcon: {
            color: theme.palette.accent1Color
        }
    };
};

var FileInputPreview = exports.FileInputPreview = function (_Component) {
    (0, _inherits3.default)(FileInputPreview, _Component);

    function FileInputPreview() {
        (0, _classCallCheck3.default)(this, FileInputPreview);
        return (0, _possibleConstructorReturn3.default)(this, (FileInputPreview.__proto__ || Object.getPrototypeOf(FileInputPreview)).apply(this, arguments));
    }

    (0, _createClass3.default)(FileInputPreview, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _props = this.props,
                file = _props.file,
                revokeObjectURL = _props.revokeObjectURL;


            if (file.preview) {
                revokeObjectURL ? revokeObjectURL(file.preview) : window.URL.revokeObjectURL(file.preview);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                _props2$classes = _props2.classes,
                classes = _props2$classes === undefined ? {} : _props2$classes,
                className = _props2.className,
                onRemove = _props2.onRemove,
                revokeObjectURL = _props2.revokeObjectURL,
                file = _props2.file,
                rest = (0, _objectWithoutProperties3.default)(_props2, ['children', 'classes', 'className', 'onRemove', 'revokeObjectURL', 'file']);


            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({ className: className }, rest),
                _react2.default.createElement(
                    _IconButton2.default,
                    { className: classes.removeButton, onClick: onRemove },
                    _react2.default.createElement(_RemoveCircle2.default, { className: classes.removeIcon })
                ),
                children
            );
        }
    }]);
    return FileInputPreview;
}(_react.Component);

FileInputPreview.propTypes = {
    children: _propTypes2.default.element.isRequired,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    file: _propTypes2.default.object,
    onRemove: _propTypes2.default.func.isRequired,
    revokeObjectURL: _propTypes2.default.func
};

FileInputPreview.defaultProps = {
    file: undefined
};

exports.default = (0, _styles.withStyles)(styles)(FileInputPreview);