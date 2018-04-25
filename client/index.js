import Vue from 'vue'
import App from './app.vue'
import router from './config/router.js'
import './assets/styles/global.styl'
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router: router(),
  render: (h) => h(App)
}).$mount(root)
