<template>
  <div>
    <NavBar />
    <div v-if="!this.authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now
      </p>
    </div>
    <div v-if="this.authorized">
      <h2>Update {{ member.firstname }} {{ member.lastname }}</h2>
      <div v-if="this.member_image">
        <img v-bind:src="this.member_image" class="member" />
      </div>

      <form @submit.prevent="saveForm">
        <BaseInput
          v-model="$v.member.firstname.$model"
          label="First Name"
          type="text"
          placeholder
          class="field"
          :class="{ error: $v.member.firstname.$error }"
          @mousedown="$v.member.firstname.$touch()"
        />
        <template v-if="$v.member.firstname.$error">
          <p v-if="!$v.member.firstname.required" class="errorMessage">First Name is required</p>
        </template>

        <BaseInput
          v-model="$v.member.lastname.$model"
          label="Last Name"
          type="text"
          placeholder
          class="field"
          :class="{ error: $v.member.lastname.$error }"
          @mousedown="$v.member.lastname.$touch()"
        />
        <template v-if="$v.member.lastname.$error">
          <p v-if="!$v.member.lastname.required" class="errorMessage">Last Name is required</p>
        </template>

        <BaseInput
          v-model="$v.member.username.$model"
          label="Username"
          type="text"
          placeholder
          class="field"
          :class="{ error: $v.member.username.$error }"
          @mousedown="$v.member.username.$touch()"
        />
        <template v-if="$v.member.username.$error">
          <p v-if="!$v.member.username.required" class="errorMessage">Username is required</p>
        </template>

        <BaseInput
          v-model="$v.member.password.$model"
          label="Password"
          type="password"
          placeholder
          class="field"
          :class="{ error: $v.member.password.$error }"
          @mousedown="$v.member.password.$touch()"
        />
        <template v-if="$v.member.password.$error">
          <p v-if="!$v.member.password.required" class="errorMessage">Password is required</p>
        </template>

        <br />
        <br />
        <button class="button green" @click="saveForm">Update</button>
        <button class="button red" @click="deleteForm">Delete</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/NavBarHamburger.vue'

import { authorMixin } from '@/mixins/AuthorMixin.js'

import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    NavBar
  },
  props: ['uid'],
  mixins: [authorMixin],
  data() {
    return {
      member: {
        firstname: null,
        lastname: null,
        scope: null,
        username: null,
        password: null
      },
      member_image: null,
      submitted: false,
      wrong: null,
      registered: true
    }
  },
  computed: mapState(['user']),
  validations: {
    member: {
      firstname: { required },
      lastname: { required },

      username: {},
      password: {}
    }
  },
  methods: {
    async saveForm() {
      try {
        var params = this.member
        console.log('Save Form')
        console.log(this.member)
        params.member_uid = this.member.uid
        params.authorizer = this.user.uid
        console.log('params for SaveForm')
        console.log(params)
        let res = null
        await AuthorService.updateUserProfile(params)
        this.show()
      } catch (error) {
        console.log('Update There was an error ', error) //
      }
    },

    async deleteForm() {
      try {
        var params = {}
        params.authorizer = this.user.uid
        params.member_uid = this.member.uid
        params.member_username = this.member.username
        console.log('params from DeleteForm')
        console.log(params)
        let res = await AuthorService.deleteUser(params)
        console.log('res from Author Service')
        console.log(res)
        if (res.data.error) {
          this.registered = false
          this.error_message = res.data.message
        } else {
          this.registered = true
          this.$router.push({
            name: 'farm'
          })
        }
      } catch (error) {
        console.log('Delete There was an error ', error) //
      }
    },
    async show() {
      this.authorized = this.authorize(
        'write',
        this.$route.params.uid,
        this.$route.params.tid
      )
      if (this.authorized) {
        try {
          console.log ('you are authorized')
          var params = {}
          params.uid = this.$route.params.uid
          this.member = await AuthorService.getUser(params)
          this.member.password = null
          if (this.member.image) {
            this.member_image = '/images/members/' + this.member.image
          }

          console.log(this.member)
        } catch (error) {
          console.log('There was an error in MyProfile.vue:', error) // Logs out the error
        }
      }
    }
  },
  async created() {
    this.show()
  }
}
</script>
