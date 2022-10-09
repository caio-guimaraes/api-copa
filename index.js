const Koa = require('koa')
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Olá Mundo!';
});

app.listen(3000);