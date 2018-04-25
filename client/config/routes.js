import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // 定义路由参数
    // 匹配的应该是 /app/任何变量  只要在app/后面都会仍为是参数
    path: '/app/:id',
    // 会将:id的参数当作props  传入这个组件
    // props: true,
    // props: {
    //   // 当作默认值传入props，在组件中接受 这种方式用'/app/:id'
    //   id: 123
    // },
    // 这种方式返回对象 使用query接受
    props: (route) => ({id: route.query}),
    component: Todo,
    // 通过name命名 同时通过name进行路由跳转
    name: 'app',
    // 用来保存路由的一些信息
    meta: {
      title: 'this is app',
      discription: 'aaasadasda'
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
