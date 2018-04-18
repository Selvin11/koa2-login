import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 使用element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/fontawesome.less'
Vue.use(Element)

// api
import rest from './rest'

new Vue({
  router,
  store,
  rest,
  render: h => h(App)
}).$mount('#app')
