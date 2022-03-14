import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Home.vue')
const Users = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Users/User.vue')
const Roles = () => import(/* webpackChunkName:"login_home_welcome" */'../components/power/roles.vue')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */'../components/Welcome.vue')
const Rights = () => import(/* webpackChunkName:"login_home_welcome" */'../components/power/rights.vue')
const GoodsCate = () => import(/* webpackChunkName:"login_home_welcome" */'../components/goods/GoodsCate.vue')
const GoodsParam = () => import(/* webpackChunkName:"login_home_welcome" */'../components/goods/GoodsParam.vue')
const GoodsList = () => import(/* webpackChunkName:"login_home_welcome" */'../components/goods/GoodsList.vue')
const GoodsAdd = () => import(/* webpackChunkName:"login_home_welcome" */'../components/goods/GoodsAdd.vue')
const Order = () => import(/* webpackChunkName:"login_home_welcome" */'../components/order/orders.vue')
const Reports = () => import(/* webpackChunkName:"login_home_welcome" */'../components/report/reports.vue')

// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Users from '../components/Users/User.vue'
// import Roles from '../components/power/roles.vue'
// import Welcome from '../components/Welcome.vue'
// import Rights from '../components/power/rights.vue'
// import GoodsCate from '../components/goods/GoodsCate.vue'
// import GoodsParam from '../components/goods/GoodsParam.vue'
// import GoodsList from '../components/goods/GoodsList.vue'
// import GoodsAdd from '../components/goods/GoodsAdd.vue'
// import Order from '../components/order/orders.vue'
// import Reports from '../components/report/reports.vue'

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
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/reports',
        component: Reports
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
