'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressFlash = require('express-flash');

var _expressFlash2 = _interopRequireDefault(_expressFlash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// *** express instance *** //
// *** main dependencies *** //
var app = (0, _express2.default)();

// *** config middleware *** //
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

// *** main routes *** //
app.use('/', _routes2.default);

// use express flash message
app.use((0, _expressFlash2.default)());

if (process.env.NODE_ENV !== 'production') {
  var config = require('../webpack.config');

  // *** webpack compiler ***
  var compiler = (0, _webpack2.default)(config);

  // *** webpack middleware
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use((0, _webpackHotMiddleware2.default)(compiler));

  app.use('/dist', _express2.default.static(_path2.default.join(__dirname, './client/dist')));

  app.get('/', function (req, res) {
    res.sendFile(_path2.default.resolve('./client/dist/index.html'));
  });

  app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve('./client/dist/index.html'));
  });
} else {
  app.use('/dist', _express2.default.static(_path2.default.join(__dirname, '../../client/dist/')));
  app.get('/', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, '../../client/dist/index.html'));
  });
  app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, '../../client/dist/index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Listen
app.listen(process.env.PORT || 3000);

exports.default = app;