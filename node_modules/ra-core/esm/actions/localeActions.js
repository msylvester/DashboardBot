export var CHANGE_LOCALE = 'RA/CHANGE_LOCALE';
export var CHANGE_LOCALE_SUCCESS = 'RA/CHANGE_LOCALE_SUCCESS';
export var CHANGE_LOCALE_FAILURE = 'RA/CHANGE_LOCALE_FAILURE';

export var changeLocale = function changeLocale(locale) {
    return {
        type: CHANGE_LOCALE,
        payload: locale
    };
};

export var changeLocaleSuccess = function changeLocaleSuccess(locale, messages) {
    return {
        type: CHANGE_LOCALE_SUCCESS,
        payload: {
            locale: locale,
            messages: messages
        }
    };
};

export var changeLocaleFailure = function changeLocaleFailure(locale, error) {
    return {
        type: CHANGE_LOCALE_FAILURE,
        error: error,
        payload: {
            locale: locale
        }
    };
};