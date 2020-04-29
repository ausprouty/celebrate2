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
  async do(what, params) {
    console.log (what)
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=' + what + '&action=' + what,
      contentForm
    )
    let response = res.data.content
    return response
  },

  async debug(params) {
    console.log('debug')
    var contentForm = this.toAuthorizedFormData(params)
    var action = 'AuthorApi.php?page=debug&action=' + params.action
    apiSECURE.post(action, contentForm)
  },

  ////////////////////////////////////////////////

  async deleteTeam(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let response = await apiSECURE.post(
      'AuthorApi.php?page=deleteTeam&action=deleteTeam',
      contentForm
    )
    return response
  },

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

  async getItemsCelebrationSet(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getItemsCelebrationSet&action=getItemsCelebrationSet',
      contentForm
    )
    let response = JSON.parse(res.data.content)
    return response
  },
  async getItemsMember(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getItemsMember&action=getItemsMember',
      contentForm
    )
    let response = JSON.parse(res.data.content)
    return response
  },
  async getItemsStandard(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getItemsStandard&action=getItemsStandard',
      contentForm
    )
    let response = JSON.parse(res.data.content)
    return response
  },
  async getItemsTeam(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getItemsTeam&action=getItemsTeam',
      contentForm
    )
    let response = JSON.parse(res.data.content)
    return response
  },

  async login(params) {
    console.log('login')
    console.log(params)
    var contentForm = this.toAuthorizedFormData(params)
    let response = await apiSECURE.post(
      'AuthorApi.php?action=login',
      contentForm
    )
    return response
  },

  async updateProgressPageEntry(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=updateProgressPageEntry&action=updateProgressPageEntry',
      contentForm
    )
    var response = null
    //if (typeof res.data.content != undefined ){
    //  response = res.data.content
    // }
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
    //for (var pair of form_data.entries()) {
    //  console.log(pair[0] + ', ' + pair[1])
    //}
    // console.log(form_data)

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
