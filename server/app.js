
// *** main dependencies *** //
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes/index';

// const path = require('path');
//
// // const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
//  const swig = require('swig');


// *** routes *** //
// const routes = require('./routes/index.js');


// *** express instance *** //
const app = express();


// *** view engine *** //

// const swigg = new swig.Swig();
// app.engine('html', swigg.renderFile);
// app.set('view engine', 'html');
//
//
// // *** static directory *** //
// app.set('views', path.join(__dirname, 'views'));
//
//
// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// *** main routes *** //
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Listen
app.listen(process.env.PORT || 3000);
