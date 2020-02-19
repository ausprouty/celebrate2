import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import defaultUser from './default-user'
import { saveStatePlugin } from '@/utils.js' // <-- Import saveStatePlugin

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user')) || defaultUser

export default new Vuex.Store({
  plugins: [saveStatePlugin], // <-- Use
  state: {
    user,
    appDir: {
      css: '/content/',
      styles: '/styles/',
      icons: '/images/icons/',
      root: '/images/'
    },
    revision: '0.1',
    baseURL: './',
    cssURL: './content/',
    standard: {
      image_dir: '',
      image: '',
      rldir: 'ltr',
      css: ''
    },
    content: {}
  },
  mutations: {
    LOGIN_USER(state, value) {
      state.user = value[0]
      console.log('token')
      console.log(state.user.token)
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    }
  },
  actions: {
    loginUser({ commit }, [mark]) {
      commit('LOGIN_USER', [mark])
    },
    register({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          console.log('user data is', userData)
          commit('SET_USER_DATA', data)
        })
    }
  }
})
