
// *** main dependencies *** //
import express from 'express';
import flash from 'express-flash';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import routes from './routes/index';
import config from '../webpack.config';


// *** express instance *** //
const app = express();

// *** webpack compiler ***
const compiler = webpack(config);

// *** webpack middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// *** main routes *** //
app.use('/', routes);

// use express flash message
app.use(flash());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Listen
app.listen(process.env.PORT || 3000);

export default app;

