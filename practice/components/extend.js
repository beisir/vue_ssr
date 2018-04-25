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

// 在继承组件的方式中
// const NewCompon = Vue.extend(compoent)
//
// // 可以直接new继承出来的方法 并且使用vue实例方法
// new NewCompon({
//   el: '#root',
//   // 在有模版的情况下使用这种方式传参数
//   propsData: {
//     active: true
//   },
//   // 在用extend继承的方法内定义的data 可以直接覆盖上面继承的data
//   data: {
//     text: 'hahhahahahahah'
//   }
// })

const parent = new Vue({
  name: 'parent',
  data: {
    text: 'this is parent'
  }
})

const compone2 = {
  // 指定同哪个组件进行继承
  extends: compoent,
  data () {
    return {
      text: '111111111111'
    }
  },
  created () {
    console.log(this.$parent.$options.name)
  }
}
// 任何继承的调用方式都是 继承之前的组件，然后是继承的组件

new Vue({
  // 指定组件parent 只有在vue 的实例下可以
  parent: parent,
  name: 'root',
  el: '#root',
  components: {
    Comp: compone2
  },
  created () {
    console.log(this.$parent.$options.name)
  },
  data: {
    text: 'this is vue'
  },
  template: `<Comp :active="true"></Comp>`
})
