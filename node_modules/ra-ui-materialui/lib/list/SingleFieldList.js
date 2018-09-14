'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SingleFieldList = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    root: { display: 'flex', flexWrap: 'wrap' }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var currentSort = _ref.currentSort,
        setSort = _ref.setSort,
        isLoading = _ref.isLoading,
        props = (0, _objectWithoutProperties3.default)(_ref, ['currentSort', 'setSort', 'isLoading']);
    return props;
};

/**
 * Iterator component to be used to display a list of entities, using a single field
 *
 * @example Display all the books by the current author
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 * 
 * By default, it includes a link to the <Edit> page of the related record
 * (`/books/:id` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceManyField reference="books" target="author_id" linkType="show">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * You can also prevent `<SingleFieldList>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceManyField reference="books" target="author_id" linkType={false}>
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>

 */

var SingleFieldList = exports.SingleFieldList = function (_Component) {
    (0, _inherits3.default)(SingleFieldList, _Component);

    function SingleFieldList() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SingleFieldList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = SingleFieldList.__proto__ || Object.getPrototypeOf(SingleFieldList)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function () {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    // Our handleClick does nothing as we wrap the children inside a Link but it is
    // required fo ChipField which uses a Chip from material-ui.
    // The material-ui Chip requires an onClick handler to behave like a clickable element


    (0, _createClass3.default)(SingleFieldList, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                className = _props.className,
                ids = _props.ids,
                data = _props.data,
                resource = _props.resource,
                basePath = _props.basePath,
                children = _props.children,
                linkType = _props.linkType,
                rest = (0, _objectWithoutProperties3.default)(_props, ['classes', 'className', 'ids', 'data', 'resource', 'basePath', 'children', 'linkType']);


            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({
                    className: (0, _classnames2.default)(classes.root, className)
                }, sanitizeRestProps(rest)),
                ids.map(function (id) {
                    var resourceLinkPath = !linkType ? false : (0, _raCore.linkToRecord)(basePath, id, linkType);

                    if (resourceLinkPath) {
                        return _react2.default.createElement(
                            _Link2.default,
                            {
                                className: (0, _classnames2.default)(classes.link, className),
                                key: id,
                                to: resourceLinkPath
                            },
                            (0, _react.cloneElement)(children, {
                                record: data[id],
                                resource: resource,
                                basePath: basePath,
                                // Workaround to force ChipField to be clickable
                                onClick: _this2.handleClick
                            })
                        );
                    }

                    return (0, _react.cloneElement)(children, {
                        key: id,
                        record: data[id],
                        resource: resource,
                        basePath: basePath
                    });
                })
            );
        }
    }]);
    return SingleFieldList;
}(_react.Component);

SingleFieldList.propTypes = {
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element.isRequired,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    ids: _propTypes2.default.array,
    linkType: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]).isRequired,
    resource: _propTypes2.default.string
};

SingleFieldList.defaultProps = {
    classes: {},
    linkType: 'edit'
};

exports.default = (0, _styles.withStyles)(styles)(SingleFieldList);