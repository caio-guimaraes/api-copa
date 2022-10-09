import Router from '@koa/router'

export const router = new Router();

router.get('/', async ctx => {
    ctx.body = { ola: 'Mundo' };
});

router.get('/users', async ctx => {
    ctx.body = { ola: 'Users' };
});

router.post('/users', async ctx => {
    const user = {
        username: ctx.request.body.username
    }

    ctx.body = user
});