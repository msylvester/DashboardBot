import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { linkToRecord } from 'ra-core';

import Link from '../Link';

var styles = {
    root: { display: 'flex', flexWrap: 'wrap' }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var currentSort = _ref.currentSort,
        setSort = _ref.setSort,
        isLoading = _ref.isLoading,
        props = _objectWithoutProperties(_ref, ['currentSort', 'setSort', 'isLoading']);

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
export var SingleFieldList = function (_Component) {
    _inherits(SingleFieldList, _Component);

    function SingleFieldList() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, SingleFieldList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SingleFieldList.__proto__ || Object.getPrototypeOf(SingleFieldList)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function () {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    // Our handleClick does nothing as we wrap the children inside a Link but it is
    // required fo ChipField which uses a Chip from material-ui.
    // The material-ui Chip requires an onClick handler to behave like a clickable element


    _createClass(SingleFieldList, [{
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
                rest = _objectWithoutProperties(_props, ['classes', 'className', 'ids', 'data', 'resource', 'basePath', 'children', 'linkType']);

            return React.createElement(
                'div',
                _extends({
                    className: classnames(classes.root, className)
                }, sanitizeRestProps(rest)),
                ids.map(function (id) {
                    var resourceLinkPath = !linkType ? false : linkToRecord(basePath, id, linkType);

                    if (resourceLinkPath) {
                        return React.createElement(
                            Link,
                            {
                                className: classnames(classes.link, className),
                                key: id,
                                to: resourceLinkPath
                            },
                            cloneElement(children, {
                                record: data[id],
                                resource: resource,
                                basePath: basePath,
                                // Workaround to force ChipField to be clickable
                                onClick: _this2.handleClick
                            })
                        );
                    }

                    return cloneElement(children, {
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
}(Component);

SingleFieldList.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.object,
    ids: PropTypes.array,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    resource: PropTypes.string
};

SingleFieldList.defaultProps = {
    classes: {},
    linkType: 'edit'
};

export default withStyles(styles)(SingleFieldList);