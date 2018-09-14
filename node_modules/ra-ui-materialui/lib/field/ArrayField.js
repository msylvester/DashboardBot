'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrayField = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ArrayField = exports.ArrayField = function (_Component) {
    (0, _inherits3.default)(ArrayField, _Component);

    function ArrayField(props) {
        (0, _classCallCheck3.default)(this, ArrayField);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ArrayField.__proto__ || Object.getPrototypeOf(ArrayField)).call(this, props));

        _this.state = props.record ? _this.getDataAndIds(props.record, props.source) : initialState;
        return _this;
    }

    (0, _createClass3.default)(ArrayField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, prevProps) {
            if (nextProps.record !== prevProps.record) {
                this.setState(this.getDataAndIds(nextProps.record, nextProps.source));
            }
        }
    }, {
        key: 'getDataAndIds',
        value: function getDataAndIds(record, source) {
            var list = (0, _get2.default)(record, source);
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
                rest = (0, _objectWithoutProperties3.default)(_props, ['addLabel', 'basePath', 'children', 'record', 'source']);
            var _state = this.state,
                ids = _state.ids,
                data = _state.data;


            return (0, _react.cloneElement)(children, (0, _extends3.default)({
                ids: ids,
                data: data,
                isLoading: false,
                basePath: basePath,
                currentSort: {}
            }, rest));
        }
    }]);
    return ArrayField;
}(_react.Component);

ArrayField.propTypes = {
    addLabel: _propTypes2.default.bool,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.element.isRequired,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string
};

var EnhancedArrayField = (0, _pure2.default)(ArrayField);

EnhancedArrayField.defaultProps = {
    addLabel: true
};

exports.default = EnhancedArrayField;