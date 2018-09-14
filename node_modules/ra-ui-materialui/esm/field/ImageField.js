import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';

var styles = {
    list: {
        display: 'flex',
        listStyleType: 'none'
    },
    image: {
        margin: '0.5rem',
        maxHeight: '10rem'
    }
};

var ImageField = function ImageField(_ref) {
    var className = _ref.className,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        record = _ref.record,
        source = _ref.source,
        src = _ref.src,
        title = _ref.title,
        rest = _objectWithoutProperties(_ref, ['className', 'classes', 'record', 'source', 'src', 'title']);

    var sourceValue = get(record, source);
    if (!sourceValue) {
        return React.createElement('div', _extends({ className: className }, sanitizeRestProps(rest)));
    }

    if (Array.isArray(sourceValue)) {
        return React.createElement(
            'ul',
            _extends({
                className: classnames(classes.list, className)
            }, sanitizeRestProps(rest)),
            sourceValue.map(function (file, index) {
                var titleValue = get(file, title) || title;
                var srcValue = get(file, src) || title;

                return React.createElement(
                    'li',
                    { key: index },
                    React.createElement('img', {
                        alt: titleValue,
                        title: titleValue,
                        src: srcValue,
                        className: classes.image
                    })
                );
            })
        );
    }

    var titleValue = get(record, title) || title;

    return React.createElement(
        'div',
        _extends({ className: className }, sanitizeRestProps(rest)),
        React.createElement('img', {
            title: titleValue,
            alt: titleValue,
            src: sourceValue,
            className: classes.image
        })
    );
};

export { ImageField };
ImageField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    classes: PropTypes.object,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    src: PropTypes.string,
    title: PropTypes.string
};

export default withStyles(styles)(ImageField);