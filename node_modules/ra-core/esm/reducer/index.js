import _extends from 'babel-runtime/helpers/extends';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import admin, { getResources as adminGetResources, getReferenceResource as adminGetReferenceResource, getPossibleReferenceValues as adminGetPossibleReferenceValues, isLoggedIn as adminIsLoggedIn } from './admin';
export { getNotification } from './admin/notifications';
import i18nReducer, { getLocale as adminGetLocale } from './i18n';
export default (function (customReducers, locale, messages) {
    return combineReducers(_extends({
        admin: admin,
        i18n: i18nReducer(locale, messages),
        form: formReducer,
        routing: routerReducer
    }, customReducers));
});

export var getPossibleReferenceValues = function getPossibleReferenceValues(state, props) {
    return adminGetPossibleReferenceValues(state.admin, props);
};
export var getResources = function getResources(state) {
    return adminGetResources(state.admin);
};
export var getReferenceResource = function getReferenceResource(state, props) {
    return adminGetReferenceResource(state.admin, props);
};
export var isLoggedIn = function isLoggedIn(state) {
    return adminIsLoggedIn(state.admin);
};
export var getLocale = function getLocale(state) {
    return adminGetLocale(state.i18n);
};
export { getPossibleReferences } from './admin';