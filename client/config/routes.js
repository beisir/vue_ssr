// import Todo from '../views/todo/todo.vue'// 下面异步组件的情况下取消 这里的引用
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // 定义路由参数
    // 匹配的应该是 /app/任何变量  只要在app/后面都会仍为是参数
    // path: '/app/:id',
    path: '/app/',

    // 会将:id的参数当作props  传入这个组件
    props: true,

    // 当作默认值传入props，在组件中接受 这种方式用'/app/:id'
    // props: {
    //   id: 123
    // },

    // 这种方式返回对象 使用query接受
    // props: (route) => ({id: route.query}),

    // component: Todo,

    // 异步组件引入  这里接受一个函数
    // 如果使用import('。。。')这种方式的话需要安装插件
    // babel-plugin-syntax-dynamic-import
    // 同时修改.babelsrc 文件配置
    // 在plugins数组中添加:['syntax-dynamic-import']
    // 异步路由的好处就是会把每个js分别打包和引入 在不需要的情况下不会加载
    // 同时首屏加载的时候速度会变的更快
    component: () => import('../views/todo/todo.vue'),

    // 另外一种异步引入路由的方式这种方式不需要 插件支持
    // component:resolve => {
    //   require.ensure(['../views/todo/todo.vue'], () => {
    //     resolve(require('../views/todo/todo.vue'));
    //   }
    // },

    // 在单个路由router-view组件的时候可以使用component
    // 如果同级下有多个router-view的情况下 使用components
    // 但是得配置 name的方式引用
    // components: {
    //   default: Todo,
    //   aa: Login
    // },

    // 通过name命名 同时通过name进行路由跳转
    name: 'app',

    // 用来保存路由的一些信息
    meta: {
      title: 'this is app',
      discription: 'aaasadasda'
    },
    // 单个的组件的进入判断
    // 执行顺序是在全局的beforeEach和beforeResolve 之间
    beforeEnter (to, from, next) {
      console.log('app beforeEnter')
      next()
    },
    // 子路由
    children: [
      {
        path: 'test',
        component: Login
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/login/exact',
    component: Login
  }
]
