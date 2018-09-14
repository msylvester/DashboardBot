import React from 'react';
import ChipInput from 'material-ui-chip-input';
import { withStyles } from '@material-ui/core/styles';

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
    return React.createElement(ChipInput, props);
};

export default withStyles(chipInputStyles)(AutocompleteArrayInputChip);