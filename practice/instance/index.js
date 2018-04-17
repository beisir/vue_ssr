import Vue from 'vue'

const app = new Vue({
// el: '#root',
  template: '<div ref="div">{{text}}   {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {
  //   text (newText, oldText){
  //     console(newText, oldText)
  //   }
  // }
})
// 和el的效果相同
app.$mount('#root')
// let i = 0
setInterval(() => {
  // i++
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
  // app.obj.a = i
  // 设置新的值 相当于给新值赋值
  // app.$set(app.obj, 'a', i)
  // 删除属性
  // app.$delete()
  // 强制组件重新渲染
  // app.$forceUpdate()
}, 1000)
// 属性
// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// console.log(app.$options)
// 有值发生变化的时候  会从新选染，此方法可行
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// app.$root === app; $root 是最外层的app对象
// console.log(app.$root)
// console.log(app.$chidlren)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// 服务端代码会用到
// console.log(app.$isServer)

// 方法
// 监听text属性 接受两个值 （变化当前的值，变化之前的值）
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(newText, oldText)
// })
// // unWatch 注销监听
// setTimeout(() => {
//   unWatch()
// }, 2000)

// 事件监听
// app.$on('test', (a,b) => {
//   console.log(`text emit ${a} ${b}`)
// })
// 只触发一次监听事件
// app.$once('test', (a, b) => {
//   console.log(`text emit ${a}:${b}`)
// })
// 事件触发 只作用在当前组件
// setInterval(() => {
//   app.$emit('test', 1, 3)
// }, 1000)

// 强制组件去渲染
// 设置新的值 相当于给新值赋值
// app.$set(app.obj, 'a', i)
// 删除属性
// app.$delete()
// 强制组件重新渲染
// app.$forceUpdate()

// vue下一次进行dom更新的时候调用该方法
// app.$nextTick(() => {
//   console.log('又一次')
// })
