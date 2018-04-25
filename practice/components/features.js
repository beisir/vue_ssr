import Vue from 'vue'

// 有时候在这个组件定义props的时候 又需要实现双向绑定 就会有冲突 需要用model来解决
const compoent = {
  // template: `<div :style="style">
  //   <!-- 具名插槽：指定在组件调用的地方放入的地方 -->
  //   <h1 class="header">
  //     <slot name="header"></slot>
  //   </h1>
  //   <h3 class="body">
  //     <slot name="body"></slot>
  //   </h3>
  //   <slot></slot>
  // </div>`,
  // 作用域插槽
  template: `<div :style="style">
    <slot aa="哈哈哈" bb="😯"></slot>
    <i>{{data.value}}</i>
  </div>`,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: 'solid #000 1px'
      }
    }
  },
  // 引用父级或者 祖级的 provide 属性抛出的方法
  // 可以用过this引用数据
  // 又一个缺点就是 他接收的数据不会随着祖级 改变而改变
  inject: ['gandfater', 'data'],
  created () {
    console.log(this.gandfater, this.value)
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
  // 像子级 或者 孙级的组件抛出 数据
  // 又一个缺点就是 他发出的数据子级不会随着 改变而改变
  // 手动添加 get 方法获取
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })

    return {
      gandfater: this,
      data
    }
  },
  mounted () {
    // ref 在组件上面和标签上的区别
    console.log(this.$refs)
  },
  // 作用域插槽
  // 通过slot-scope 传入一个值
  template: `<div>
    <comp-one ref="comone">
      <span ref="span" slot-scope="result">{{result.aa}} =>>>> {{result.bb}}</span>
    </comp-one>
    <input type="text" v-model="value" />
  </div>`
  // // 具名插槽
  // template: `<div>
  //   <comp-one>
  //     <span slot="header">this is header content</span>
  //     <span slot="body">this is body content</span>
  //   </comp-one>
  // </div>`
})
