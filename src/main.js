import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/font_shop/iconfont.css'
import './assets/css/global.css'
import ZkTable from 'vue-table-with-tree-grid'

import axios from 'axios'

Vue.config.productionTip = false

Vue.component('treeTable', ZkTable)

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  config.headers.Authorization = token
  // console.log(config)
  return config
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
