'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.TabbedShowLayout = exports.SimpleShowLayout = exports.ShowActions = exports.ShowView = exports.Show = exports.EditActions = exports.EditView = exports.Edit = exports.CreateActions = exports.CreateView = exports.Create = undefined;

var _Create2 = require('./Create');

Object.defineProperty(exports, 'CreateView', {
  enumerable: true,
  get: function get() {
    return _Create2.CreateView;
  }
});

var _Edit2 = require('./Edit');

Object.defineProperty(exports, 'EditView', {
  enumerable: true,
  get: function get() {
    return _Edit2.EditView;
  }
});

var _Show2 = require('./Show');

Object.defineProperty(exports, 'ShowView', {
  enumerable: true,
  get: function get() {
    return _Show2.ShowView;
  }
});

var _Create3 = _interopRequireDefault(_Create2);

var _CreateActions2 = require('./CreateActions');

var _CreateActions3 = _interopRequireDefault(_CreateActions2);

var _Edit3 = _interopRequireDefault(_Edit2);

var _EditActions2 = require('./EditActions');

var _EditActions3 = _interopRequireDefault(_EditActions2);

var _Show3 = _interopRequireDefault(_Show2);

var _ShowActions2 = require('./ShowActions');

var _ShowActions3 = _interopRequireDefault(_ShowActions2);

var _SimpleShowLayout2 = require('./SimpleShowLayout');

var _SimpleShowLayout3 = _interopRequireDefault(_SimpleShowLayout2);

var _TabbedShowLayout2 = require('./TabbedShowLayout');

var _TabbedShowLayout3 = _interopRequireDefault(_TabbedShowLayout2);

var _Tab2 = require('./Tab');

var _Tab3 = _interopRequireDefault(_Tab2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Create = _Create3.default;
exports.CreateActions = _CreateActions3.default;
exports.Edit = _Edit3.default;
exports.EditActions = _EditActions3.default;
exports.Show = _Show3.default;
exports.ShowActions = _ShowActions3.default;
exports.SimpleShowLayout = _SimpleShowLayout3.default;
exports.TabbedShowLayout = _TabbedShowLayout3.default;
exports.Tab = _Tab3.default;