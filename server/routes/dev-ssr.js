const Router = require('koa-router');   // koa中间件 用来处理服务端路由
const axios = require('axios'); //  运行在服务端的 ajax请求服务
const path = require('path');
const fs = require('fs');
const MemoryFs = require('memory-fs');  // 所有的api和fs模块相同，区别为memoryfs 将写入的文件存储在内存中
const webpack = require('webpack'); // 在node环境打包js
const VueServerRenderer = require('vue-server-renderer');    // 编译vue文件
const serverRender = require('../server-render.js');

const serverConfig = require('../../build/webpack.config.server.js');   // 服务端配置

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFs();

serverCompiler.outputFileSystem = mfs;  // 将内存输出指定为mfs
let bundle;

// 每次文件下有修改都会通过这个入口从新打包
serverCompiler.watch({}, (err, stats) => {
    if (err) {console.log('---------------xxxxx-----',err);throw err;};
    stats = stats.toJson(); // stats也是错误对象，有些不会再err中报错的信息，会通过stats输出
    stats.errors.forEach(serr => console.log(serr));
    stats.warnings.forEach(warn => console.log(warn));

    // 'vue-ssr-server-bundle.json' 为vue-server-renderer默认输出的文件名
    const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

    // 获取缓存中的数据
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));

    console.log('new bundle generated!');

});


const handleSSR = async (ctx, next) => {
    const serverBundle = bundle;
    if (!bundle) {
        ctx.body = 'loading';
        return;
    };

    // 获取客户端javascript地址 获取缓存
    const clientManifestResp = await axios.get('http://127.0.0.1:8085/public/vue-ssr-client-manifest.json');
    const clientManifest = clientManifestResp.data;

    const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8');

    const renderder = VueServerRenderer.createBundleRenderer(bundle, {
        inject: false,  // 不需要注入其他的操作和限制
        clientManifest,
    });

    await serverRender(ctx, renderder, template);
}
const router = new Router();
router.get('*', handleSSR);


module.exports = router;
