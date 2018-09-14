'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceArrayField = exports.ReferenceArrayFieldView = undefined;

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

var ReferenceArrayFieldView = exports.ReferenceArrayFieldView = function ReferenceArrayFieldView(_ref) {
    var children = _ref.children,
        className = _ref.className,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        data = _ref.data,
        ids = _ref.ids,
        isLoading = _ref.isLoading,
        reference = _ref.reference,
        referenceBasePath = _ref.referenceBasePath;

    if (isLoading) {
        return _react2.default.createElement(_LinearProgress2.default, { className: classes.progress });
    }

    return _react2.default.cloneElement(children, {
        className: className,
        resource: reference,
        ids: ids,
        data: data,
        isLoading: isLoading,
        basePath: referenceBasePath,
        currentSort: {}
    });
};

ReferenceArrayFieldView.propTypes = {
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    ids: _propTypes2.default.array,
    isLoading: _propTypes2.default.bool,
    children: _propTypes2.default.element.isRequired,
    reference: _propTypes2.default.string.isRequired,
    referenceBasePath: _propTypes2.default.string
};

/**
 * A container component that fetches records from another resource specified
 * by an array of *ids* in current record.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the products of the current order as datagrid
 * // order = {
 * //   id: 123,
 * //   product_ids: [456, 457, 458],
 * // }
 * <ReferenceArrayField label="Products" reference="products" source="product_ids">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="description" />
 *         <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceArrayField>
 *
 * @example Display all the categories of the current product as a list of chips
 * // product = {
 * //   id: 456,
 * //   category_ids: [11, 22, 33],
 * // }
 * <ReferenceArrayField label="Categories" reference="categories" source="category_ids">
 *     <SingleFieldList>
 *         <ChipField source="name" />
 *     </SingleFieldList>
 * </ReferenceArrayField>
 *
 */
var ReferenceArrayField = function ReferenceArrayField(_ref2) {
    var children = _ref2.children,
        props = (0, _objectWithoutProperties3.default)(_ref2, ['children']);

    if (_react2.default.Children.count(children) !== 1) {
        throw new Error('<ReferenceArrayField> only accepts a single child (like <Datagrid>)');
    }

    return _react2.default.createElement(
        _raCore.ReferenceArrayFieldController,
        props,
        function (controllerProps) {
            return _react2.default.createElement(ReferenceArrayFieldView, (0, _extends3.default)({}, props, (0, _extends3.default)({ children: children }, controllerProps)));
        }
    );
};

exports.ReferenceArrayField = ReferenceArrayField;
ReferenceArrayField.propTypes = {
    addLabel: _propTypes2.default.bool,
    basePath: _propTypes2.default.string.isRequired,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    children: _propTypes2.default.element.isRequired,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object.isRequired,
    reference: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string.isRequired,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string.isRequired
};

var EnhancedReferenceArrayField = (0, _styles.withStyles)(styles)(ReferenceArrayField);

EnhancedReferenceArrayField.defaultProps = {
    addLabel: true
};

exports.default = EnhancedReferenceArrayField;