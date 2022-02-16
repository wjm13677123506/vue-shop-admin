import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/Users/User.vue'
import Roles from '../components/power/roles.vue'
import Welcome from '../components/Welcome.vue'
import Rights from '../components/power/rights.vue'
import GoodsCate from '../components/goods/GoodsCate.vue'
import GoodsParam from '../components/goods/GoodsParam.vue'
import GoodsList from '../components/goods/GoodsList.vue'
import GoodsAdd from '../components/goods/GoodsAdd.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    redirect: '/welcome',
    component: Home,
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/categories',
        component: GoodsCate
      },
      {
        path: '/params',
        component: GoodsParam
      },
      {
        path: '/goods',
        component: GoodsList
      },
      {
        path: '/goods/add',
        component: GoodsAdd
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (to.path === '/login') return next()
  if (!token) return next('/login')
  next()
})

export default router
