import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import tabPan from '@/components/tabPan'
import login from '@/pages/login'
import course from '@/pages/course/index'
import home from '@/pages/home/index'

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
        {
          path: 'course',
          name: "course",
          component: course,
        },
        {
          path: 'home',  //主页
          name: "home",
          component: home,
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
