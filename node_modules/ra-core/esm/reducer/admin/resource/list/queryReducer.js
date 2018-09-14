import _extends from 'babel-runtime/helpers/extends';
export var SET_SORT = 'SET_SORT';
export var SORT_ASC = 'ASC';
export var SORT_DESC = 'DESC';

export var SET_PAGE = 'SET_PAGE';
export var SET_PER_PAGE = 'SET_PER_PAGE';

export var SET_FILTER = 'SET_FILTER';

var oppositeOrder = function oppositeOrder(direction) {
    return direction === SORT_DESC ? SORT_ASC : SORT_DESC;
};

/**
 * This reducer is for the react-router query string, NOT for redux.
 */
export default (function (previousState, _ref) {
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case SET_SORT:
            if (payload === previousState.sort) {
                return _extends({}, previousState, {
                    order: oppositeOrder(previousState.order),
                    page: 1
                });
            }

            return _extends({}, previousState, {
                sort: payload,
                order: SORT_ASC,
                page: 1
            });

        case SET_PAGE:
            return _extends({}, previousState, { page: payload });

        case SET_PER_PAGE:
            return _extends({}, previousState, { perPage: payload });

        case SET_FILTER:
            {
                return _extends({}, previousState, { page: 1, filter: payload });
            }

        default:
            return previousState;
    }
});