import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';

import TextInput from './TextInput';

var searchFilterStyles = {
    input: {
        marginTop: 32
    }
};

var SearchInput = function SearchInput(_ref) {
    var classes = _ref.classes,
        translate = _ref.translate,
        props = _objectWithoutProperties(_ref, ['classes', 'translate']);

    return React.createElement(TextInput, _extends({
        label: false,
        placeholder: translate('ra.action.search'),
        InputProps: {
            endAdornment: React.createElement(
                InputAdornment,
                { position: 'end' },
                React.createElement(SearchIcon, { color: 'disabled' })
            )
        },
        className: classes.input
    }, props));
};

SearchInput.propTypes = {
    classes: PropTypes.object,
    translate: PropTypes.func
};

var enhance = compose(translate, withStyles(searchFilterStyles));

export default enhance(SearchInput);