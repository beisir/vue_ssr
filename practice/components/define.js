import Vue from 'vue'

let data = {
  text: 'this is compoentns'
}
const compoent = {
  data () {
    return data
  },
  // props 不仅仅可以传递数据 也可以传递function
  props: {
    active: {
      type: Boolean,
      required: true
    },
    propOne: {
      type: String,
      // 自定义验证
      validator (val) {
        console.log(val)
        return val
      }
    },
    propChange: Function

  },
  methods: {
    handleClick () {
      this.propChange()
    }
  },
  template: `<div>
      <input type="text" v-model="text" />
      <div>{{text}}</div>
      <div><i @click="handleClick">{{propOne}}</i></div>
      <h3 v-show="active">index.html</h3>
    </div>`
}
// 全局注册组件
// Vue.component('CompOne', compoent)

new Vue({
  el: '#root',
  components: {
    CompOne: compoent
  },
  methods: {
    hand () {
      console.log(123123)
      this.text += 100
    }
  },
  data: {
    text: 'this text1'
  },
  template: `<div>
      <comp-one :prop-one="text" :active="true" :prop-change="hand"></comp-one>
      <comp-one :active="false"></comp-one>
  </div>`
})
