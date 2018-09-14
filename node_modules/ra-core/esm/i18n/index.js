export var DEFAULT_LOCALE = 'en';

export * from './TranslationUtils';
import _defaultI18nProvider from './defaultI18nProvider';
export { _defaultI18nProvider as defaultI18nProvider };
import _translate from './translate';
export { _translate as translate };
import _TranslationProvider from './TranslationProvider';
export { _TranslationProvider as TranslationProvider };