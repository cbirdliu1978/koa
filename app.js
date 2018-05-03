const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `lyy${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response
/* const main = async ctx => {
  if (ctx.request.accepts('xml')) {
    ctx.response.type = 'xml';
    ctx.response.body = '<data>Hello World</data>';
  } else if (ctx.request.accepts('json')) {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello World' };
  } else if (ctx.request.accepts('html')) {
    ctx.response.type = 'html';
    ctx.response.body = '<p>Hello World</p>';
  } else {
    ctx.response.type = 'text';
    ctx.response.body = 'Hello World';
  }
}; */
/* template demo
 const main = async ctx =>{
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./demos/template.html');
}; */
/* router demo 
const main = ctx =>{
  if (ctx.request.path !== '/') {
    ctx.response.type = 'html';
    ctx.response.body = '<a href = "/">Index Page</a>';

  } else {
    ctx.response.body = 'Hello World';
  }
};
 */

 // static resouse demo
const path = require('path');
const serve = require('koa-static');
const main = serve(path.join(__dirname));
app.use(main);

app.listen(3000);
