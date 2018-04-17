const webpack = require('webpack')
const path = require('path')
//  通过cross-env包 在命令行之前添加环境变量 判断当前环境是否是开发环境，还是生产环境
const merge = require('webpack-merge')
const HTMLplugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

let config
// console.log(isDev)

const defaultPlugins = [
  // 在webpack编译过程中判断环境 ,如果不加这一步则打开的服务为文件夹
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLplugin({
      template: path.join(__dirname, 'template.html')
  })
]

const devServer = {
  port: 8081,
  host: '0.0.0.0', // 设置为0.0.0.0 可以通过localhost 和内网ip 或者127.0.0.1访问
  overlay: { //  如果在webpack编译的时候有任何错误都会显示在网页上
    error: true
  },
  open: true, // 启动webpack-dev-server 自动打开页面
  // historyFallback: {  // 映射地址
  //
  //  },
  hot: true // 添加热加载需要配置   webpack.HotModuleReplacementPlugin()  plugin
}
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  // 调试代码.
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.styl/,
      // vue-style-loader: 因为style-loader是不会有热加载，所以必须使用vue-style-loader支持
      use: [
        'vue-style-loader',
        'css-loader',
        // 可以和vue-loader的配置一样把css文件变为module模块通过对象引入变量使用class
        // {
        //     loader: 'css-loader',
        //     options: {
        //         // 开启css 模块化的条件
        //         module: true,
        //         // 和vue-loader一样的配置css模块化
        //         // 查看效果footer.jsx
        //         localIdentName: isDev ? '[path]-[name]-[hash:base64:5]': '[hash:base64:5]'
        //     }
        // },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true //
          }
        },
        'stylus-loader'
      ]

    }]
  },
  devServer,
  // import Vue form 'vue' 指定import的文件在哪里
  // 如果不加resolve 指定使用vue文件   默认使用runtime-only 而reuntime-only是不可以使用 template作为模版
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
