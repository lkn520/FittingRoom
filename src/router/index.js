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
      component (resolve) {
        require(['@/components/type'], resolve)
      },
      children: [
        {
          path: '',
          name: 'type',
          component (resolve) {
            require(['@/components/type-types'], resolve)
          }
        },
        {
          path: 'user',
          name: 'type-user',
          component (resolve) {
            require(['@/components/type-user'], resolve)
          }
        }
      ]
    },
    {
      path: '/user',
      component (resolve) {
        require(['@/components/user'], resolve)
      },
      children: [
        {
          path: '',
          name: 'user',
          component (resolve) {
            require(['@/components/user-fitting'], resolve)
          }
        },
        {
          path: 'goods',
          name: 'user-goods',
          component (resolve) {
            require(['@/components/user-goods'], resolve)
          }
        }
      ]
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
      name: 'fitting-detail',
      component (resolve) {
        require(['@/components/fitting-detail'], resolve)
      }
    },
    {
      path: '/type/goods/:id',
      name: 'type-goods',
      component (resolve) {
        require(['@/components/type-goods'], resolve)
      }
    }
  ]
})
