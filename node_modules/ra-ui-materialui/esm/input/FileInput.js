import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from 'recompose';
import Dropzone from 'react-dropzone';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { addField, translate } from 'ra-core';

import Labeled from './Labeled';
import FileInputPreview from './FileInputPreview';
import sanitizeRestProps from './sanitizeRestProps';

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

export var FileInput = function (_Component) {
    _inherits(FileInput, _Component);

    function FileInput(props) {
        _classCallCheck(this, FileInput);

        var _this = _possibleConstructorReturn(this, (FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call(this, props));

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

    _createClass(FileInput, [{
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
                return React.createElement(
                    'p',
                    null,
                    translate(labelMultiple)
                );
            }

            return React.createElement(
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
                rest = _objectWithoutProperties(_props2, ['accept', 'children', 'classes', 'className', 'disableClick', 'isRequired', 'label', 'maxSize', 'minSize', 'multiple', 'resource', 'source', 'options']);

            return React.createElement(
                Labeled,
                _extends({
                    label: label,
                    className: classnames(classes.root, className),
                    source: source,
                    resource: resource,
                    isRequired: isRequired
                }, sanitizeRestProps(rest)),
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        Dropzone,
                        _extends({
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
                    children && React.createElement(
                        'div',
                        { className: 'previews' },
                        this.state.files.map(function (file, index) {
                            return React.createElement(
                                FileInputPreview,
                                {
                                    key: index,
                                    file: file,
                                    onRemove: _this2.onRemove(file),
                                    className: classes.removeButton
                                },
                                React.cloneElement(children, {
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
}(Component);

FileInput.propTypes = {
    accept: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    disableClick: PropTypes.bool,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    labelMultiple: PropTypes.string,
    labelSingle: PropTypes.string,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    multiple: PropTypes.bool,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
    placeholder: PropTypes.node
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
        var updatedFiles = _this3.props.multiple ? [].concat(_toConsumableArray(_this3.state.files), _toConsumableArray(files.map(_this3.transformFile))) : [].concat(_toConsumableArray(files.map(_this3.transformFile)));

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
                return !shallowEqual(stateFile, file);
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

        var _React$Children$toArr = React.Children.toArray(_this3.props.children)[0].props,
            source = _React$Children$toArr.source,
            title = _React$Children$toArr.title;


        var transformedFile = _defineProperty({
            rawFile: file
        }, source, file.preview);

        if (title) {
            transformedFile[title] = file.name;
        }

        return transformedFile;
    };
};

export default compose(addField, translate, withStyles(styles))(FileInput);