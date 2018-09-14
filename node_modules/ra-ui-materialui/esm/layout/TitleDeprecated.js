import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'ra-core';

/**
 * @deprecated Use Title instead
 */
var Title = function Title(_ref) {
    var className = _ref.className,
        defaultTitle = _ref.defaultTitle,
        record = _ref.record,
        title = _ref.title,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['className', 'defaultTitle', 'record', 'title', 'translate']);

    if (!title) {
        return React.createElement(
            'span',
            _extends({ className: className }, rest),
            defaultTitle
        );
    }
    if (typeof title === 'string') {
        return React.createElement(
            'span',
            _extends({ className: className }, rest),
            translate(title, { _: title })
        );
    }
    return React.cloneElement(title, _extends({ className: className, record: record }, rest));
};

Title.propTypes = {
    defaultTitle: PropTypes.string.isRequired,
    className: PropTypes.string,
    record: PropTypes.object,
    translate: PropTypes.func.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default translate(Title);