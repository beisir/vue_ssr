<template>
    <!-- app.vue 的template标签内只能有一个节点 -->
    <div id="app">
        <div id="cover"></div>

        <!-- <p>this is vuex {{count}}</p> -->
        <!-- <p>{{counter}}</p>

        <h3>{{fullName}}</h3>

        <h1>vuex 分模块的方式调用state =>>> {{textA}}</h1>
        <h1>vuex 分模块的方式调用getters =>>> {{textPlus}}</h1>

        <h1>动态创建的模块{{textC}}</h1> -->

        <appHeader></appHeader>
        <!-- <appTodo></appTodo> -->
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <!-- <router-link to="/app/123">app</router-link>
        <router-link to="/login">login</router-link>
        <router-link to="/exact">login exact</router-link> -->

        <!-- 添加组件的过度效果 -->
        <transition name="fade">
          <router-view />
        </transition>

        <button type="button" @click="noteifyFn">点击</button>

        <!-- 第二个router-view
          如果一个链接跳入的router-view有两个的情况下
          必须在router的配置中改成components{}的方式
          同时在router-view 加上name字段-->
        <!-- <router-view name="aa" /> -->

        <!-- <Notification content="helloword"></Notification> -->
        <appFooter></appFooter>
    </div>
</template>

<script>
    // 引入header.vue组件
    import appHeader from './views/layout/header.vue'
    // console.log(appHeader.__docs) // 查看docs组件内容 未开启
    // 引入footer.jsx组件—
    import appFooter from './views/layout/footer.jsx'
    // 引入todo.vue组件
    // import appTodo from './views/todo/todo.vue'
    import {
      mapState,
      mapGetters,
      mapActions,
      mapMutations
    } from 'vuex'
let i = 0
export default {
      metaInfo: {
        title: 'VueSSR APP'
      },
      // 声明组件，之后便可以使用组件标签
      components: {
        appHeader,
        appFooter
      },
      mounted () {
        // 获取路由信息参数等
        // console.log(this.$route)
        // 调用vuex的方法
        // let i = 1
        // setInterval(() => {
        //   // vuex调用mutations 修改state 方法
        //   // this.$store.commit('updateCount', i++)
        //   this.updateCount(i++)
        // }, 1000)
        // vuex 允许变量可以在外部修改，但是不支持这么做
        // 通过vuex 实例上的strict方法禁止掉这种外部修改的方式
        // this.$store.state.count = 34
        // dispatch 提交actions 一般用于异步操作
        // 异步操作不允许直接提交mutations
        // 所以可以通过actions提交再去触发mutations
        // this.$store.dispatch('updateCountAsync', {
        //   num: 5,
        //   time: 2000
        // })
        // 也可以通过辅助函数解构出来进行操作
        this.updateCountAsync({
          num: 5,
          time: 2000
        })
        // vuex 分模块调用mutations全局命名
        // this.updateText(7890)
        // 加上namespaced 的方式
        this['a/updateText'](4567)
        // 通过模块命名的方式调用getters
        // console.log(this['a/textPlus'])
        // console.log(this.textPlus)
        this['a/add']('ooo')
        // 调用其他模块的mutations
        this.testAction()
      },
      computed: {
        // vuex分模块通过命名空间调用
        // textA () {
        //   return this.$store.state.b.text
        // },
        // 结构vuex的辅助函数的state
        // 但是默认babel不支持所以要借助插件
        // babel-preset-stage-1: 支持最高版本的js语法，包括es8
        // 同时在.babelrc 文件的 presets: ['stage-1'] 加入配置
        // ...mapState(['count']),
        ...mapState({
          counter: 'count',
          // counter: (state) => {
          //   return state.count
          // }
          // vuex 通过命名空间进行调用该方法
          // 需要使用这种方式进行vuex分模块的方式调用
          textA: state => state.a.text,
          // 动态创建的模块
          textC: state => state.c.text
        }),
        // ...mapGetters(['fullName', 'a/textPlus'])
        // count () {
        //   return this.$store.state.count
        // },
        // fullName () {
        //   return this.$store.getters.fullName
        // }
        // vuex 通过命名空间进行调用该方法
        // 需要使用这种方式进行vuex分模块的方式调用
        ...mapGetters({
          'fullName': 'fullName',
          'textPlus': 'a/textPlus'
        })
      },
      methods: {
        ...mapActions([
          // 全局的
          'updateCountAsync',
          'testAction',
          // 命名空间的
          'a/add'
        ]),
        ...mapMutations([
          'updateCount',
          // updateText作为分模块的方式也可以是这么直接调用mutations方式
          // 之所以不需要上面state那么麻烦的重新命名方式引用
          // 是因为vuex默认会把mutations放到全局的命名空间当中
          // 'updateText'
          // 如果想区分开全局的命名需要在vuex 模块下加 namespaced： true
          // 同时在 下方使用 ‘a/updateText’ 这种方式引用
          // 同时通过this调用的时候也通过this['a/updateText'] 这种方式
          'a/updateText'
        ]),
        noteifyFn () {
          this.$notify({
            content: `test content ======> ${i++}`,
            btn: '关闭'
          })
        }
      }
    }
</script>

<!-- 设置scoped 表示当前组件下的id只在当前组件起作用，不会跟其他组件引起冲突 -->
<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #555
        opacity 0.5
        z-index -1
    }
</style>
