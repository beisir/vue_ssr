const Router = require('koa-router');
const send = require('koa-send');


const staticRouter = new Router({
    prefix: '/public'   // 此中间件只会处理/public的请求，不会处理其他的请求
});


staticRouter.get('*', async (ctx) => {
    await send(ctx, ctx.path);
});


module.exports = staticRouter;
