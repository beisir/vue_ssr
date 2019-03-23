<template lang="html">
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="notification" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
            <span class="content">{{content}}</span>
            <a class="btn" @click="handleColse">{{btn}}</a>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Notification', // 默认的 name名。是为了 Vue.component(xxxxxname, xxxx);使用更方便
    props: {
        content: { // 默认参数 提示内容
            type: String,
            required: true
        },
        btn: { // 关闭文字
            type: String,
            default: 'X'
        }
    },
    computed: {
        style() { // 计算属性div样式添加样式
            return {}
        }
    },
    data() {
        return {
            visible: true // 默认为true 通过div的显示隐藏出发弹出框的动画
        }
    },
    methods: {
        handleColse(e) { // 关闭派发事件
            e.preventDefault()
            this.$emit('colse')
        },
        afterLeave() { // 动画结束派发事件
            this.$emit('colsed')
        },
        afterEnter() {}, // 动画进入之后
        clearTimer() {}, // 默认清除自动隐藏 主要由外侧传入覆盖，或者使用vue.use(模版时使用);
        createTimer() {} // 创建动画自动隐藏 规则同上
    }

}
</script>


<style lang="stylus" scoped>
.notification
  display: inline-flex
  background-color #303030
  color rgba(255, 255, 255, 1)
  align-items center
  padding 20px
  min-width 280px
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  flex-wrap wrap
  transition all .3s
.content
  padding 0
.btn
  color #ff4081
  padding-left 24px
  margin-left auto
  cursor pointer
</style>
