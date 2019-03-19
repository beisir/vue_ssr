import Vue from 'vue'
import Component from './fun-notification.js'

// 创建一个组件
const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const notify = (options) => {
  // 应为服务端是咩有dom运行环境的所以判断是否是服务端
  if (Vue.prototype.$isServer) { return };
  const instance = new NotificationConstructor({})
  const id = `notification_${seed++}`

  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = 0
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  return instance.vm
}

export default notify
