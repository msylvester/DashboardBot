'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageInput = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

var _FileInput2 = require('./FileInput');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ImageInput = exports.ImageInput = function (_FileInput) {
    (0, _inherits3.default)(ImageInput, _FileInput);

    function ImageInput() {
        (0, _classCallCheck3.default)(this, ImageInput);
        return (0, _possibleConstructorReturn3.default)(this, (ImageInput.__proto__ || Object.getPrototypeOf(ImageInput)).apply(this, arguments));
    }

    return ImageInput;
}(_FileInput2.FileInput);

ImageInput.defaultProps = (0, _extends3.default)({}, _FileInput2.FileInput.defaultProps, {
    labelMultiple: 'ra.input.image.upload_several',
    labelSingle: 'ra.input.image.upload_single'
});
exports.default = (0, _compose2.default)(_raCore.addField, _raCore.translate, (0, _styles.withStyles)(styles))(ImageInput);