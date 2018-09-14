import _extends from 'babel-runtime/helpers/extends';
export var SHOW_NOTIFICATION = 'RA/SHOW_NOTIFICATION';

/**
 * @typedef {Object} notificationOptions
 * @param {number} [notificationOptions.autoHideDuration=4000] - The type of the notification
 * @param {Object} [notificationOptions.messageArgs] - Arguments used to translate the message
 */

/**
 * Shows a snackbar/toast notification on the screen
 * @param {string} message - A translatable label or text to display on notification
 * @param {string} [type=info] - The type of the notification
 * @param {notificationOptions} [notificationOptions] - Specify additional parameters of notification
 * @see {@link https://material-ui.com/api/snackbar/|Material ui snackbar component}
 * @see {@link https://material.io/guidelines/components/snackbars-toasts.html|Material ui reference document on snackbar}
 *
 */
export var showNotification = function showNotification(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
    var notificationOptions = arguments[2];
    return {
        type: SHOW_NOTIFICATION,
        payload: _extends({}, notificationOptions, {
            type: type,
            message: message
        })
    };
};

export var HIDE_NOTIFICATION = 'RA/HIDE_NOTIFICATION';

export var hideNotification = function hideNotification() {
    return {
        type: HIDE_NOTIFICATION
    };
};