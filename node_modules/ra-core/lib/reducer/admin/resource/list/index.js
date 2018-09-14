'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _ids = require('./ids');

var _ids2 = _interopRequireDefault(_ids);

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

var _selectedIds = require('./selectedIds');

var _selectedIds2 = _interopRequireDefault(_selectedIds);

var _total = require('./total');

var _total2 = _interopRequireDefault(_total);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    ids: _ids2.default,
    params: _params2.default,
    selectedIds: _selectedIds2.default,
    total: _total2.default
});
module.exports = exports['default'];