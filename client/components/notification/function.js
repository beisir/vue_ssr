import Vue from 'vue'
import Component from './fun-notification.js' // 获取默认模版

// 创建一个组件
const NotificationConstructor = Vue.extend(Component) // vue 继承方法

const instances = []
let seed = 1

const removeInstance = (instance) => {
    if (!instance) {
        return false
    }; // 如果没有传入
    let len = instances.length // 获取所有的实例对象

    // 循环判断当前要删除的 实例在 实例集合中的下标
    const index = instances.findIndex(inst => inst.id === instance.id)

    instances.splice(index, 1) // 删除实例

    if (len <= 1) {
        return false
    };
    const removeHeight = instance.vm.height // 获取当前实例节点的高度

    // 应为删除之后需要每个实例对象 更随下移，那么只要在删除当前节点之上的所有节点下移
    // 下标从删除节点开始 ，将每个节点的高度都减去一个删除的高度
    for (let i = index; i < len - 1; i++) {
        instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
    };
}

const notify = (options) => {
    // 应为服务端是咩有dom运行环境的所以判断是否是服务端
    if (Vue.prototype.$isServer) {
        return
    };
    const {
        autoClose,
        ...rest
    } = options
    // instance = 返回值为一个Vue 实例对象 就好比new Vue();
    const instance = new NotificationConstructor({
        // 如果传如参数  propsData 一般都是比传参数的定义 而data是可以由默认值，用来覆盖
        propsData: { // 在实例化extends组件构造器时，传入属性必须是propsData、而不是props
            ...rest
        },
        data: { // 创建外部传入消失秒数
            autoClose: autoClose === undefined ? 3100 : autoClose
        }
    })

    const id = `notification_${seed++}`
    // 可以为 实例对象添加id作为区分
    instance.id = id
    // 另外创建一个带有el dom节点的实力对象 ，在vue 没有$mount() 调用的时候是不会有 节点对象存在
    instance.vm = instance.$mount()
    // 创建对象添加在body
    document.body.appendChild(instance.vm.$el)

    // 将对象visible 对象设置为true 用来触发transtions 动画
    instance.vm.visible = true

    // 当前组件dom高度
    let verticalOffset = 0

    // 多个实例对象需要不重叠的情况下 从新计算之间的距离
    // 新创建的实例 需要在所有的 元素的上面 ，每个元素的高度 + 16的间隔  如果是多个就需要多个高度间隔
    instances.forEach((item) => {
        verticalOffset += item.$el.offsetHeight + 16
    })

    // 第一次时并没有数据只需要最底部距离不需要算其他实例距离
    verticalOffset += 16
    // 在实例上直接赋值，可以在组件中通过this访问
    instance.verticalOffset = verticalOffset

    instances.push(instance) // 添加数据列表

    // 监听当前组件 关闭时删除 dom节点
    instance.vm.$on('colsed', () => {
        removeInstance(instance)
        instance.vm.$destroy()
        document.body.removeChild(instance.vm.$el)
    })

    // 点击关闭的时候只需要暂时隐藏节点三秒之后会自动删除
    instance.vm.$on('colse', () => {
        instance.vm.visible = false
    })

    return instance.vm
}

export default notify
