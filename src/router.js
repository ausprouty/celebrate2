import Vue from 'vue'
import Router from 'vue-router'

import Debug from './views/admin/Debug.vue'

import Login from './views/user/Login.vue'
import Logout from './views/user/Logout.vue'
import MyGoals from './views/user/MyGoals.vue'
import MyItem from './views/user/MyItem.vue'
import MyPrayers from './views/user/MyPrayers.vue'
import MyPrayerUpdate from './views/user/MyPrayerUpdate.vue'
import MyProfile from './views/user/MyProfile.vue'
import MyProgress from './views/user/MyProgress.vue'
import MySettingsToday from './views/user/MySettingsToday.vue'
import MyToday from './views/user/MyToday.vue'
import NotFoundComponent from './views/NotFound.vue'
import Register from './views/team/Register.vue'
import NavBarHamburger from './components/NavBarHamburger.vue'

import OurTeam from './views/team/OurTeam.vue'
import Validate from './views/Validate.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      props: false
    },
    {
      path: '/debug',
      name: 'debugger',
      component: NavBarHamburger,
      props: false
    },
    {
      path: '/farm',
      name: 'farm',
      component: Register,
      props: true
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      props: false
    },
    {
      path: '/user/:uid',
      name: 'myProfile',
      component: MyProfile,
      props: true
    },
    {
      path: '/user/goals/:uid/:tid/:year?',
      name: 'myGoals',
      component: MyGoals,
      props: true
    },
    {
      path: '/user/:uid/:tid/item/:id?',
      name: 'myItem',
      component: MyItem,
      props: true
    },
    {
      path: '/user/prayer/:uid/:tid/:pid',
      name: 'myPrayerUpdate',
      component: MyPrayerUpdate,
      props: true
    },
    {
      path: '/user/prayers/:uid/:tid/:year?/:month?',
      name: 'myPrayers',
      component: MyPrayers,
      props: true
    },
    {
      path: '/user/progress/:uid/:tid/:year?/:month?/:page?',
      name: 'myProgress',
      component: MyProgress,
      props: true
    },
    {
      path: '/user/today/:uid/:tid/',
      name: 'myToday',
      component: MyToday,
      props: true
    },
    {
      path: '/user/today/settings/:uid/:tid/',
      name: 'mySettingsToday',
      component: MySettingsToday,
      props: true
    },
    {
      path: '/team/:tid',
      name: 'ourTeam',
      component: OurTeam,
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
