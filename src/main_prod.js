import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import './assets/font_shop/iconfont.css'
import './assets/css/global.css'
import ZkTable from 'vue-table-with-tree-grid'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 富文本样式表
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme
import axios from 'axios'

// 导入进度条插件
import NProgress from 'nprogress'
// 导入进度条样式
// import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.component('treeTable', ZkTable)
// 富文本
Vue.use(VueQuillEditor)

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

axios.interceptors.request.use((config) => {
  NProgress.start()
  const token = sessionStorage.getItem('token')
  config.headers.Authorization = token
  // console.log(config)
  return config
})

// 在response拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  // 当进入response拦截器，表示请求已经结束，我们就结束进度条
  NProgress.done()
  return config
})

Vue.filter('dateFormate', (val) => {
  const dt = new Date(val)
  const y = padZero(dt.getFullYear())
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())
  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

function padZero(n) {
  return n > 9 ? n : '0' + n
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
