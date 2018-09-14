'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Search = require('@material-ui/icons/Search');

var _Search2 = _interopRequireDefault(_Search);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchFilterStyles = {
    input: {
        marginTop: 32
    }
};

var SearchInput = function SearchInput(_ref) {
    var classes = _ref.classes,
        translate = _ref.translate,
        props = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'translate']);
    return _react2.default.createElement(_TextInput2.default, (0, _extends3.default)({
        label: false,
        placeholder: translate('ra.action.search'),
        InputProps: {
            endAdornment: _react2.default.createElement(
                _InputAdornment2.default,
                { position: 'end' },
                _react2.default.createElement(_Search2.default, { color: 'disabled' })
            )
        },
        className: classes.input
    }, props));
};

SearchInput.propTypes = {
    classes: _propTypes2.default.object,
    translate: _propTypes2.default.func
};

var enhance = (0, _compose2.default)(_raCore.translate, (0, _styles.withStyles)(searchFilterStyles));

exports.default = enhance(SearchInput);
module.exports = exports['default'];