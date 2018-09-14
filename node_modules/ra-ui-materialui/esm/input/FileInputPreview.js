import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

var styles = function styles(theme) {
    return {
        removeButton: {},
        removeIcon: {
            color: theme.palette.accent1Color
        }
    };
};

export var FileInputPreview = function (_Component) {
    _inherits(FileInputPreview, _Component);

    function FileInputPreview() {
        _classCallCheck(this, FileInputPreview);

        return _possibleConstructorReturn(this, (FileInputPreview.__proto__ || Object.getPrototypeOf(FileInputPreview)).apply(this, arguments));
    }

    _createClass(FileInputPreview, [{
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
                rest = _objectWithoutProperties(_props2, ['children', 'classes', 'className', 'onRemove', 'revokeObjectURL', 'file']);

            return React.createElement(
                'div',
                _extends({ className: className }, rest),
                React.createElement(
                    IconButton,
                    { className: classes.removeButton, onClick: onRemove },
                    React.createElement(RemoveCircle, { className: classes.removeIcon })
                ),
                children
            );
        }
    }]);

    return FileInputPreview;
}(Component);

FileInputPreview.propTypes = {
    children: PropTypes.element.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    file: PropTypes.object,
    onRemove: PropTypes.func.isRequired,
    revokeObjectURL: PropTypes.func
};

FileInputPreview.defaultProps = {
    file: undefined
};

export default withStyles(styles)(FileInputPreview);