// import Router from 'vue-router'
import routes from './routes'

export default (Router) => {
  return new Router({
    mode: 'history',
    routes,
    // 作为应用 基路径 在路由前面都会加入 localhost:8080/base/app
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // to:去到的路由
    // from：从哪个路由去到的路由
    // savedPosition: 记录的上次滚动条的位置等等。。。
    scrollBehavior (to, from, savedPosition) {
      // 如果有上次的滚动位置就反回上次的滚动位置
      if (savedPosition) {
        return savedPosition
      // 否则将滚动条的位置初始化，到最上面和最左面
      } else {
        return {x: 0, y: 0}
      }
    },
    // 将地址栏的参数获取，并且定制参数返回的格式
    // 接受一个字符串
    // parseQuery (query) {
    //
    // },
    // // 接受一个对象
    // stringifyQuery (obj) {

    // },
    // 有些浏览器不支持前端history路由跳转
    // 自动不支持的情况下 vue自动转为hash方式
    fallback: true

  })
}
