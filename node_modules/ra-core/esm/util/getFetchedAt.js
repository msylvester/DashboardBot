import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import pickBy from 'lodash/pickBy';

var defaultCacheDuration = 10 * 60 * 1000; // ten minutes

export default (function () {
    var newRecordIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var oldRecordFetchedAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var now = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
    var cacheDuration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultCacheDuration;

    // prepare new records and timestamp them
    var newFetchedAt = newRecordIds.reduce(function (prev, recordId) {
        return _extends({}, prev, _defineProperty({}, recordId, now));
    }, {});
    // remove outdated entry
    var latestValidDate = new Date();
    latestValidDate.setTime(latestValidDate.getTime() - cacheDuration);

    var stillValidFetchedAt = pickBy(oldRecordFetchedAt, function (date) {
        return date > latestValidDate;
    });

    return _extends({}, stillValidFetchedAt, newFetchedAt);
});