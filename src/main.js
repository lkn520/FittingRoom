// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import infiniteScroll from 'vue-infinite-scroll'
import utils from './utils'

// css
import './assets/font/iconfont.css'
import './assets/reset.css'

import image from './components/components/image.vue'

Vue.use(utils)
Vue.use(infiniteScroll)

Vue.component('v-image', image)

global.DOMAIN = 'http://b.pokerlady.com.cn'

Vue.config.productionTip = false

// 过滤器
Vue.filter('imageFormat', (value) => {
  return global.DOMAIN + value
})

Vue.filter('priceFormat', (value) => {
  return value + '元'
})

Vue.filter('upperCase', (value) => {
  return value.toUpperCase()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem('user_id')) {
      next({
        name: 'signin'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

router.afterEach((to, from, next) => {
  let navRouter = ['home', 'type', 'type-user', 'user', 'user-goods']
  if (navRouter.indexOf(to.name) === -1) {
    vm.$store.commit('toggleFooter', false)
  } else {
    vm.$store.commit('toggleFooter', true)
  }
})
