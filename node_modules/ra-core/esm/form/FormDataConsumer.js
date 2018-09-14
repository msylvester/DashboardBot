import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import get from 'lodash/get';

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
        rest = _objectWithoutProperties(_ref, ['children', 'formData', 'source', 'index']);

    var scopedFormData = formData;
    var getSource = void 0;
    var getSourceHasBeenCalled = false;
    var ret = void 0;

    // If we have an index, we are in an iterator like component (such as the SimpleFormIterator)
    if (typeof index !== 'undefined') {
        scopedFormData = get(formData, source);
        getSource = function getSource(scopedSource) {
            getSourceHasBeenCalled = true;
            return source + '.' + scopedSource;
        };
        ret = children(_extends({ formData: formData, scopedFormData: scopedFormData, getSource: getSource }, rest));
    } else {
        ret = children(_extends({ formData: formData }, rest));
    }

    if (typeof index !== 'undefined' && ret && !getSourceHasBeenCalled && process.env.NODE_ENV !== 'production') {
        warnAboutArrayInput();
    }

    return ret === undefined ? null : ret;
};

export { FormDataConsumer };
FormDataConsumer.propTypes = {
    children: PropTypes.func.isRequired,
    data: PropTypes.object
};

var mapStateToProps = function mapStateToProps(state, _ref2) {
    var record = _ref2.record;
    return {
        formData: getFormValues(REDUX_FORM_NAME)(state) || record
    };
};

export default connect(mapStateToProps)(FormDataConsumer);