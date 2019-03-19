const webpack = require('webpack')
const path = require('path'); //  通过cross-env包 在命令行之前添加环境变量 判断当前环境是否是开发环境，还是生产环境
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin');

const VueServerPlugin = require('vue-server-renderer/server-plugin');

let config;

config = merge(baseConfig, {
    target: 'node', // 运行环境为node运行环境
    entry: path.join(__dirname, '../client/server-entry.js'),
    output: {   // 指定入口是怎么样的 module.exports = xxxx;  require('xxxx');
        libraryTarget: 'commonjs2',  // 指定模块输出类型，可以是commonjs,AMD,script形式,UMD模式
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')   // 指定输入目录
    },
    externals: Object.keys(require('../package.json').dependencies), // 打包依赖，不要去打包node_modules里面的文件
    devtool: 'source-map',  // 调试代码.
    module: {
        rules: [{
            test: /\.styl/, // 服务端因为没有css运行的环境 所以需要把css文件单独打包在文件之中
            use: ExtractPlugin.extract({
                fallback: 'vue-style-loader',
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
        }]
    },
    plugins: [
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.DefinePlugin({  // 可以在编译时期创建全局变量。该特性适用于开发版本同线上版本在某些常量上有区别的场景。
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin()   // 服务端渲染处理逻辑
    ]
})

module.exports = config;
