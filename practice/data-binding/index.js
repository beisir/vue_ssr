import Vue from 'vue'

// 下面一行注释  可以取消eslint对当前一行代码检测
// eslint-disable-line

new Vue({
  el: '#root',
  data: {
    isActive: false,
    html: '<span>aaaaaa</span>',
    name: 'hellow word',
    obj: {
      a: 123
    }
  },
  template: `<div>
    <p v-html="html"></p>
    <h3>{{name}}</h3>
    <div><input type="text" v-model="name" /></div>
    <div><h3>{{obj.a}}</h3></div>
    <div><input type="text" v-model="obj.a" /></div>
  </div>`,
  // 不要修改任何监听的属性
  watch: {
    name: {
      handler (newname, oldname) {
        console.log(newname, oldname)
      }
      // watch 里面开启这个配置 默认绑定的时候会执行一次
      // immediate: true
    },
    'obj.a': {
      handler (newobj, oldobj) {
        console.log(newobj, oldobj)
      }
      // deep: true
    }
  }
})
