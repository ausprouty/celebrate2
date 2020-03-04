import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'
Vue.use(Vuex)

export const authorMixin = {
  computed: mapState(['user']),
  methods: {
    authorize(reason, uid, tid) {
      console.log (this.user)
      if (typeof this.user.expires == 'undefined') {
        this.$router.push({ name: 'login' })
      }
      // check if expired
      var date = new Date()
      var timestamp = date.getTime()
      if (this.user.expires < timestamp) {
        this.$router.push({ name: 'login' })
      }
      // is this your record?
      if (this.user.uid == uid && this.user.team == tid ){
        console.log ('this is your record')
        return true
      }
      // do you have global authority?
      var scope = ''
      if (typeof this.user.scope != 'undefined') {
        scope = this.user.scope
        console.log (scope)
      }
      if (scope == 'global') {
        console.log ('you have global authority')
        return true
      } 
      // are you a team leader?
      if (scope == 'team' && this.user.team == tid){
        console.log ('you are team leader')
        return true
      }
      return false
    }
  }
}
