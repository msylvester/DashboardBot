import merge from 'lodash/merge';
import { DEFAULT_LOCALE } from './index';

/**
 * Resolve the browser locale according to the value of the global window.navigator
 *
 * Use it to determine the <Admin> locale at runtime.
 *
 * @example
 *     import React from 'react';
 *     import { Admin, Resource, resolveBrowserLocale } from 'react-admin';
 *     import englishMessages from 'ra-language-english';
 *     import frenchMessages from 'ra-language-french';
 *     const messages = {
 *        fr: frenchMessages,
 *        en: englishMessages,
 *     };
 *     const App = () => (
 *         <Admin locale={resolveBrowserLocale()} messages={messages}>
 *             ...
 *         </Admin>
 *     );
 *
 * @param {String} defaultLocale Defaults to 'en'
 */
export var resolveBrowserLocale = function resolveBrowserLocale() {
    var defaultLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_LOCALE;

    // from http://blog.ksol.fr/user-locale-detection-browser-javascript/
    // Rely on the window.navigator object to determine user locale
    var _window$navigator = window.navigator,
        language = _window$navigator.language,
        browserLanguage = _window$navigator.browserLanguage,
        userLanguage = _window$navigator.userLanguage;

    return (language || browserLanguage || userLanguage || defaultLocale).split('-')[0];
};

/**
 * Compose translations from multiple packages for a single language (eg: 'english').
 *
 * Use it to merge translations from addons with the main react-admin translations.
 *
 * @example
 *     import React from 'react';
 *     import { Admin, Resource, mergeTranslations } from 'react-admin';
 *     import englishMessages from 'ra-language-english';
 *     import englishTreeMessages from 'ra-tree-language-english';
 *     const messages = {
 *        en: mergeTranslations(englishMessages, englishTreeMessages),
 *     };
 *     const App = () => (
 *         <Admin locale="en" messages={messages}>
 *             ...
 *         </Admin>
 *     );
 */
export var mergeTranslations = function mergeTranslations() {
    for (var _len = arguments.length, translationsModules = Array(_len), _key = 0; _key < _len; _key++) {
        translationsModules[_key] = arguments[_key];
    }

    return merge.apply(undefined, [{}].concat(translationsModules));
};