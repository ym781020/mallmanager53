import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Right from '@/components/right/right'
import Role from '@/components/right/role'
import GoodsList from '@/components/goods/goods'
import GoodsAdd from '@/components/goods/goodsadd'
import Params from '@/components/goods/cateparams'
import GoodsCate from '@/components/goods/goodscate'

import { Message } from 'element-ui'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const router = new Router({
  routes: [
    // { path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        { name: 'rights', path: '/rights', component: Right },
        { name: 'roles', path: '/roles', component: Role },
        { name: 'goods', path: '/goods', component: GoodsList },
        { name: 'goodsadd', path: '/goodsadd', component: GoodsAdd },
        { name: 'params', path: '/params', component: Params },
        { name: 'categories', path: '/categories', component: GoodsCate }
      ]
    }
  ]
  // ,  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem("token")
    // config.headers["Authorization"] = token
    // console.log(token);
    if (!token) {
      Message.warning('请先登录！')
      router.push({ name: 'login' })
      return
    }
  }
  next()
})

export default router
