import Router from '@koa/router'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const router = new Router();

const users = []

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

    users.push(user)

    ctx.body = user
});