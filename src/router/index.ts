import { createRouter, createWebHashHistory, Router } from "vue-router";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router: Router = createRouter({
  history: createWebHashHistory(),
  // 路由懒加载
  routes: [
    {
      name: 'login',
      path: '/',
      meta: { title: '登录' },
      component: () => import('../views/login.vue')
    },
    {
      path: '/login',
      redirect: '/'
    },
    {
      path: '/index',
      redirect:'/home',
      meta: { title: '酒店信息综合平台' },
      component: () => import('../views/index.vue'),
      children: [
        {
          path: '/home',
          meta: { title: '首页' },
          component: () => import('../views/home.vue')
        }, {
          path: '/message',
          meta: { title: '消息' },
          component: () => import('../views/message.vue')
        },
        {
          path: '/mine',
          meta: { title: '个人中心' },
          component: () => import('../views/user/mine.vue')
        }, {
          path: '/setpwd',
          meta: { title: '修改密码' },
          component: () => import('../views/user/setpwd.vue')
        }, {
          path: '/role',
          meta: { title: '角色管理' },
          component: () => import('../views/user/role.vue')
        }, {
          path: '/user',
          meta: { title: '用户管理' },
          component: () => import('../views/user/user.vue')
        }, {
          path: '/roomtype',
          meta: { title: '房型管理' },
          component: () => import('../views/room/roomtype.vue')
        }, {
          path: '/room',
          meta: { title: '房间管理' },
          component: () => import('../views/room/room.vue')
        }, {
          path: '/livein',
          meta: { title: '入住管理' },
          component: () => import('../views/custom/livein.vue')
        },
        {
          path: '/order',
          meta: { title: '订单管理' },
          component: () => import('../views/custom/order.vue')
        },
        {
          path: '/menu',
          meta: { title: '菜单管理' },
          component: () => import('../views/system/menu.vue')
        },
        {
          path: '/dictionary',
          meta: { title: '首页' },
          component: () => import('../views/system/dictionary.vue')
        }]
    },
  ]
})


// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  let isAuthenticated = false; // 应该使用你的认证状态
  if (localStorage.getItem('role')) isAuthenticated = true
  if (to.path != '/' && !isAuthenticated) {
    next({ name: 'login' }); // 如果未认证，跳转到登录页面
  } else {
    next(); // 否则继续导航
  }
});

router.afterEach((to, from, next)=>{
  if(to.meta && to.meta.title){
    document.title = to.meta.title
  }
  NProgress.done()
})

export default router