import Vue from 'vue'

// 有时候在这个组件定义props的时候 又需要实现双向绑定 就会有冲突 需要用model来解决
const compoent = {
  // 自定义的 组件v-model
  model: {
    prop: 'value1', //设置v-model 传入参数名字
    event: 'hasn'  // 指定v-model 接受的派发参数 
  },
  props: ['value1'],
  template: `<div>
      <input type="text" @input="handleInput" :value="value1"/>
    </div>`,
  methods: {
    handleInput (e) {
      this.$emit('hasn', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: compoent
  },
  data () {
    return {
      value: '1234',
      text: 'hello root'
    }
  },
  // 实际上v-model的实现方法就是在组件上 传入参数 添加事件监听 并且 在内部派发 外部监听
  template: `<div>
    <!-- <comp-one :value="value" @input="value = arguments[0]"></comp-one> -->
    <comp-one v-model="value"></comp-one>
  </div>`
})
