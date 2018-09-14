import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import inflection from 'inflection';
import translate from '../i18n/translate';
import { crudGetOne as crudGetOneAction } from '../actions';

/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Show>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
export var ShowController = function (_Component) {
    _inherits(ShowController, _Component);

    function ShowController() {
        _classCallCheck(this, ShowController);

        return _possibleConstructorReturn(this, (ShowController.__proto__ || Object.getPrototypeOf(ShowController)).apply(this, arguments));
    }

    _createClass(ShowController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateData();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.id !== nextProps.id || nextProps.version !== this.props.version) {
                this.updateData(nextProps.resource, nextProps.id);
            }
        }
    }, {
        key: 'updateData',
        value: function updateData() {
            var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.resource;
            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.id;

            this.props.crudGetOne(resource, id, this.props.basePath);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                id = _props.id,
                isLoading = _props.isLoading,
                record = _props.record,
                resource = _props.resource,
                title = _props.title,
                translate = _props.translate,
                version = _props.version;


            if (!children) return null;

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 1,
                _: inflection.humanize(inflection.singularize(resource))
            });
            var defaultTitle = translate('ra.page.show', {
                name: '' + resourceName,
                id: id,
                record: record
            });
            return children({
                isLoading: isLoading,
                title: title,
                defaultTitle: defaultTitle,
                resource: resource,
                basePath: basePath,
                record: record,
                translate: translate,
                version: version
            });
        }
    }]);

    return ShowController;
}(Component);

ShowController.propTypes = {
    basePath: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    crudGetOne: PropTypes.func.isRequired,
    record: PropTypes.object,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func,
    version: PropTypes.number.isRequired
};

function mapStateToProps(state, props) {
    return {
        id: props.id,
        record: state.admin.resources[props.resource] ? state.admin.resources[props.resource].data[props.id] : null,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion
    };
}

export default compose(connect(mapStateToProps, { crudGetOne: crudGetOneAction }), translate)(ShowController);