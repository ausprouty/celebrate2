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
  async deleteItem(params) {
    console.log('entered delete item')
    console.log(params)
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=deleteItem&action=deleteItem',
      contentForm
    )
    console.log(res)
    let response = res.data.content
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
  async getMembers(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getMembers&action=getMembers',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async getGoals(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getGoals&action=getGoals',
      contentForm
    )
    console.log('from getGoals')
    console.log(res)
    let response = res.data.content
    return response
  },
  async getGoalsPage(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getGoalsPage&action=getGoalsPage',
      contentForm
    )
    console.log('from getGoals')
    console.log(res)
    let response = res.data.content
    return response
  },
  async getIcons(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getIcons&action=getIcons',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async getItem(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getItem&action=getItem',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async getImagePage(params) {
    var contentForm = this.toAuthorizedFormData(params)
    console.log(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getImagePage&action=getImagePage',
      contentForm
    )
    let response = res.data.content
    return response
  },

  async getPrayersTeam(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getPrayersTeam&action=getPrayersTeam',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async getPrayerUpdate(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getPrayerUpdate&action=getPrayerUpdate',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async getProgress(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getProgress&action=getProgress',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async getProgressPage(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getProgressPage&action=getProgressPage',
      contentForm
    )
    let response = res.data.content
    return response
  },

  async getProgressPageEntry(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getProgressPageEntry&action=getProgressPageEntry',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async getProgressToday(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getProgressToday&action=getProgressToday',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async getSettingsToday(params) {
    console.log('params')
    console.log(params)
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getSettingsToday&action=getSettingsToday',
      contentForm
    )
    console.log(res)
    let response = res.data.content
    return response
  },

  async getStandardItems(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getStandardItems&action=getStandardItems',
      contentForm
    )
    let response = res.data.content
    console.log(response)
    return response
  },
  async getTeam(params) {
    console.log('get team parameters')
    console.log(params)
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getTeam&action=getTeam',
      contentForm
    )
    let response = res.data.content
    return response
  },

  async getUser(params) {
    console.log(params)
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=getUser&action=getUser',
      contentForm
    )
    let response = res.data.content
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
    console.log('login')
    console.log(params)
    var contentForm = this.toAuthorizedFormData(params)
    let response = await apiSECURE.post(
      'AuthorApi.php?action=login',
      contentForm
    )
    return response
  },
  async updateGoals(params) {
    console.log('in updateGoals at AuthorService')
    console.log(params)
    var contentForm = this.toAuthorizedFormData(params)
    console.log(contentForm)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=updateGoals&action=updateGoals',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async updateItem(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=updateItem&action=updateItem',
      contentForm
    )
    let response = res.data.content
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
  async updateProgressToday(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=updateProgressToday&action=updateProgressToday',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async updateSettingsToday(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=updateSettingsToday&action=updateSettingsToday',
      contentForm
    )
    let response = res.data.content
    return response
  },
  async updateUserProfile(params) {
    var contentForm = this.toAuthorizedFormData(params)
    let res = await apiSECURE.post(
      'AuthorApi.php?page=updateUserProfile&action=updateUserProfile',
      contentForm
    )
    let response = res.data.content
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
