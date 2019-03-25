<template>
<section class="real-app">
    <div class="tab-container">
        <Tabs :value="filter" @change="handChangeTable">
            <Tab :label="val" :index="val" v-for="val in states" :key="val"></Tab>
        </Tabs>
    </div>



    <input type="text" class="add-input" autofocus="autofocus" placeholder="接下来要做什么?" @keyup.enter="handleAdd">

    <!-- 使用items组件 -->
    <!-- :todo="todo" 往子组件item.vue 传入todo对象
            v-for="todo in filteredTodos" 遍历 todos 数组
             @del="deleteTodo" 接收子组件要触发的del方法
        -->
    <appItem :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo" @toggle="toggleTodoState">
    </appItem>
    <!--
            用 key 管理可复用的元素
            Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
            这么做除了使 Vue 变得非常快之外，还有其它一些好处。
        -->


    <!-- 使用tabs组件 -->
    <helper :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAllCompleted="clearAllCompleted">
    </helper>

    <router-view />

</section>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex';


import appItem from './items.vue'
import helper from './helper.vue'
let id = 0
export default {
    metaInfo: {
        title: 'Todo meta App'
    },
    // 组件内部的路由拦截
    // 在没有next()的情况下拿不到组件上的this
    // 因为组件现在还有真正被调用
    // 但是可以通过next方法上的回调 vm参数去拿到this
    beforeRouteEnter (to, from, next) {
        // console.log('todo before beforeEnter')
        // 但是vm这种方式有个问题
        // 就是如果你的路由配置中是components 的话是不会触发传入的 props
        // 所以2这种方式只适合单个路由component 不适合 多个components
        next(vm => {
          // console.log(`todo this 下的 ${vm.id}`)
        })
    },
    // 只有调用时路由的参数变化的时候才会触发
    // 路由数据参数更新之后触发
    // 在这里有个注意 mounted 在组件第一次加载的时候会被触发
    // 但是在没有刷新页面进入的组件的第二次就不会被触发
    // 这种情况下使用 beforeRouteUpdate
    beforeRouteUpdate (to, from, next) {
        // console.log('todo beforeRouteUpdate')
        next()
    },
    // 可以用来控制页面离开的一个行为的方式
    beforeRotueLeave (to, from, next) {
        // console.log('todo beforeRotueLeave')
        next()
    },
    // data() 声明数据
    // 在router中定义props：true 可以将 /app/:id 当作props传入参数来获取
    props: ['id'],
    mounted () {
        // setTimeout(() => {
        //     this.active = '3';
        // }, 5000)

        // console.log(this.id)


        this.fetchTodos();
    },
    data () {
        return {
          // todos: [],
          states: ['all', 'active', 'completed'],
          filter: 'all',
          inputContent: ''
        }
    },
  // 计算
    computed: {
        filteredTodos () {
            if (this.filter === 'all') {
                return this.todos
            };
            const completed = this.filter === 'completed'
            // 将todos数组中，completed为true的值过滤出来，并返回一个新数组
            return this.todos.filter(todo => completed === todo.completed)
        },
        ...mapState(['todos'])
    },
    // 组件
    components: {
        appItem,
        helper
    },
  // 方法
    methods: {
        ...mapActions([
            'fetchTodos',
            'addTodo',
            'deleteTodo',
            'updateTodo',
            'deleteAllComputed'

        ]),

        toggleTodoState (todo) {
            this.updateTodo({
                id: todo.id,
                todo: Object.assign({}, todo, {
                    computed: !todo.computed
                })
            });

        },
        handChangeTable (filter) {
            this.filter = filter
        },

        handleAdd (e) {
            let content =  e.target.value.trim()
            if (!content) {
                this.$notify({
                    content: '请输入内容'
                });
                return;
            };
            const todo = {
                content,
                computed: false
            };

            this.addTodo(todo);
            e.target.value = '';
            console.log(e.target.value);

        },
        // deleteTodo (id) {
        //     this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
        // },
        toggleFilter (state) {
            this.filter = state
        },
        clearAllCompleted () {
            // 给todos赋一个新的值（即todo.completed为false的值）
            // this.todos = this.todos.filter(todo => todo.completed === false)


            this.deleteAllComputed();
        }
    }
}
</script>

<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
    .tab-container {
        background-color: white;
        padding: 0 15px;
    }
</style>
