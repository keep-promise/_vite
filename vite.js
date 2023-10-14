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
    const content = fs.readFileSync(_path, 'utf-8');
    ctx.body = rewriteImportPath(content);
    return;
  }

  // 第三方模块加载
  if(url.startsWith('/@modules')) {
    const moduleName = url.replace('/@modules', '');
    const prefix = path.join(__dirname, './node_modules', moduleName);
    const module = require(prefix +'/package.json').module;
    const filePath = path.join(prefix, module);
    const content = fs.readFileSync(filePath, 'utf-8');
    ctx.type = 'application/javascript';
    ctx.body = rewriteImportPath(content);
  }

});

// import xxx from react --》import xxx from /@module/react
// es module浏览器不支持第三方模块加载，替换入口文件中第三方中的路径成绝对路径
function rewriteImportPath(content) {
  return content.replace(/ from ['"](.*)['"]/g, (s1, s2) => {
    // 普通模块
    if (s2.startsWith('.') || s2.startsWith('./') || s2.startsWith('../')) {
      return s1; 
    } else { // 第三方模块
      return ` from '/@modules/${s2}'`;
    }
  })
}

app.listen(3000, () => {
  console.log('serve runing at localhost:3000');
});