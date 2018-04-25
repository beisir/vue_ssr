import Vue from 'vue'
// v-pre:  加载标签上的表达式不会解析
// v-cloak： 在没有使用.vue的纯引入vue时  使用这个让html在加载中不会显示标签的内容
// v-once: 这个节点下面的内容不需要更新
new Vue({
  el: '#root',
  template: `<div>
    <div>
      <input type="checkbox" :value="1" v-model="arr" />
      <input type="checkbox" :value="2" v-model="arr" />
      <input type="checkbox" :value="3" v-model="arr" />
      <input type="checkbox" :value="4" v-model="arr" />
    </div>
  </div>`,
  data: {
    arr: [0, 2, 3, 4]
  }
})
