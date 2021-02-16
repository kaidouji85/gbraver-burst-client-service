// @flow
import express from 'express';
import type {$Application, $Request, $Response} from 'express';

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

import {indexRouter} from './routes/index';

var app: $Application<$Request, $Response> = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

module.exports = app;
