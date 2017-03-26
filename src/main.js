// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

// css
import './assets/font/iconfont.css'
import './assets/reset.css'

import image from './components/components/image.vue'

Vue.component('v-image', image)

global.DOMAIN = 'http://www.pokerlady.com.cn'

Vue.config.productionTip = false

Vue.filter('imageFormat', (value) => {
  return global.DOMAIN + value
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
