const Router = require('koa-router');

const apiRouter = new Router({
    prefix: '/api', //  指定路径只有/api开头的路径才会处理，其他路径请求不作处理
});


const successResponse = (data) => {
    return {
        data,
        success: true
    }
};

const valitateUser = async (ctx, next) => {
    if (!ctx.session.user) {
        ctx.status = 401;
        ctx.body = 'new login';
    } else {
        await next();
    }
};


apiRouter.use(valitateUser);


apiRouter.get('/todos', async (ctx) => {

    const todos = await ctx.db.getAllTodos();
    ctx.body = successResponse(todos);

}).post('/todo', async (ctx) => {

    const data = await ctx.db.addTodo(ctx.request.body);
    ctx.body = successResponse(data);

}).put('/todo/:id', async (ctx) => {
    // console.log('============', ctx.params, ctx.request.body ,'============');
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body);
    ctx.body = successResponse(data);

}).delete('/todo/:id', async (ctx) => {

    const data = await ctx.db.deleteTodo(ctx.params.id);
    ctx.body = successResponse(data);

}).post('/delete/computed', async (ctx) => {

    console.log(ctx.request.body);
    const data = await ctx.db.deleteComputed(ctx.request.body.ids);
    ctx.body = successResponse(data);

});





module.exports = apiRouter;
