// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 使用element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/style/fontawesome.less'
Vue.use(Element)

// import axios from './util/interceptor.js'

// Vue.prototype.$http = axios

// api
import rest from './rest'

import store from './store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  rest,
  store,
  template: '<App/>',
  components: { App }
})
