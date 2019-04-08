##eslint  需要校验的包
+ eslint-config-standard@11.0.0
+ eslint-plugin-promise@3.7.0
+ eslint-plugin-node@6.0.1
+ eslint-plugin-import@2.11.0
+ eslint-plugin-standard@3.0.1
+ eslint@4.19.1
+ eslint-plugin-html
+ eslint-loader@2.0.0
+ babel-eslint@8.2.3

    使用命令 在package.json scripts下
"lint": "eslint --ext .js --ext .jsx --ext .vue client/",   // 检测报错
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/", // 自动修复报错

.editorconfig文件
root = true;    ## 在这个项目中读取配置 读到这里就可以
[*]     ## 给下面所有的文件指定一个规范
charset = utf-8     ## 指定编码为utf-8
end_of-line = lf    ## 使用
indent_size = 4     ## 使用tab键长度为4哥空格
indent-style = space    ## 制表符
insert_final_newline = true  ## 保存时在最后一行加空行
trim_trailing = true    ## 一行后面多了一个空格 自动删除


// 自动重新启动
nodemon:  {
    "restartable": "rs",    // 命令行输入rs自动重启
    "ignore": [], // 去除重新启动监听的 文件目录
}

// 一次性启动两个服务
concurrently

// node服务正式部署
// pm2.yml  文本类型的标记语言类似于json
创建

pm2 start pm2.yml --env production  // 启动服务
pm2 restart vue-todo      // 重启服务
pm2 stop vue-todo         // 暂停服务
pm2 list                  // 查看已经启动的服务
pm2 log vue-todo          // 查看日志
# pm2 logs [--raw]   #Display all processes logs in streaming
# pm2 flush              #Empty all log file
# pm2 reloadLogs    #Reload all logs




// 另外一种配置方式 asd
sudo chmod 777 webtodo // 修改文件夹可读写
pm2 deploy ecosystem.json production setup
