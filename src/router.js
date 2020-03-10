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
import MyMonth from './views/user/MyMonth.vue'
import MySettingsToday from './views/user/MySettingsToday.vue'
import MyYear from './views/user/MyYear.vue'
import MyToday from './views/user/MyToday.vue'
import NotFoundComponent from './views/NotFound.vue'
import TeamGoals from './views/team/TeamGoals.vue'
import TeamItem from './views/team/TeamItem.vue'
import TeamProfile from './views/team/TeamProfile.vue'
import TeamProgress from './views/team/TeamProgress.vue'
import TeamRegister from './views/team/TeamRegister.vue'
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
      path: '/user/month/:uid/:tid/:year?/:month?/:page?',
      name: 'myMonth',
      component: MyMonth,
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
      path: '/user/year/:uid/:tid/:item?/:year?',
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
      name: 'teamProgress',
      component: TeamProgress,
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
