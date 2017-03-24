// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'npm-zepto'

$.ajax({
  type: 'GET',
  async: false,
  url: 'http://ui.jiazaiyun.com/Web/api?act=getCarouselList&callback=test',
  dataType: 'jsonp',
  jsonp: 'callback',
  success: function (data) {
    console.log(data)
  },
  error: function () {
    alert('fail')
  }
})

// css
import './assets/font/iconfont.css'
import './assets/reset.css'

import image from './components/components/image.vue'

Vue.component('v-image', image)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
