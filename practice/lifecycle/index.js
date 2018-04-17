import Vue from 'vue'

new Vue({
  el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  // beforeCreate created 和 beforeMount mounted 的区别
  // 就是前二者是vue实例初始化的时候执行
  // 后二者是只有 有el 属性 或者 $mount('#app') 的时候才会执行
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  // 和数据有关放在这里
  created () {
    console.log(this, 'created')
  },
  // 在服务端渲染的时候不会被调用
  // 只有dom操作会在这里
  // 服务端渲染时没有dom执行的环境
  beforeMount () {
    // 此时的元素 还是在页面写的一个结果
    console.log(this, 'beforeMount')
  },
  // 和dom有关放在这里
  mounted () {
    // 在此时页面的元素 已经替换为在render的一个结果
    // 因为render方法是在beforeMount 和 mounted 之间执行
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeCreate')
  },
  updated () {
    console.log(this, 'updated')
  },
  // 和原生的组件有关系
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  // template 属性最终会解析成为一个render方法
  // 形参数 h 相当于是一个createElment

  render (h) {
    // div:创建的标签
    // {}:
    // aaa: 标签的内容
    // console.log('是在beforeMount 和 mounted 之间执行')
    // return h('div', {}, '999999')

    // throw new TypeError('render error')
  },
  // 配合打印在页面的报错信息 函数 只会在开发环境执行
  // 报错函数 只会在本组件执行
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  // 在线上环境也是可以执行的
  // 搜集线上的错误
  // 如过在跟组件上写了这个方法，所有子组件，或者任何组件有错误 都以捕捉到
  // 会上向上冒泡，除非自组件取消冒泡
  errorCaptured () {

  }
})
