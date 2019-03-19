const Router = require('koa-router');
const path = require('path');
const VueServerRender = require('vue-server-renderer');
const fs = require('fs');
const serverRener = require('../server-render.js');


const clientManifest = require('../../public/vue-ssr-client-manifest.json');
const renderer = VueServerRender.createBundleRenderer(
    path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'), {
        inject: false,
        clientManifest
    }
)


const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8');

const pageRouter = new Router();
pageRouter.get('*', async (ctx) => {
    await serverRener(ctx, renderer, template);
});
module.exports = pageRouter;
