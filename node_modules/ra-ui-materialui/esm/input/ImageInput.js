import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { addField, translate } from 'ra-core';

import { FileInput } from './FileInput';

var styles = {
    root: { width: '100%' },
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999'
    },
    preview: {},
    removeButton: {
        display: 'inline-block',
        position: 'relative',
        float: 'left',
        '& button': {
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            minWidth: '2rem',
            opacity: 0
        },
        '&:hover button': {
            opacity: 1
        }
    }
};

export var ImageInput = function (_FileInput) {
    _inherits(ImageInput, _FileInput);

    function ImageInput() {
        _classCallCheck(this, ImageInput);

        return _possibleConstructorReturn(this, (ImageInput.__proto__ || Object.getPrototypeOf(ImageInput)).apply(this, arguments));
    }

    return ImageInput;
}(FileInput);

ImageInput.defaultProps = _extends({}, FileInput.defaultProps, {
    labelMultiple: 'ra.input.image.upload_several',
    labelSingle: 'ra.input.image.upload_single'
});
export default compose(addField, translate, withStyles(styles))(ImageInput);