import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ReferenceFieldController } from 'ra-core';

import LinearProgress from '../layout/LinearProgress';
import Link from '../Link';
import sanitizeRestProps from './sanitizeRestProps';

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
        rest = _objectWithoutProperties(_ref, ['allowEmpty', 'basePath', 'children', 'className', 'classes', 'isLoading', 'record', 'reference', 'referenceRecord', 'resource', 'resourceLinkPath', 'source', 'translateChoice']);

    if (isLoading) {
        return React.createElement(LinearProgress, null);
    }

    if (resourceLinkPath) {
        return React.createElement(
            Link,
            { to: resourceLinkPath, className: className },
            React.cloneElement(children, _extends({
                className: classnames(children.props.className, classes.link // force color override for Typography components
                ),
                record: referenceRecord,
                resource: reference,
                allowEmpty: allowEmpty,
                basePath: basePath,
                translateChoice: translateChoice
            }, sanitizeRestProps(rest)))
        );
    }

    return React.cloneElement(children, _extends({
        record: referenceRecord,
        resource: reference,
        allowEmpty: allowEmpty,
        basePath: basePath,
        translateChoice: translateChoice
    }, sanitizeRestProps(rest)));
};

export { ReferenceFieldView };
ReferenceFieldView.propTypes = {
    allowEmpty: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    reference: PropTypes.string,
    referenceRecord: PropTypes.object,
    resource: PropTypes.string,
    resourceLinkPath: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    source: PropTypes.string,
    translateChoice: PropTypes.bool
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
        props = _objectWithoutProperties(_ref2, ['children']);

    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceField> only accepts a single child');
    }

    return React.createElement(
        ReferenceFieldController,
        props,
        function (controllerProps) {
            return React.createElement(ReferenceFieldView, _extends({}, props, _extends({ children: children }, controllerProps)));
        }
    );
};

ReferenceField.propTypes = {
    addLabel: PropTypes.bool,
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    translateChoice: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
};

ReferenceField.defaultProps = {
    allowEmpty: false,
    classes: {},
    linkType: 'edit',
    record: {}
};

var EnhancedReferenceField = withStyles(styles)(ReferenceField);

EnhancedReferenceField.defaultProps = {
    addLabel: true
};

export default EnhancedReferenceField;