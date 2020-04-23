<template>
  <div class="white">
    <img src="/images/menu/black.png" />
    <h2>Login</h2>
    <form @submit.prevent="saveForm">
      <BaseInput
        v-model="username"
        label="Username"
        type="text"
        placeholder
        class="field"
        :class="{ error: $v.username.$error }"
        @blur="$v.username.$touch()"
      />
      <template v-if="$v.username.$error">
        <p v-if="!$v.username.required" class="errorMessage">Username is required.</p>
      </template>

      <BaseInput
        v-model="password"
        label="Password"
        type="password"
        placeholder
        class="field"
        :class="{ error: $v.password.$error }"
        @blur="$v.password.$touch()"
      />
      <template v-if="$v.password.$error">
        <p v-if="!$v.password.required" class="errorMessage">Password is required.</p>
      </template>
      <br />
      <br />
      <button class="button red" @click="saveForm">Login</button>

    
      <template v-if="wrong">
        <p class="errorMessage">Wrong username or password. Try again</p>
      </template>
    </form>
      <button class="button grey" @click="retrievePassword">Forgot Password</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AuthorService from '@/services/AuthorService.js'
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
      wrong: null
    }
  },
  computed: mapState(['user']),
  validations: {
    username: { required },
    password: { required }
  },
  methods: {
    async retrievePassword() {
      var params = {}
      if (this.username) {
        params.username = this.username
        await AuthorService.retrievePassword(params)
        this.$router.push({
          name: 'myPasswordSent'
        })
      } else {
        alert ('Please enter username so we can retrieve your password')
       
      }
    },
    async saveForm() {
      try {
        var params = {}
        var response = {}
        this.$store.dispatch('loginUser', [response])
        params.username = this.username
        params.password = this.password
        let res = await AuthorService.login(params)
        if (res.data.content) {
          response = res.data.content
          response.token = res.data.token
          response.expires = res.data.content.expires * 1000
          var date = new Date()
          response.now = date.getTime()
          this.$store.dispatch('loginUser', [response])
          this.$router.push({
            name: 'myToday',
            params: {
              uid: response.uid,
              tid: response.team
            }
          })
        } else {
          this.wrong = true
          console.log(
            'It seems you have forgotten your password.  Please conrtact Bob Prouty'
          )
        }
      } catch (error) {
        console.log('Login There was an error ', error) //
      }
    }
  },
  beforeCreate: function() {
    document.body.className = 'user'
  },
  async created() {
    if (typeof this.user.expires != 'undefined') {
      if (this.user.expires > this.user.now) {
        this.$router.push({
          name: 'myToday',
          params: {
            uid: this.user.uid,
            tid: this.user.team
          }
        })
      }
    }
  }
}
</script>
