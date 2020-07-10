import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Right from '@/components/right/right'
import Role from '@/components/right/role'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
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
        { name: 'roles', path: '/roles', component: Role }
      ]
    }
    
  ]
  // ,  mode: 'history'
})
