// @flow

import express from 'express';
import type {$Application, $Request, $Response} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {indexRouter} from './routes';

/**
 * express アプリケーションを生成する
 *
 * @return 生成結果
 */
export function expressApp(): $Application<$Request, $Response> {
  const app: $Application<$Request, $Response> = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public')));

  app.use('/', indexRouter);

  return app;
}
