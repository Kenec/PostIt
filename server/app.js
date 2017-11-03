import express from 'express';
import flash from 'express-flash';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import routes from './routes';

const config = process.env.NODE_ENV !== 'production' ?
  require('../webpack.config') : '';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.use(flash());

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use('/dist', express.static(path.join(__dirname, './client/dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve('./client/dist/index.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./client/dist/index.html'));
  });
} else {
  app.use('/dist', express.static(path.join(__dirname, '../../client/dist/')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  });
}

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 3000);

export default app;
