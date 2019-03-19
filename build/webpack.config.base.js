const path = require('path');
const createVueloaderOptions = require('./vue-loader.config')
//  通过cross-env包 在命令行之前添加环境变量 判断当前环境是否是开发环境，还是生产环境
const isDev = process.env.NODE_ENV === 'development'
console.log(process.env.NODE_ENV)
let config = {
    target: 'web',
    // webpack入口entry
    // entry: path.join(__dirname, '../client/index.js'),
    entry: path.join(__dirname, '../client/client-entry.js'),
    output: {   // 出口
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../public'),
        // 如果加上publicPath 需要在fullback时也加publickPath
        // 作为一个基路径
        // publicPath: '/public/'  // 没有服务端的本地路径
        publicPath: 'http://127.0.0.1:8085/public/'  // 如果是服务端必须要绝对路径,端口号为客户端port
    },
    module: {
        rules: [
        //     {   // eslint 检测所有的vue js jsx 后缀文件的规范
        //     test: /\.(vue|js|jsx)$/,
        //     loader: 'eslint-loader',
        //     exclude: /node_modules/,
        //     // 预处理：在处理 以上的后缀名文件 之前都先处理一便eslint 之后在执行
        //     enforce: 'pre'
        // },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: createVueloaderOptions(isDev)
        },{
            test: /\.jsx$/,
            loader: 'babel-loader'
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/    // 忽略编译的js
        },{
            test: /\.(png|jpg|gif|jpeg|svg)$/,
            use: [{
                loader: 'url-loader',   // url loader基于file-loader
                options: {  // 选项配置 传递给loader处理
                    limit: 1024,  // 文件小于**转为base64
                    name: 'resources/[path][name]-[hash:8].[ext]'    // 指定输出名字
                }
            }]
        }]
    }
}
module.exports = config;
