// nodejs koa 服务端渲染的nodejs server

const Koa = require('koa');
const path = require('path');
const send = require('koa-send');   // koa中间件，用来处理路径

const staticRouter = require('./routes/static.js');

const app = new Koa();

// 判断当前环境是否为开发环境还是正式环境，此变量在webpack内配置
const isDev = process.env.NODE_ENV === 'development';

app.use(async (ctx, next) => {
    try {
        console.log(`request with path ${ctx.path}`);   // 记录所有请求的路径
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

app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') {
        await send(ctx, '/favicon.ico', {
            root: path.join(__dirname, '../')
        });
    } else {
        await next();
    }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods());


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
