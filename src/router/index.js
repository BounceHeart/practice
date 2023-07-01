import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/main/main'),
    children: [
      {
        path: '',
        component: () => import('@/views/index'),
        name: 'Index',
        // meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user'),
        name: 'User',
      },
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile'),
        name: 'Profile',
      },
      {
        path: 'role',
        component: () => import('@/views/system/role'),
        name: 'Role',
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu'),
        name: 'Menu',
      },
      {
        path: 'authRole/:userId(\\d+)',
        name: 'AuthRole',
        component: () => import('../views/system/user/authRole'),
      },
      {
        path: 'authUser/:roleId(\\d+)',
        name: 'AuthUser',
        component: () => import('../views/system/role/authUser'),
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('../views/system/dept'),
      },
      {
        path: 'post',
        name: 'Post',
        component: () => import('../views/system/post'),
      },
      {
        path: 'dict',
        name: 'Dict',
        component: () => import('../views/system/dict'),
      },
      {
        path: 'dictData/:dictId(\\d+)',
        name: 'DictData',
        component: () => import('../views/system/dict/data'),
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('../views/system/config'),
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('../views/system/notice'),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
  }
]

// const router = new Router({
//   routes
// })

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes,
})
