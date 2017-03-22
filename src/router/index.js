import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component (resolve) {
        require(['@/components/home'], resolve)
      }
    },
    {
      path: '/type',
      name: 'type',
      component (resolve) {
        require(['@/components/type'], resolve)
      }
    },
    {
      path: '/user',
      name: 'user',
      component (resolve) {
        require(['@/components/user'], resolve)
      }
    },
    {
      path: '/fitting',
      name: 'fitting',
      component (resolve) {
        require(['@/components/fitting'], resolve)
      }
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component (resolve) {
        require(['@/components/goods'], resolve)
      }
    },
    {
      path: '/fitting/detail/:id',
      name: 'fitting_detail',
      component (resolve) {
        require(['@/components/fitting_detail'], resolve)
      }
    },
    {
      path: '/type/goods/:id',
      name: 'type_goods',
      component (resolve) {
        require(['@/components/type_goods'], resolve)
      }
    }
  ]
})
