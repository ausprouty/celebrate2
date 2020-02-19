import axios from 'axios'
import store from '@/store/store.js'

//const apiURL = process.env.VUE_API_URI
const apiURL = 'https://create.myfriends.network/api/'
console.log(apiURL)

const apiSECURE = axios.create({
  baseURL: apiURL,
  withCredentials: false, // This is the default
  crossDomain: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// I want to export a JSON.stringified of response.data.content.text
export default {
  /////////////////////////////////////////////////
  async debug(params) {
    console.log('debug')
    var contentForm = this.toAuthorizedFormData(params)
    var action = 'AuthorApi.php?page=debug&action=' + params.action
    apiSECURE.post(action, contentForm)
  },

  ////////////////////////////////////////////////
  async deleteUser(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let response = await apiSECURE.post(
      'AuthorApi.php?page=deleteUser&action=deleteUser',
      contentForm
    )
    //  console.log('response from  deleteUser')
    //  console.log(response)
    return response
  },

  async getUser(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getUser&action=getUser',
      contentForm
    )
    console.log('response from  getUsers')
    console.log(res)
    let response = res.data.content
    console.log(response)
    return response
  },
  async getUsers(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getUsers&action=getUsers',
      contentForm
    )
    let response = JSON.parse(res.data.content)
    return response
  },
  async login(params) {
    console.log('in login at AuthorService')
    var contentForm = this.toAuthorizedFormData(params)
    let response = await apiSECURE.post(
      'AuthorApi.php?action=login',
      contentForm
    )
    console.log('about to leave login at AuthorService')
    return response
  },

  toAuthorizedFormData(params) {
    params.my_uid = store.state.user.uid
    params.token = store.state.user.token
    var form_data = new FormData()
    for (var key in params) {
      form_data.append(key, params[key])
    }
    // Display the key/value pairs
    //   for (var pair of form_data.entries()) {
    //     console.log(pair[0] + ', ' + pair[1])
    //    }
    //console.log(form_data)
    return form_data
  },
  async updateUser(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let response = await apiSECURE.post(
      'AuthorApi.php?page=updateUser&action=updateUser',
      contentForm
    )
    return response
  }
}