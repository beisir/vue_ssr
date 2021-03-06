// 服务端渲染入口
import createApp from './create-app.js'
export default (context) => {
    return new Promise((resolve, reject) => {
        const {
            app,
            router,
            store
        } = createApp();
        router.push(context.url);
        console.log(context);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            console.log(matchedComponents);
            if (!matchedComponents.length) {
                return reject(new Error('no component matched'))
            };
            context.meta = app.$meta();
            resolve(app)
        });
    });
}
