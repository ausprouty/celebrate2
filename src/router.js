import Vue from 'vue'
import Router from 'vue-router'

import Debug from './views/admin/Debug.vue'
import Home from './views/Home.vue'
import Login from './views/user/Login.vue'
import MyCelebrations from './views/user/MyCelebrations.vue'
import NotFoundComponent from './views/NotFound.vue'
import Register from './views/team/Register.vue'
import User from './views/user/User.vue'
import Team from './views/team/Team.vue'
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
      path: '/user/celebrations/:uid',
      name: 'myCelebrations',
      component: MyCelebrations,
      props: true
    },
    {
      path: '/team/:tid',
      name: 'team',
      component: Team,
      props: true
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
