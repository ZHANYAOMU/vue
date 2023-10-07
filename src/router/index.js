import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/element/LoginView.vue'
import ElementView from '../views/element/ElementView.vue'
import UserInfoView from '../views/element/UserInfoView.vue'
import RandomTopicView from '../views/element/RandomTopicView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/element',
    name: 'element',
    component: ElementView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: UserInfoView
  },
  {
    path: '/randomtopic',
    name: 'randomtopic',
    component: RandomTopicView
  },
]

const router = new VueRouter({
  routes
})

export default router
