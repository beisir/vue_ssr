const webpack = require('webpack');
const path = require('path');
//  通过cross-env包 在命令行之前添加环境变量 判断当前环境是否是开发环境，还是生产环境
const HTMLplugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'
console.log(process.env.NODE_ENV)
let config = {
    target: 'web',
    // webpack入口entry
    entry: path.join(__dirname, 'src/index.js'),
    output: {   // 出口
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            test: /\.jsx$/,
            loader: 'babel-loader'
        },
        // {
        //     test: /\.css$/,
        //     use: ['style-loader','css-loader']
        // }
        {
            test: /\.(png|jpg|gif|jpeg|svg)$/,
            use: [{
                loader: 'url-loader',   // url loader基于file-loader
                options: {  // 选项配置 传递给loader处理
                    limit: 1024,  // 文件小于**转为base64
                    name: '[name]-aaa.[ext]'    // 指定输出名字
                }
            }]
        }]
    },
    plugins: [
        // 在webpack编译过程中判断环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"': '"production"'
            }
        }),
        new HTMLplugin()
    ]
}
// console.log(isDev)
if(isDev){  // 生产环境
    config.module.rules.push({
        test: /\.styl/,
        use: ['style-loader','css-loader',{
            loader: 'postcss-loader',
            options: {
                sourceMap: true    //
            }
        },'stylus-loader']

    })
    // 调试代码
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: 8080,
        host: '0.0.0.0', // 设置为0.0.0.0 可以通过localhost 和内网ip 或者127.0.0.1访问
        overlay: {  //  如果在webpack编译的时候有任何错误都会显示在网页上
            error: true
        },
        open: true,  // 启动webpack-dev-server 自动打开页面
        // historyFallback: {  // 映射地址
        //
        // },
        hot: true    // 添加热加载需要配置   webpack.HotModuleReplacementPlugin()  plugin
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']     // 单独打包类库
    }
    // chunkhash  和 hash区别是 hash打包出的模块hash都是一样的 chunkhash每个不同
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    });
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({   // 单独打包类库等文件
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({   // 单独打包类库等文件
            name: 'runtime' // 单独打包出单独的webpack模块
        })
    )
}

module.exports = config;
