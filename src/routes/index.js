// @flow
import {Router} from 'express';
import type {$Request, $Response} from 'express';

export const router: Router<$Request, $Response> = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});
