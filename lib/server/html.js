'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _head = require('./head');

var _head2 = _interopRequireDefault(_head);

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config, assets, store, headers, component) {
  var root = config.html.root || config.htmlShell;
  if (root) {
    var Html = require(_path2.default.resolve(root)).default;
    return '<!doctype html>\n' + _server2.default.renderToString(_react2.default.createElement(Html, { assets: assets, store: store, component: component, headers: headers }));
  }

  var header = _server2.default.renderToString(_react2.default.createElement(_head2.default, { additions: config.html.head, assets: assets, store: store, headers: headers }));
  var body = _server2.default.renderToString(_react2.default.createElement(_body2.default, { assets: assets, store: store, headers: headers, component: component }));
  var head = _reactHelmet2.default.rewind();

  return '\n    <!doctype html>\n    <html ' + head.htmlAttributes.toString() + '>\n        <head>\n            ' + header.replace('<head>', '').replace('</head>', '') + '\n            ' + head.title.toString() + '\n            ' + head.meta.toString() + '\n            ' + head.link.toString() + '\n        </head>\n        ' + body + '\n    </html>\n  ';
};