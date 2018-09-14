'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileInput = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _recompose = require('recompose');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

var _Labeled = require('./Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

var _FileInputPreview = require('./FileInputPreview');

var _FileInputPreview2 = _interopRequireDefault(_FileInputPreview);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999'
    },
    preview: {},
    removeButton: {},
    root: { width: '100%' }
};

var FileInput = exports.FileInput = function (_Component) {
    (0, _inherits3.default)(FileInput, _Component);

    function FileInput(props) {
        (0, _classCallCheck3.default)(this, FileInput);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call(this, props));

        _initialiseProps.call(_this);

        var files = props.input.value || [];
        if (!Array.isArray(files)) {
            files = [files];
        }

        _this.state = {
            files: files.map(_this.transformFile)
        };
        return _this;
    }

    (0, _createClass3.default)(FileInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var files = nextProps.input.value || [];
            if (!Array.isArray(files)) {
                files = [files];
            }

            this.setState({ files: files.map(this.transformFile) });
        }

        // turn a browser dropped file structure into expected structure

    }, {
        key: 'label',
        value: function label() {
            var _props = this.props,
                translate = _props.translate,
                placeholder = _props.placeholder,
                labelMultiple = _props.labelMultiple,
                labelSingle = _props.labelSingle;


            if (placeholder) {
                return placeholder;
            }

            if (this.props.multiple) {
                return _react2.default.createElement(
                    'p',
                    null,
                    translate(labelMultiple)
                );
            }

            return _react2.default.createElement(
                'p',
                null,
                translate(labelSingle)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                accept = _props2.accept,
                children = _props2.children,
                _props2$classes = _props2.classes,
                classes = _props2$classes === undefined ? {} : _props2$classes,
                className = _props2.className,
                disableClick = _props2.disableClick,
                isRequired = _props2.isRequired,
                label = _props2.label,
                maxSize = _props2.maxSize,
                minSize = _props2.minSize,
                multiple = _props2.multiple,
                resource = _props2.resource,
                source = _props2.source,
                options = _props2.options,
                rest = (0, _objectWithoutProperties3.default)(_props2, ['accept', 'children', 'classes', 'className', 'disableClick', 'isRequired', 'label', 'maxSize', 'minSize', 'multiple', 'resource', 'source', 'options']);


            return _react2.default.createElement(
                _Labeled2.default,
                (0, _extends3.default)({
                    label: label,
                    className: (0, _classnames2.default)(classes.root, className),
                    source: source,
                    resource: resource,
                    isRequired: isRequired
                }, (0, _sanitizeRestProps2.default)(rest)),
                _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        _reactDropzone2.default,
                        (0, _extends3.default)({
                            onDrop: this.onDrop,
                            accept: accept,
                            disableClick: disableClick,
                            maxSize: maxSize,
                            minSize: minSize,
                            multiple: multiple,
                            className: classes.dropZone
                        }, options),
                        this.label()
                    ),
                    children && _react2.default.createElement(
                        'div',
                        { className: 'previews' },
                        this.state.files.map(function (file, index) {
                            return _react2.default.createElement(
                                _FileInputPreview2.default,
                                {
                                    key: index,
                                    file: file,
                                    onRemove: _this2.onRemove(file),
                                    className: classes.removeButton
                                },
                                _react2.default.cloneElement(children, {
                                    record: file,
                                    className: classes.preview
                                })
                            );
                        })
                    )
                )
            );
        }
    }]);
    return FileInput;
}(_react.Component);

FileInput.propTypes = {
    accept: _propTypes2.default.string,
    children: _propTypes2.default.element,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    disableClick: _propTypes2.default.bool,
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    labelMultiple: _propTypes2.default.string,
    labelSingle: _propTypes2.default.string,
    maxSize: _propTypes2.default.number,
    minSize: _propTypes2.default.number,
    multiple: _propTypes2.default.bool,
    options: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    placeholder: _propTypes2.default.node
};
FileInput.defaultProps = {
    labelMultiple: 'ra.input.file.upload_several',
    labelSingle: 'ra.input.file.upload_single',
    multiple: false,
    onUpload: function onUpload() {}
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onDrop = function (files) {
        var updatedFiles = _this3.props.multiple ? [].concat((0, _toConsumableArray3.default)(_this3.state.files), (0, _toConsumableArray3.default)(files.map(_this3.transformFile))) : [].concat((0, _toConsumableArray3.default)(files.map(_this3.transformFile)));

        _this3.setState({ files: updatedFiles });

        if (_this3.props.multiple) {
            _this3.props.input.onChange(updatedFiles);
        } else {
            _this3.props.input.onChange(updatedFiles[0]);
        }
    };

    this.onRemove = function (file) {
        return function () {
            var filteredFiles = _this3.state.files.filter(function (stateFile) {
                return !(0, _recompose.shallowEqual)(stateFile, file);
            });

            _this3.setState({ files: filteredFiles });

            if (_this3.props.multiple) {
                _this3.props.input.onChange(filteredFiles);
            } else {
                _this3.props.input.onChange(null);
            }
        };
    };

    this.transformFile = function (file) {
        if (!(file instanceof File)) {
            return file;
        }

        var _React$Children$toArr = _react2.default.Children.toArray(_this3.props.children)[0].props,
            source = _React$Children$toArr.source,
            title = _React$Children$toArr.title;

        var transformedFile = (0, _defineProperty3.default)({
            rawFile: file
        }, source, file.preview);

        if (title) {
            transformedFile[title] = file.name;
        }

        return transformedFile;
    };
};

exports.default = (0, _compose2.default)(_raCore.addField, _raCore.translate, (0, _styles.withStyles)(styles))(FileInput);