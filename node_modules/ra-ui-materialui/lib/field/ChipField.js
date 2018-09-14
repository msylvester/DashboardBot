'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChipField = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    chip: { margin: 4 }
};

var ChipField = function ChipField(_ref) {
    var className = _ref.className,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        source = _ref.source,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'classes', 'source', 'record']);

    return _react2.default.createElement(_Chip2.default, (0, _extends3.default)({
        className: (0, _classnames2.default)(classes.chip, className),
        label: (0, _get2.default)(record, source)
    }, (0, _sanitizeRestProps2.default)(rest)));
};

exports.ChipField = ChipField;
ChipField.propTypes = {
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    elStyle: _propTypes2.default.object,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string.isRequired,
    record: _propTypes2.default.object
};

var PureChipField = (0, _styles.withStyles)(styles)((0, _pure2.default)(ChipField));

exports.default = PureChipField;