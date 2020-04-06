import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import tabPan from '@/components/tabPan'
import login from '@/pages/login'
import course from '@/pages/course/index'
import home from '@/pages/home/index'
import course_setting from '@/pages/course/course_setting'

Vue.use(Router)

const router = new Router({
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
        {
          path: 'course_setting',
          name: 'course_setting',
          component: course_setting
        }
      ]

    },
    {
      path: '/',
      name: 'login',
      component: login
    },
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/') {  
    next();
  } 
  else {
      let token = localStorage.getItem('accessToken');   
      if (token === null || token === '') {  //如果token为空，跳到登录页面
          next('/');
      } else {   //否则，正常跳转
          next();
      }
  }
});
export default router;