import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import inflection from 'inflection';
import { reset } from 'redux-form';
import translate from '../i18n/translate';
import { crudGetOne, crudUpdate, startUndoable } from '../actions';
import { REDUX_FORM_NAME } from '../form';

/**
 * Page component for the Edit view
 *
 * The `<Edit>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Edit>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Edit, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostEdit = (props) => (
 *         <Edit {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostEdit } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" edit={PostEdit} />
 *         </Admin>
 *     );
 *     export default App;
 */
export var EditController = function (_Component) {
    _inherits(EditController, _Component);

    function EditController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, EditController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditController.__proto__ || Object.getPrototypeOf(EditController)).call.apply(_ref, [this].concat(args))), _this), _this.save = function (data, redirect) {
            var _this$props = _this.props,
                _this$props$undoable = _this$props.undoable,
                undoable = _this$props$undoable === undefined ? true : _this$props$undoable,
                startUndoable = _this$props.startUndoable,
                dispatchCrudUpdate = _this$props.dispatchCrudUpdate;

            if (undoable) {
                startUndoable(crudUpdate(_this.props.resource, _this.props.id, data, _this.props.record, _this.props.basePath, redirect));
            } else {
                dispatchCrudUpdate(_this.props.resource, _this.props.id, data, _this.props.record, _this.props.basePath, redirect);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(EditController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateData();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.id !== nextProps.id || nextProps.version !== this.props.version) {
                this.props.resetForm(REDUX_FORM_NAME);
                this.updateData(nextProps.resource, nextProps.id);
            }
        }
    }, {
        key: 'defaultRedirectRoute',
        value: function defaultRedirectRoute() {
            return 'list';
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
                translate = _props.translate,
                version = _props.version;


            if (!children) return null;

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 1,
                _: inflection.humanize(inflection.singularize(resource))
            });
            var defaultTitle = translate('ra.page.edit', {
                name: '' + resourceName,
                id: id,
                record: record
            });

            return children({
                isLoading: isLoading,
                defaultTitle: defaultTitle,
                save: this.save,
                resource: resource,
                basePath: basePath,
                record: record,
                redirect: this.defaultRedirectRoute(),
                translate: translate,
                version: version
            });
        }
    }]);

    return EditController;
}(Component);

EditController.propTypes = {
    basePath: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    crudGetOne: PropTypes.func.isRequired,
    dispatchCrudUpdate: PropTypes.func.isRequired,
    record: PropTypes.object,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    hasList: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func,
    undoable: PropTypes.bool,
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

export default compose(connect(mapStateToProps, {
    crudGetOne: crudGetOne,
    dispatchCrudUpdate: crudUpdate,
    startUndoable: startUndoable,
    resetForm: reset
}), translate)(EditController);