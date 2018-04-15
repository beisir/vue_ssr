docsLoader = require.resolve('./doc-loader');
// vue -loader的配置
module.exports = (isDev)=>{
    return {
        // 去除vue结构代码换行时  或者标签的空格
        preserveWitepace: true,
        // 打包时 默认vue-loader不打包样式可以时异步加载，此设置可以把样式也打包在一起
        extractCSS: !isDev, // 在webpack-dev-server 开发环境时 不允许用extract-text-css。 。。。等插件
        //
        cssModules: {
            // 使用下方配置的时候在页面标签上产生的hash 引用变量class类名: 下方配置为文件夹路径加hash配置
            // 原理就是在header script中使用computed return $style.下放的配置
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]': '[hash:base64:5]',
            // 让css 类名 在调用时传化为驼峰的名字方式
            // 在<style scoped module></style> 加上module属性
            // .header-name{color: red}; <div :class="%style.headerName"></div>
            // 通过上面这种方法直接把style 中的css当作变量引用
            camelCase: true
        },
        // 配置热加载：根据环境变量生成，在false的情况下关闭了vue组建的热加载，但是不会对style有影响因为style使用的是vue-style-loader进行热加载
        // hostReload: false
        // postCss: '',
        // loaders: {
        //     // 可以在.vue加入除了 style template script 之外的自定义组件
        //     // 可以吧组件的内容输出在调用的地方  看header组件 <docs></docs>
        //     // 只支持docs名称组件
        //     // 除了自定义loader组件之外，还可以使用style js html 指定让某些loader来解析
        //     'docs': docsLoader,
        // },
        // // 指定某些loader解析 之后在用配置的loader解析
        // preLoader: {
        //     // js: ''
        // },
        // postLoader: {
        //
        // }
    }
}
