import { Children } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { connect } from 'react-redux';
import { compose, withContext } from 'recompose';
import defaultMessages from 'ra-language-english';
import defaultsDeep from 'lodash/defaultsDeep';

/**
 * Creates a translation context, available to its children
 *
 * Must be called withing a Redux app.
 *
 * @example
 *     const MyApp = () => (
 *         <Provider store={store}>
 *             <TranslationProvider locale="fr" messages={messages}>
 *                 <!-- Child components go here -->
 *             </TranslationProvider>
 *         </Provider>
 *     );
 */
var TranslationProvider = function TranslationProvider(_ref) {
    var children = _ref.children;
    return Children.only(children);
};

TranslationProvider.propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object,
    children: PropTypes.element
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        locale: state.i18n.locale,
        messages: state.i18n.messages
    };
};

var withI18nContext = withContext({
    translate: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired
}, function (_ref2) {
    var locale = _ref2.locale,
        _ref2$messages = _ref2.messages,
        messages = _ref2$messages === undefined ? {} : _ref2$messages;

    var polyglot = new Polyglot({
        locale: locale,
        phrases: defaultsDeep({}, messages, defaultMessages)
    });

    return {
        locale: locale,
        translate: polyglot.t.bind(polyglot)
    };
});

export default compose(connect(mapStateToProps), withI18nContext)(TranslationProvider);