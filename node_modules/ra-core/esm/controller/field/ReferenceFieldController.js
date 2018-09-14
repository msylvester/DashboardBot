import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { crudGetManyAccumulate as crudGetManyAccumulateAction } from '../../actions';
import { linkToRecord } from '../../util';

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
export var ReferenceFieldController = function (_Component) {
    _inherits(ReferenceFieldController, _Component);

    function ReferenceFieldController() {
        _classCallCheck(this, ReferenceFieldController);

        return _possibleConstructorReturn(this, (ReferenceFieldController.__proto__ || Object.getPrototypeOf(ReferenceFieldController)).apply(this, arguments));
    }

    _createClass(ReferenceFieldController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReference(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.record.id !== nextProps.record.id) {
                this.fetchReference(nextProps);
            }
        }
    }, {
        key: 'fetchReference',
        value: function fetchReference(props) {
            var source = get(props.record, props.source);
            if (source !== null && typeof source !== 'undefined') {
                this.props.crudGetManyAccumulate(props.reference, [source]);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                allowEmpty = _props.allowEmpty,
                basePath = _props.basePath,
                children = _props.children,
                linkType = _props.linkType,
                record = _props.record,
                reference = _props.reference,
                referenceRecord = _props.referenceRecord,
                resource = _props.resource,
                source = _props.source;

            var rootPath = basePath.replace(resource, reference);
            var resourceLinkPath = !linkType ? false : linkToRecord(rootPath, get(record, source), linkType);
            return children({
                isLoading: !referenceRecord && !allowEmpty,
                referenceRecord: referenceRecord,
                resourceLinkPath: resourceLinkPath
            });
        }
    }]);

    return ReferenceFieldController;
}(Component);

ReferenceFieldController.propTypes = {
    addLabel: PropTypes.bool,
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    crudGetManyAccumulate: PropTypes.func.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    referenceRecord: PropTypes.object,
    resource: PropTypes.string,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    translateChoice: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
};

ReferenceFieldController.defaultProps = {
    allowEmpty: false,
    classes: {},
    linkType: 'edit',
    referenceRecord: null,
    record: {}
};

var mapStateToProps = function mapStateToProps(state, props) {
    return {
        referenceRecord: state.admin.resources[props.reference].data[get(props.record, props.source)]
    };
};

export default connect(mapStateToProps, {
    crudGetManyAccumulate: crudGetManyAccumulateAction
})(ReferenceFieldController);