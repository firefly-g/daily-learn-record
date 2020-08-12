import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, { TimelineItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import TreeTable from 'vue-table-with-tree-grid' 
import VueQuillEditor from 'vue-quill-editor'   //导入富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import Timeline from './timeline/index.js'
// import timelineItem from './timeline-item/index.js'


export default {
  components: {
    VueQuillEditor
  }
}

// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'

Vue.filter('dataFormat',function(originVal){
  const dt=new Date(originVal)
  const y=dt.getFullYear()
  const m=(dt.getMonth()+1+'').padStart(2,'0')
  const d=(dt.getDate()+'').padStart(2,'0')
  const hh=(dt.getHours()+'').padStart(2,'0')
  const mm=(dt.getMinutes()+'').padStart(2,'0')
  const ss=(dt.getSeconds()+'').padStart(2,'0')

// return `yyyy-mm-dd hh:mm:ss`
return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.use(ElementUI)
//将富文本编辑器注册为全局组件·
Vue.use(VueQuillEditor)
Vue.component('tree-table', TreeTable)
// Vue.use(Timeline)
// Vue.use(TimelineItem)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
// ajax   fetch 
Vue.prototype.$http = axios;
//设置拦截器
axios.interceptors.request.use(config=>{
  console.log(config)       //在最后必须要return
  config.headers.Authorization=window.sessionStorage.getItem('token');
  return config
})
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
