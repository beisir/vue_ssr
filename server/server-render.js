const ejs = require('ejs');
module.exports = async (ctx, renderer, template) => {
    ctx.type = 'text/html; charst=urf-8;';
    ctx.headers['Content-Type'] = 'text/html; charst=urf-8;';
    const context = {url: ctx.path};
    try {
        const appString = await renderer.renderToString(context);

        const {title} = context.meta.inject();

        const html = ejs.render(template, {
            appString,
            style: context.renderStyles(),
            scripts: context.renderScripts(),
            title: title.text()
        });
        ctx.body = html;
    } catch (err) {
        console.log(err);
    };
}
