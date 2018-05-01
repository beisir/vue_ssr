import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app.vue'
import './assets/styles/global.styl'

import routerConfig from './config/router.js'
import storeConfig from './store/store.js'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = storeConfig(Vuex)
const router = routerConfig(VueRouter)

// vuex动态创建模块
store.registerModule('c', {
  state: {
    text: 3
  }
})

// 动态解绑registerModule
// store.unregisterModule('c')

// 用来监听state的变化， 第一个函数用来监听
// 第二个函数用来执行返回监听到变换的回调
// store.watch((state) => {
//   return state.count + 1
// }, (newCount) => {
//   console.log(newCount)
// })

// 监听mutation 的回调 ，参数为一个函数， 函数俩个参数
// 第一个参数为对象 有当前调用mutation的信息， 以及一些传入的值
// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

// 监听action 的回调 ，参数为一个函数， 函数俩个参数
// 第一个参数为对象 有当前调用mutation的信息， 以及一些传入的值
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

console.log(store)

const root = document.createElement('div')
document.body.appendChild(root)

// 全局的导航首位 全局的路由拦截拦截
// 跳转之前触发 必须由next方法才能成功跳转

// 验证用户登陆或者验证数据
router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  // if (to.fullPath === '/app/123') {
  //   next('/login')
  //   // next({
  //   //   path: '/login'
  //   //   // replace: true  // 删除跳转之前一次的历史记录
  //   // })
  // } else {
  next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})

// 跳转完成之后触发
router.afterEach((to, from) => {
  console.log('afterEach')
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
