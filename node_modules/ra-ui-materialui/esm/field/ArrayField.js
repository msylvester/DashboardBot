import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';

var initialState = {
    data: {},
    ids: []
};

/**
 * Display a collection
 *
 * Ideal for embedded arrays of objects, e.g.
 * {
 *   id: 123
 *   tags: [
 *     { name: 'foo' },
 *     { name: 'bar' }
 *   ]
 * }
 *
 * The child must be an iterator component
 * (like <Datagrid> or <SingleFieldList>).
 *
 * @example Display all the backlinks of the current post as a <Datagrid>
 * // post = {
 * //   id: 123
 * //   backlinks: [
 * //       {
 * //           date: '2012-08-10T00:00:00.000Z',
 * //           url: 'http://example.com/foo/bar.html',
 * //       },
 * //       {
 * //           date: '2012-08-14T00:00:00.000Z',
 * //           url: 'https://blog.johndoe.com/2012/08/12/foobar.html',
 * //       }
 * //    ]
 * // }
 *     <ArrayField source="backlinks">
 *         <Datagrid>
 *             <DateField source="date" />
 *             <UrlField source="url" />
 *         </Datagrid>
 *     </ArrayField>
 *
 * @example Display all the tags of the current post as <Chip> components
 * // post = {
 * //   id: 123
 * //   tags: [
 * //     { name: 'foo' },
 * //     { name: 'bar' }
 * //   ]
 * // }
 *     <ArrayField source="tags">
 *         <SingleFieldList>
 *             <ChipField source="name" />
 *         </SingleFieldList>
 *     </ArrayField>
 *
 * If you need to render a collection in a custom way, it's often simpler
 * to write your own component:
 *
 * @example
 *     const TagsField = ({ record }) => (
 *          <ul>
 *              {record.tags.map(item => (
 *                  <li key={item.name}>{item.name}</li>
 *              ))}
 *          </ul>
 *     )
 *     TagsField.defaultProps = { addLabel: true };
 */
export var ArrayField = function (_Component) {
    _inherits(ArrayField, _Component);

    function ArrayField(props) {
        _classCallCheck(this, ArrayField);

        var _this = _possibleConstructorReturn(this, (ArrayField.__proto__ || Object.getPrototypeOf(ArrayField)).call(this, props));

        _this.state = props.record ? _this.getDataAndIds(props.record, props.source) : initialState;
        return _this;
    }

    _createClass(ArrayField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, prevProps) {
            if (nextProps.record !== prevProps.record) {
                this.setState(this.getDataAndIds(nextProps.record, nextProps.source));
            }
        }
    }, {
        key: 'getDataAndIds',
        value: function getDataAndIds(record, source) {
            var list = get(record, source);
            return list ? {
                data: list.reduce(function (prev, item) {
                    prev[JSON.stringify(item)] = item;
                    return prev;
                }, {}),
                ids: list.map(JSON.stringify)
            } : initialState;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                addLabel = _props.addLabel,
                basePath = _props.basePath,
                children = _props.children,
                record = _props.record,
                source = _props.source,
                rest = _objectWithoutProperties(_props, ['addLabel', 'basePath', 'children', 'record', 'source']);

            var _state = this.state,
                ids = _state.ids,
                data = _state.data;


            return cloneElement(children, _extends({
                ids: ids,
                data: data,
                isLoading: false,
                basePath: basePath,
                currentSort: {}
            }, rest));
        }
    }]);

    return ArrayField;
}(Component);

ArrayField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    record: PropTypes.object,
    resource: PropTypes.string,
    sortBy: PropTypes.string,
    source: PropTypes.string
};

var EnhancedArrayField = pure(ArrayField);

EnhancedArrayField.defaultProps = {
    addLabel: true
};

export default EnhancedArrayField;