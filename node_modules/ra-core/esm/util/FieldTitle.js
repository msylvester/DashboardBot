import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import pure from 'recompose/pure';
import compose from 'recompose/compose';

import translate from '../i18n/translate';

export var FieldTitle = function FieldTitle(_ref) {
    var resource = _ref.resource,
        source = _ref.source,
        label = _ref.label,
        isRequired = _ref.isRequired,
        translate = _ref.translate;
    return React.createElement(
        'span',
        null,
        typeof label !== 'undefined' ? translate(label, { _: label }) : typeof source !== 'undefined' ? translate('resources.' + resource + '.fields.' + source, {
            _: inflection.transform(source, ['underscore', 'humanize'])
        }) : '',
        isRequired && ' *'
    );
};

FieldTitle.propTypes = {
    isRequired: PropTypes.bool,
    resource: PropTypes.string,
    source: PropTypes.string,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired
};

FieldTitle.defaultProps = {
    translate: function translate(x) {
        return x;
    }
};

var enhance = compose(translate, pure);

export default enhance(FieldTitle);