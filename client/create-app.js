// 每一次服务端渲染都需要渲染一个新的app对象

import Vue from 'vue'
import VueRouter from 'vue-router'

import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app.vue'
import createStore from './store/store.js'
import createRouter from './config/router.js'
import Notification from './components/notification'
import './assets/styles/global.styl'
import Tabs from './components/tabs'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

export default () => {
    const router = createRouter(VueRouter)
    const store = createStore(Vuex)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    return {
        app,
        router,
        store
    }
}
