import Cookies from 'js-cookie'
import VueRouter from 'vue-router'

import Home from './Home'
import Login from './Login'
import NotFound from './NotFound'

const routes = [{path: '/', component: Login}, {path: '/home', component: Home}, {path: '*', component: NotFound}]

const router = new VueRouter({
  routes,
})

// Protected routes
router.beforeEach((to, from, next) => {
  switch (to.path) {
    case '/home':
      Cookies.get('token') ? next() : next('/')
      break
    default:
      next()
  }
})

export default router
