const koa = require('koa');
const fs = require('fs');
const path = require('path');
const app = new koa();

app.use(async ctx => {
  const { url } = ctx.request;
  // html处理
  if (url == '/') {
    ctx.type = 'text/html';
    const _path = path.join(__dirname, './index.html');
    const html = fs.readFileSync(_path, 'utf-8');
    ctx.body = html;
    return;
  }

  // js文件处理
  if(url.endsWith('.js')) {
    ctx.type = 'application/javascript';
    const _path = path.join(__dirname, url);
    const jscontent = fs.readFileSync(_path, 'utf-8');
    ctx.body = jscontent;
    return;
  }

});

app.listen(3000, () => {
  console.log('serve runing at localhost:3000');
});