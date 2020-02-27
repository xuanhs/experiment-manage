import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import tabPan from '@/components/tabPan'
import login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: 'tabPan',
          name: 'tabPan',
          component: tabPan,
        },
      ]

    },
    {
      path: '/',
      name: 'login',
      component: login
    },
  ]
})
