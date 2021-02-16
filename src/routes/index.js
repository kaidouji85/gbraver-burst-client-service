// @flow
import {Router} from 'express';
import type {$Request, $Response} from 'express';

export const indexRouter: Router<$Request, $Response> = Router();

indexRouter.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});
