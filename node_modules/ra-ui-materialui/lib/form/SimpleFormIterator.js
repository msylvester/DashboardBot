'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SimpleFormIterator = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reactTransitionGroup = require('react-transition-group');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('@material-ui/core/styles');

var _RemoveCircleOutline = require('@material-ui/icons/RemoveCircleOutline');

var _RemoveCircleOutline2 = _interopRequireDefault(_RemoveCircleOutline);

var _AddCircleOutline = require('@material-ui/icons/AddCircleOutline');

var _AddCircleOutline2 = _interopRequireDefault(_AddCircleOutline);

var _raCore = require('ra-core');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FormInput = require('../form/FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    var _line;

    return {
        root: {
            padding: 0,
            marginBottom: 0,
            '& > li:last-child': {
                borderBottom: 'none'
            }
        },
        line: (_line = {
            display: 'flex',
            listStyleType: 'none',
            borderBottom: 'solid 1px ' + theme.palette.divider
        }, (0, _defineProperty3.default)(_line, theme.breakpoints.down('xs'), { display: 'block' }), (0, _defineProperty3.default)(_line, '&.fade-enter', {
            opacity: 0.01,
            transform: 'translateX(100vw)'
        }), (0, _defineProperty3.default)(_line, '&.fade-enter-active', {
            opacity: 1,
            transform: 'translateX(0)',
            transition: 'all 500ms ease-in'
        }), (0, _defineProperty3.default)(_line, '&.fade-exit', {
            opacity: 1,
            transform: 'translateX(0)'
        }), (0, _defineProperty3.default)(_line, '&.fade-exit-active', {
            opacity: 0.01,
            transform: 'translateX(100vw)',
            transition: 'all 500ms ease-in'
        }), _line),
        index: (0, _defineProperty3.default)({
            width: '3em',
            paddingTop: '1em'
        }, theme.breakpoints.down('sm'), { display: 'none' }),
        form: { flex: 2 },
        action: {
            paddingTop: '0.5em'
        },
        leftIcon: {
            marginRight: theme.spacing.unit
        }
    };
};

var SimpleFormIterator = exports.SimpleFormIterator = function (_Component) {
    (0, _inherits3.default)(SimpleFormIterator, _Component);

    function SimpleFormIterator(props) {
        (0, _classCallCheck3.default)(this, SimpleFormIterator);

        // we need a unique id for each field for a proper enter/exit animation
        // but redux-form doesn't provide one (cf https://github.com/erikras/redux-form/issues/2735)
        // so we keep an internal map between the field position and an autoincrement id
        var _this = (0, _possibleConstructorReturn3.default)(this, (SimpleFormIterator.__proto__ || Object.getPrototypeOf(SimpleFormIterator)).call(this, props));

        _this.removeField = function (index) {
            return function () {
                var fields = _this.props.fields;

                _this.ids.splice(index, 1);
                fields.remove(index);
            };
        };

        _this.addField = function () {
            var fields = _this.props.fields;

            _this.ids.push(_this.nextId++);
            fields.push({});
        };

        _this.nextId = props.fields.length ? props.fields.length : props.defaultValue ? props.defaultValue.length : 0;

        // We check whether we have a defaultValue (which must be an array) before checking
        // the fields prop which will always be empty for a new record.
        // Without it, our ids wouldn't match the default value and we would get key warnings
        // on the CssTransition element inside our render method
        _this.ids = _this.nextId > 0 ? Array.from(Array(_this.nextId).keys()) : [];
        return _this;
    }

    (0, _createClass3.default)(SimpleFormIterator, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                basePath = _props.basePath,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                children = _props.children,
                fields = _props.fields,
                _props$meta = _props.meta,
                error = _props$meta.error,
                submitFailed = _props$meta.submitFailed,
                record = _props.record,
                resource = _props.resource,
                source = _props.source,
                translate = _props.translate,
                disableAdd = _props.disableAdd,
                disableRemove = _props.disableRemove;

            var records = (0, _get2.default)(record, source);
            return fields ? _react2.default.createElement(
                'ul',
                { className: classes.root },
                submitFailed && error && _react2.default.createElement(
                    'span',
                    null,
                    error
                ),
                _react2.default.createElement(
                    _reactTransitionGroup.TransitionGroup,
                    null,
                    fields.map(function (member, index) {
                        return _react2.default.createElement(
                            _reactTransitionGroup.CSSTransition,
                            {
                                key: _this2.ids[index],
                                timeout: 500,
                                classNames: 'fade'
                            },
                            _react2.default.createElement(
                                'li',
                                { className: classes.line },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    {
                                        variant: 'body1',
                                        className: classes.index
                                    },
                                    index + 1
                                ),
                                _react2.default.createElement(
                                    'section',
                                    { className: classes.form },
                                    _react.Children.map(children, function (input, index) {
                                        return _react2.default.createElement(_FormInput2.default, {
                                            basePath: input.props.basePath || basePath,
                                            input: (0, _react.cloneElement)(input, {
                                                source: input.props.source ? member + '.' + input.props.source : member,
                                                index: input.props.source ? undefined : index,
                                                label: input.props.label || input.props.source
                                            }),
                                            record: records && records[index] || {},
                                            resource: resource
                                        });
                                    })
                                ),
                                !disableRemove && _react2.default.createElement(
                                    'span',
                                    { className: classes.action },
                                    _react2.default.createElement(
                                        _Button2.default,
                                        {
                                            className: (0, _classnames2.default)('button-remove', 'button-remove-' + source + '-' + index),
                                            size: 'small',
                                            onClick: _this2.removeField(index)
                                        },
                                        _react2.default.createElement(_RemoveCircleOutline2.default, {
                                            className: classes.leftIcon
                                        }),
                                        translate('ra.action.remove')
                                    )
                                )
                            )
                        );
                    })
                ),
                !disableAdd && _react2.default.createElement(
                    'li',
                    { className: classes.line },
                    _react2.default.createElement(
                        'span',
                        { className: classes.action },
                        _react2.default.createElement(
                            _Button2.default,
                            {
                                className: (0, _classnames2.default)('button-add', 'button-add-' + source),
                                size: 'small',
                                onClick: this.addField
                            },
                            _react2.default.createElement(_AddCircleOutline2.default, { className: classes.leftIcon }),
                            translate('ra.action.add')
                        )
                    )
                )
            ) : null;
        }
    }]);
    return SimpleFormIterator;
}(_react.Component);

SimpleFormIterator.defaultProps = {
    disableAdd: false,
    disableRemove: false
};

SimpleFormIterator.propTypes = {
    defaultValue: _propTypes2.default.any,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    fields: _propTypes2.default.object,
    meta: _propTypes2.default.object,
    record: _propTypes2.default.object,
    source: _propTypes2.default.string,
    resource: _propTypes2.default.string,
    translate: _propTypes2.default.func,
    disableAdd: _propTypes2.default.bool,
    disableRemove: _propTypes2.default.bool
};

exports.default = (0, _compose2.default)(_raCore.translate, (0, _styles.withStyles)(styles))(SimpleFormIterator);