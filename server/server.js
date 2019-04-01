// nodejs koa 服务端渲染的nodejs server

const Koa = require('koa');
const path = require('path');
const send = require('koa-send');   // koa中间件，用来处理路径
const koaBody = require('koa-body');
const koaSession = require('koa-session');

const staticRouter = require('./routes/static.js');
const apiRouter = require('./routes/api.js');
const userRouter = require('./routes/user.js');

const createDb = require('./db/db.js');
const config = require('../app.config.js');
const db = createDb(config.db.appId, config.db.appKey);


const app = new Koa();

app.keys = ['vue ssr tech'];

app.use(koaSession({
    key: 'v-ssr-id',
    maxAge: 2 * 60 * 60 * 1000
}, app));

// 判断当前环境是否为开发环境还是正式环境，此变量在webpack内配置
const isDev = process.env.NODE_ENV === 'development';


/** --   记录请求信息日志   -- **/
app.use(async (ctx, next) => {
    try {
        console.log('=============================');
        console.log('=============================');
        console.log(`request with path ${ctx.path}`);   // 记录所有请求的路径
        Object.keys(ctx.query || {}).length && console.log(`request with query ${ctx.query}`);   // 记录所有请求的路径
        Object.keys(ctx.body || {}).length && console.log(`request with body ${ctx.body}`);   // 记录所有请求的路径
        console.log('=============================');
        console.log('=============================');
        await next()
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        if (isDev) {    // 为开发状态
            ctx.body = err.message;
        } else {    // 不为开发状态
            ctx.body = 'please try again later';
        };
    };
});
/** --   记录请求信息日志   -- **/

/** --   添加数据请求中间件  -- **/
app.use(async (ctx, next) => {
    ctx.db = db;
    await next();
});
/** --   添加数据请求中间件  -- **/



/** --   处理favicon.ico  -- **/
app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') {
        await send(ctx, '/favicon.ico', {
            root: path.join(__dirname, '../')
        });
    } else {
        await next();
    }
});
/** --   处理favicon.ico  -- **/




app.use(koaBody());

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());


let pageRouter = null;
if (isDev) {
    pageRouter = require('./routes/dev-ssr.js');
} else {
    pageRouter = require('./routes/ssr.js')
};
app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`);
});
