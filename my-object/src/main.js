import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Home from '@/components/Home'
import Login from '@/components/Login'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'

Vue.use(ElementUI)

Vue.config.productionTip = false
axios.defaults.baseURL=''
Vue.proptotype.$http=axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
