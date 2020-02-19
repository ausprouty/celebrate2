import Vue from 'vue'
import Router from 'vue-router'

import Debug from './views/Debug.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import NotFoundComponent from './views/NotFound.vue'
import Register from './views/Register.vue'
import User from './views/User.vue'
import Users from './views/Users.vue'
import Validate from './views/Validate.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/farm',
      name: 'farm',
      component: Register,
      props: true
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      props: false
    },
    {
      path: '/user/:uid',
      name: 'user',
      component: User,
      props: true
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      props: false
    },
  
    {
      path: '/debug/',
      name: 'debug',
      component: Debug,
      props: false
    },

    {
      path: '/validate',
      name: 'validate',
      component: Validate,
      props: false
    },

    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
