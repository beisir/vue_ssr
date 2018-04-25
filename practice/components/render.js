import Vue from 'vue'

const compoent = {
  // template: `<div :style="style">
  //   <slot aa="哈哈哈" bb="😯"></slot>
  //   <i>{{hello}}</i>
  // </div>`,
  // this.$slots.default: 创建slot的插槽.default 是在slot没有name名默认时
  props: ['props1'],
  render (h) {
    return h('div', {
      style: this.style,
      on: {
        click: () => { this.$emit('click') }
      }
    }, [this.$slots.default, this.props1])
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: 'solid #000 1px'
      },
      hello: 'hello word'
    }
  },
  created () {
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
  mounted () {
    // ref 在组件上面和标签上的区别
    // console.log(this.$refs)
  },
  // template: `<div>
  //   <comp-one ref="comone">
  //     <span ref="span"></span>
  //   </comp-one>
  // </div>`,
  render (createElement) {
    // $createElement === createElement
    // vue创建组件，传属性，参数等
    // 1: '节点名'，
    // 2: ‘节点上面的属性’
    return createElement('comp-one', {
      ref: 'comone',
      props: {
        props1: 'this is prop1'
      },
      // on: {
      //   click: this.handleClick
      // },
      nativeOn: {
        click: this.handleClick
      }
    }, [this.$createElement('span', {
      ref: 'span'
    }, this.value)
    ])
  },
  methods: {
    handleClick () {
      console.log('触发')
    }
  }
})
