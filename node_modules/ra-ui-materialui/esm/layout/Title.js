import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { translate } from 'ra-core';

var Title = function Title(_ref) {
    var className = _ref.className,
        defaultTitle = _ref.defaultTitle,
        record = _ref.record,
        title = _ref.title,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['className', 'defaultTitle', 'record', 'title', 'translate']);

    var container = document.getElementById('react-admin-title');
    if (!container) return null;
    if (!defaultTitle && !title && process.env.NODE_ENV !== 'production') {
        console.warn('Missing title prop in <Title> element'); //eslint-disable-line no-console
    }
    var titleElement = !title ? React.createElement(
        'span',
        _extends({ className: className }, rest),
        defaultTitle
    ) : typeof title === 'string' ? React.createElement(
        'span',
        _extends({ className: className }, rest),
        translate(title, { _: title })
    ) : React.cloneElement(title, _extends({ className: className, record: record }, rest));
    return ReactDOM.createPortal(titleElement, container);
};

Title.propTypes = {
    defaultTitle: PropTypes.string,
    className: PropTypes.string,
    record: PropTypes.object,
    translate: PropTypes.func.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default translate(Title);