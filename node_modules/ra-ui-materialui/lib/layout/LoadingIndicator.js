'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingIndicator = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _styles = require('@material-ui/core/styles');

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _RefreshIconButton = require('../button/RefreshIconButton');

var _RefreshIconButton2 = _interopRequireDefault(_RefreshIconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    loader: {
        margin: 14
    }
};

var LoadingIndicator = function LoadingIndicator(_ref) {
    var classes = _ref.classes,
        className = _ref.className,
        isLoading = _ref.isLoading,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'className', 'isLoading']);
    return isLoading ? _react2.default.createElement(_CircularProgress2.default, (0, _extends3.default)({
        className: (0, _classnames2.default)('app-loader', classes.loader, className),
        color: 'inherit',
        size: 18,
        thickness: 5
    }, rest)) : _react2.default.createElement(_RefreshIconButton2.default, null);
};

exports.LoadingIndicator = LoadingIndicator;
LoadingIndicator.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    isLoading: _propTypes2.default.bool,
    width: _propTypes2.default.string
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0
    };
};

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, {} // Avoid connect passing dispatch in props
), (0, _styles.withStyles)(styles))(LoadingIndicator);