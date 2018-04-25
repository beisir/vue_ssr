<template>
    <!-- app.vue 的template标签内只能有一个节点 -->
    <div id="app">
        <div id="cover"></div>
        <appHeader></appHeader>
        <!-- <appTodo></appTodo> -->
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <router-link to="/app/123">app</router-link>
        <router-link to="/login">login</router-link>
        <router-link to="/exact">login exact</router-link>
        <!-- 添加组件的过度效果 -->
        <transition name="fade">
          <router-view />
        </transition>
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
    import appTodo from './views/todo/todo.vue'

export default {
      // 声明组件，之后便可以使用组件标签
      components: {
        appHeader,
        appFooter,
        appTodo
      },
      mounted () {
        // 获取路由信息参数等
        console.log(this.$route)
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
