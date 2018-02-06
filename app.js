const Koa = require('koa');
const serve = require('koa-static')('static');
const router = require('./server/routes/router');
const session = require('koa-session');

const app = new Koa();
app.keys = ['some secret hurr'];
app.use(session(app));
app.use(router.routes());
app.use(serve);
app.listen(80);
