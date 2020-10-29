import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'common/stylus/index.styl'
Vue.config.productionTip = false

import fastclick from 'fastclick'
fastclick.attach(document.body)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
