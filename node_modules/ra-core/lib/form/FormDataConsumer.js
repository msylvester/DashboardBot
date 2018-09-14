'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormDataConsumer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REDUX_FORM_NAME = 'record-form';

var warnAboutArrayInput = function warnAboutArrayInput() {
    return console.warn( // eslint-disable-line
    'You\'re using a FormDataConsumer inside an ArrayInput and you did not called the getSource function supplied by the FormDataConsumer component. This is required for your inputs to get the proper source.\n\n    <ArrayInput source="users">\n        <SimpleFormIterator>\n            <TextInput source="name" />\n\n            <FormDataConsumer>\n                {({\n                    formData, // The whole form data\n                    scopedFormData, // The data for this item of the ArrayInput\n                    getSource, // A function to get the valid source inside an ArrayInput\n                    ...rest,\n                }) =>\n                    scopedFormData.name ? (\n                        <SelectInput\n                            source={getSource(\'role\')} // Will translate to "users[0].role"\n                            choices={[\'admin\', \'user\']}\n                            {...rest}\n                        />\n                    ) : null\n                }\n            </FormDataConsumer>\n        </SimpleFormIterator>\n    </ArrayInput>');
};

/**
 * Get the current (edited) value of the record from the form and pass it
 * to child function
 *
 * @example
 *
 * const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <BooleanInput source="hasEmail" />
 *             <FormDataConsumer>
 *                 {({ formData, ...rest }) => formData.hasEmail &&
 *                      <TextInput source="email" {...rest} />
 *                 }
 *             </FormDataConsumer>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 *
 * const OrderEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <SelectInput source="country" choices={countries} />
 *             <FormDataConsumer>
 *                 {({ formData, ...rest }) =>
 *                      <SelectInput
 *                          source="city"
 *                          choices={getCitiesFor(formData.country)}
 *                          {...rest}
 *                      />
 *                 }
 *             </FormDataConsumer>
 *         </SimpleForm>
 *     </Edit>
 * );
 */
var FormDataConsumer = function FormDataConsumer(_ref) {
    var children = _ref.children,
        formData = _ref.formData,
        source = _ref.source,
        index = _ref.index,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'formData', 'source', 'index']);

    var scopedFormData = formData;
    var getSource = void 0;
    var getSourceHasBeenCalled = false;
    var ret = void 0;

    // If we have an index, we are in an iterator like component (such as the SimpleFormIterator)
    if (typeof index !== 'undefined') {
        scopedFormData = (0, _get2.default)(formData, source);
        getSource = function getSource(scopedSource) {
            getSourceHasBeenCalled = true;
            return source + '.' + scopedSource;
        };
        ret = children((0, _extends3.default)({ formData: formData, scopedFormData: scopedFormData, getSource: getSource }, rest));
    } else {
        ret = children((0, _extends3.default)({ formData: formData }, rest));
    }

    if (typeof index !== 'undefined' && ret && !getSourceHasBeenCalled && process.env.NODE_ENV !== 'production') {
        warnAboutArrayInput();
    }

    return ret === undefined ? null : ret;
};

exports.FormDataConsumer = FormDataConsumer;
FormDataConsumer.propTypes = {
    children: _propTypes2.default.func.isRequired,
    data: _propTypes2.default.object
};

var mapStateToProps = function mapStateToProps(state, _ref2) {
    var record = _ref2.record;
    return {
        formData: (0, _reduxForm.getFormValues)(REDUX_FORM_NAME)(state) || record
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FormDataConsumer);