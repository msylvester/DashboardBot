'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUiChipInput = require('material-ui-chip-input');

var _materialUiChipInput2 = _interopRequireDefault(_materialUiChipInput);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chipInputStyles = {
    label: {
        top: 18
    },
    labelShrink: {
        top: 8
    },
    chipContainer: {
        alignItems: 'center',
        display: 'flex',
        minHeight: 50
    }
};

var AutocompleteArrayInputChip = function AutocompleteArrayInputChip(props) {
    return _react2.default.createElement(_materialUiChipInput2.default, props);
};

exports.default = (0, _styles.withStyles)(chipInputStyles)(AutocompleteArrayInputChip);
module.exports = exports['default'];