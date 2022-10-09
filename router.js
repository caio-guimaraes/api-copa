import Router from '@koa/router';
import * as users from './app/users/index.js';
import * as hunches from './app/hunches/index.js';

export const router = new Router();

router.post('/users', users.create);
router.get('/users', users.list);

// router.get('/hunches', hunches.list);
router.post('/hunches', hunches.create);