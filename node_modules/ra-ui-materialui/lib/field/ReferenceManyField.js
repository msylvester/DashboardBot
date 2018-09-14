'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceManyField = exports.ReferenceManyFieldView = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LinearProgress = require('@material-ui/core/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    progress: { marginTop: '1em' }
};

var ReferenceManyFieldView = exports.ReferenceManyFieldView = function ReferenceManyFieldView(_ref) {
    var children = _ref.children,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        className = _ref.className,
        currentSort = _ref.currentSort,
        data = _ref.data,
        ids = _ref.ids,
        isLoading = _ref.isLoading,
        reference = _ref.reference,
        referenceBasePath = _ref.referenceBasePath,
        setSort = _ref.setSort;

    if (isLoading) {
        return _react2.default.createElement(_LinearProgress2.default, { className: classes.progress });
    }

    return _react2.default.cloneElement(children, {
        className: className,
        resource: reference,
        ids: ids,
        data: data,
        basePath: referenceBasePath,
        currentSort: currentSort,
        setSort: setSort
    });
};

ReferenceManyFieldView.propTypes = {
    children: _propTypes2.default.element,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    currentSort: _propTypes2.default.shape({
        field: _propTypes2.default.string,
        order: _propTypes2.default.string
    }),
    data: _propTypes2.default.object,
    ids: _propTypes2.default.array,
    isLoading: _propTypes2.default.bool,
    reference: _propTypes2.default.string,
    referenceBasePath: _propTypes2.default.string,
    setSort: _propTypes2.default.func
};

/**
 * Render related records to the current one.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 *
 * @example Display all the books by the current author, only the title
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceManyField perPage={10} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceManyField sort={{ field: 'created_at', order: 'DESC' }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceManyField filter={{ is_published: true }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 */
var ReferenceManyField = function ReferenceManyField(_ref2) {
    var children = _ref2.children,
        props = (0, _objectWithoutProperties3.default)(_ref2, ['children']);

    if (_react2.default.Children.count(children) !== 1) {
        throw new Error('<ReferenceManyField> only accepts a single child (like <Datagrid>)');
    }

    return _react2.default.createElement(
        _raCore.ReferenceManyFieldController,
        props,
        function (controllerProps) {
            return _react2.default.createElement(ReferenceManyFieldView, (0, _extends3.default)({}, props, (0, _extends3.default)({ children: children }, controllerProps)));
        }
    );
};

exports.ReferenceManyField = ReferenceManyField;
ReferenceManyField.propTypes = {
    addLabel: _propTypes2.default.bool,
    basePath: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.element.isRequired,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    filter: _propTypes2.default.object,
    label: _propTypes2.default.string,
    perPage: _propTypes2.default.number,
    record: _propTypes2.default.object,
    reference: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string.isRequired,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string.isRequired,
    sort: _propTypes2.default.shape({
        field: _propTypes2.default.string,
        order: _propTypes2.default.string
    }),
    target: _propTypes2.default.string.isRequired
};

ReferenceManyField.defaultProps = {
    filter: {},
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    source: 'id'
};

var EnhancedReferenceManyField = (0, _styles.withStyles)(styles)(ReferenceManyField);

EnhancedReferenceManyField.defaultProps = {
    addLabel: true,
    source: 'id'
};

exports.default = EnhancedReferenceManyField;