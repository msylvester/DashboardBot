import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';

var styles = {
    root: { display: 'inline-block' }
};

var FileField = function FileField(_ref) {
    var _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        className = _ref.className,
        record = _ref.record,
        source = _ref.source,
        title = _ref.title,
        src = _ref.src,
        target = _ref.target,
        rest = _objectWithoutProperties(_ref, ['classes', 'className', 'record', 'source', 'title', 'src', 'target']);

    var sourceValue = get(record, source);

    if (!sourceValue) {
        return React.createElement('div', _extends({
            className: classnames(classes.root, className)
        }, sanitizeRestProps(rest)));
    }

    if (Array.isArray(sourceValue)) {
        return React.createElement(
            'ul',
            _extends({
                className: classnames(classes.root, className)
            }, sanitizeRestProps(rest)),
            sourceValue.map(function (file, index) {
                var titleValue = get(file, title) || title;
                var srcValue = get(file, src) || title;

                return React.createElement(
                    'li',
                    { key: index },
                    React.createElement(
                        'a',
                        {
                            href: srcValue,
                            title: titleValue,
                            target: target
                        },
                        titleValue
                    )
                );
            })
        );
    }

    var titleValue = get(record, title) || title;

    return React.createElement(
        'div',
        _extends({
            className: classnames(classes.root, className)
        }, sanitizeRestProps(rest)),
        React.createElement(
            'a',
            { href: sourceValue, title: titleValue, target: target },
            titleValue
        )
    );
};

export { FileField };
FileField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    src: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string
};

export default withStyles(styles)(FileField);