import Vue from 'vue'
import Router from 'vue-router'

import Debug from './views/admin/Debug.vue'

import Login from './views/my/Login.vue'
import Logout from './views/my/Logout.vue'
import MyGoals from './views/my/MyGoals.vue'
import MyItem from './views/my/MyItem.vue'
import MyPrayers from './views/my/MyPrayers.vue'
import MyPrayerUpdate from './views/my/MyPrayerUpdate.vue'
import MyProfile from './views/my/MyProfile.vue'
import MyMonth from './views/my/MyMonth.vue'
import MySettingsToday from './views/my/MySettingsToday.vue'
import MyYear from './views/my/MyYear.vue'
import MyToday from './views/my/MyToday.vue'
import NotFoundComponent from './views/NotFound.vue'
import TeamGoals from './views/team/TeamGoals.vue'
import TeamItem from './views/team/TeamItem.vue'
import TeamMonth from './views/team/TeamMonth.vue'
import TeamProfile from './views/team/TeamProfile.vue'

import TeamRegister from './views/team/TeamRegister.vue'
import TeamYear from './views/my/TeamYear.vue'
import MyNavBar from './components/MyNavBar.vue'

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
      component: MyNavBar,
      props: false
    },
    {
      path: '/farm/:tid?',
      name: 'farm',
      component: TeamRegister,
      props: true
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      props: false
    },
    {
      path: '/my/:uid',
      name: 'myProfile',
      component: MyProfile,
      props: true
    },
    {
      path: '/my/goals/:uid/:tid/:year?',
      name: 'myGoals',
      component: MyGoals,
      props: true
    },
    {
      path: '/my/:uid/:tid/item/:id?',
      name: 'myItem',
      component: MyItem,
      props: true
    },
    {
      path: '/my/prayer/:uid/:tid/:pid',
      name: 'myPrayerUpdate',
      component: MyPrayerUpdate,
      props: true
    },
    {
      path: '/my/prayers/:uid/:tid/:year?/:month?',
      name: 'myPrayers',
      component: MyPrayers,
      props: true
    },
    {
      path: '/my/month/:uid/:tid/:year?/:month?/:page?',
      name: 'myMonth',
      component: MyMonth,
      props: true
    },
    {
      path: '/my/today/:uid/:tid/',
      name: 'myToday',
      component: MyToday,
      props: true
    },
    {
      path: '/my/today/settings/:uid/:tid/',
      name: 'mySettingsToday',
      component: MySettingsToday,
      props: true
    },
    {
      path: '/my/year/:uid/:tid/:item?/:year?',
      name: 'myYear',
      component: MyYear,
      props: true
    },
    {
      path: '/team/:tid',
      name: 'ourTeam',
      component: OurTeam,
      props: true
    },
    {
      path: '/team/:tid/goals/:year?',
      name: 'teamGoals',
      component: TeamGoals,
      props: true
    },
    {
      path: '/team/:tid/item/:id?',
      name: 'teamItem',
      component: TeamItem,
      props: true
    },
    {
      path: '/team/:tid/profile',
      name: 'teamProfile',
      component: TeamProfile,
      props: true
    },
    {
      path: '/team/:tid/:year?/:month?/:page?',
      name: 'teamMonth',
      component: TeamMonth,
      props: true
    },
    {
      path: '/my/year/:uid/:tid/:item?/:year?',
      name: 'teamYear',
      component: TeamYear,
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
