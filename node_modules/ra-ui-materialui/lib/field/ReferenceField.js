'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceFieldView = undefined;

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

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

var _LinearProgress = require('../layout/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        link: {
            color: theme.palette.primary.main
        }
    };
};

var ReferenceFieldView = function ReferenceFieldView(_ref) {
    var allowEmpty = _ref.allowEmpty,
        basePath = _ref.basePath,
        children = _ref.children,
        className = _ref.className,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        isLoading = _ref.isLoading,
        record = _ref.record,
        reference = _ref.reference,
        referenceRecord = _ref.referenceRecord,
        resource = _ref.resource,
        resourceLinkPath = _ref.resourceLinkPath,
        source = _ref.source,
        _ref$translateChoice = _ref.translateChoice,
        translateChoice = _ref$translateChoice === undefined ? false : _ref$translateChoice,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['allowEmpty', 'basePath', 'children', 'className', 'classes', 'isLoading', 'record', 'reference', 'referenceRecord', 'resource', 'resourceLinkPath', 'source', 'translateChoice']);

    if (isLoading) {
        return _react2.default.createElement(_LinearProgress2.default, null);
    }

    if (resourceLinkPath) {
        return _react2.default.createElement(
            _Link2.default,
            { to: resourceLinkPath, className: className },
            _react2.default.cloneElement(children, (0, _extends3.default)({
                className: (0, _classnames2.default)(children.props.className, classes.link // force color override for Typography components
                ),
                record: referenceRecord,
                resource: reference,
                allowEmpty: allowEmpty,
                basePath: basePath,
                translateChoice: translateChoice
            }, (0, _sanitizeRestProps2.default)(rest)))
        );
    }

    return _react2.default.cloneElement(children, (0, _extends3.default)({
        record: referenceRecord,
        resource: reference,
        allowEmpty: allowEmpty,
        basePath: basePath,
        translateChoice: translateChoice
    }, (0, _sanitizeRestProps2.default)(rest)));
};

exports.ReferenceFieldView = ReferenceFieldView;
ReferenceFieldView.propTypes = {
    allowEmpty: _propTypes2.default.bool,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element,
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    isLoading: _propTypes2.default.bool,
    record: _propTypes2.default.object,
    reference: _propTypes2.default.string,
    referenceRecord: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    resourceLinkPath: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    source: _propTypes2.default.string,
    translateChoice: _propTypes2.default.bool
};

/**
 * Fetch reference record, and delegate rendering to child component.
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * By default, includes a link to the <Edit> page of the related record
 * (`/users/:userId` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType="show">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * You can also prevent `<ReferenceField>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType={false}>
 *     <TextField source="name" />
 * </ReferenceField>
 */
var ReferenceField = function ReferenceField(_ref2) {
    var children = _ref2.children,
        props = (0, _objectWithoutProperties3.default)(_ref2, ['children']);

    if (_react2.default.Children.count(children) !== 1) {
        throw new Error('<ReferenceField> only accepts a single child');
    }

    return _react2.default.createElement(
        _raCore.ReferenceFieldController,
        props,
        function (controllerProps) {
            return _react2.default.createElement(ReferenceFieldView, (0, _extends3.default)({}, props, (0, _extends3.default)({ children: children }, controllerProps)));
        }
    );
};

ReferenceField.propTypes = {
    addLabel: _propTypes2.default.bool,
    allowEmpty: _propTypes2.default.bool.isRequired,
    basePath: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.element.isRequired,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    cellClassName: _propTypes2.default.string,
    headerClassName: _propTypes2.default.string,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object,
    reference: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string.isRequired,
    translateChoice: _propTypes2.default.func,
    linkType: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]).isRequired
};

ReferenceField.defaultProps = {
    allowEmpty: false,
    classes: {},
    linkType: 'edit',
    record: {}
};

var EnhancedReferenceField = (0, _styles.withStyles)(styles)(ReferenceField);

EnhancedReferenceField.defaultProps = {
    addLabel: true
};

exports.default = EnhancedReferenceField;