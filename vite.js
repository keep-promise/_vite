const koa = require('koa');
const app = new koa();

app.use(async ctx => {
  ctx.body = 'vite';
});

app.listen(3000, () => {
  console.log('serve runing at localhost:3000');
});