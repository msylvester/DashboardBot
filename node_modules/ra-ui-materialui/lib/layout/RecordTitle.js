'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TitleDeprecated = require('./TitleDeprecated');

var _TitleDeprecated2 = _interopRequireDefault(_TitleDeprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @deprecated Use TitleForRecord instead
 */
var RecordTitle = function RecordTitle(_ref) {
    var defaultTitle = _ref.defaultTitle,
        record = _ref.record,
        title = _ref.title;
    return record ? _react2.default.createElement(_TitleDeprecated2.default, {
        title: title,
        record: record,
        defaultTitle: defaultTitle
    }) : '';
};

RecordTitle.propTypes = {
    defaultTitle: _propTypes2.default.any,
    record: _propTypes2.default.object,
    title: _propTypes2.default.any
};

exports.default = RecordTitle;
module.exports = exports['default'];