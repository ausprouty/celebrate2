<template>
  <div class="white">
    <NavBar v-bind="menu"></NavBar>
    <div v-if="!this.authorized" class="not_authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now.
      </p>
    </div>
    <div v-if="this.authorized">
      <h2 v-if="member.firstname">Update {{ member.firstname }} {{ member.lastname }}</h2>
      <h2 v-if="team.name">Enter new member(s) for {{ team.name }}</h2>
      <div v-if="this.single_entry">

          <button class="button grey" id="update" @click="manyMembers">Enter Many People</button>
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
            v-model="$v.member.phone.$model"
            label="Phone"
            type="text"
            placeholder
            class="field"
          />
          <p
            v-if="!team.name"
            @click="changePassword()"
            class="change"
          >Change Username, Password or Email</p>

          <div v-if="this.change_password">
            <BaseInput
              v-model="$v.member.username.$model"
              label="Username"
              type="text"
              placeholder
              class="field"
            />
            <BaseInput
              v-model="$v.member.email.$model"
              label="Email"
              type="text"
              placeholder
              class="field"
            />

            <BaseInput
              v-model="$v.member.password.$model"
              label="Password"
              type="password"
              placeholder
              class="field"
            />
          </div>

          <br />
          <br />
          <button class="button green" id="update" click="saveForm">Update</button>
          <button class="button red" id="delete" @click="deleteForm">Delete</button>
        </form>
      </div>
      <div v-if="!this.single_entry">
        <button class="button grey" id="update" @click="oneMember">Enter Only One Person</button>
        <BaseTextarea
          label="Enter Many People"
          v-model="this.multiple_people"
          type="textarea"
          class="field paragraph"
        />
        <p>(Tab Delimited) First Name, Last Name, Email</p>
        <button class="button green" id="update" @click="createTeamMembers">Record These Members</button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/NavBar.vue'

import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { authorMixin } from '@/mixins/AuthorMixin.js'

export default {
  components: {
    NavBar
  },
  props: ['uid', 'tid'],
  mixins: [authorMixin],
  computed: mapState(['user', 'appDir']),
  data() {
    return {
      member: {
        scope: null,
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        image: 'blank.png',
        username: null,
        password: null
      },
      team: {
        name: null
      },
      change_password: false,
      member_image: null,
      submitted: false,
      wrong: null,
      registered: true,
      single_entry: true,
      multiple_people: 'a'
    }
  },
  validations: {
    member: {
      scope: { required },
      firstname: { required },
      lastname: { required },
      email: { required },
      phone: {},
      image: {},
      username: {},
      password: {}
    }
  },
  methods: {
    oneMember() {
      this.single_entry = true
    },
    manyMembers() {
      this.single_entry = false
    },
    async createTeamMembers() {
      console.log (this.multiple_people)
      try {
        if (!this.saved) {
          this.saved = true
          this.disableButton('update')
          this.disableButton('delete')
          var params = {}
          params.tid = this.$route.params.tid
          params.authorizer = this.user.uid
          params.members = this.multiple_people        
          console.log('params for SaveMembers')
          console.log(params)
          let res = null
          await AuthorService.createTeamMembers(params)
          this.show()
        }
      }
    },
    async saveForm() {
      try {
        if (!this.saved) {
          this.saved = true
          this.disableButton('update')
          this.disableButton('delete')
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
        }
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
    changePassword() {
      if (this.change_password === false) {
        this.change_password = true
      } else {
        this.change_password = false
      }
    },
    async show() {
      this.authorized = this.authorize(
        'team',
        this.$route.params.uid,
        this.$route.params.tid
      )
      if (this.authorized) {
        try {
          var params = {}
          this.menu = await this.menuParams('Team Member Profile', 'M')
          if (typeof this.$route.params.uid != 'undefined') {
            params.uid = this.$route.params.uid
            this.member = await AuthorService.getUser(params)
            this.member.password = null
            if (this.member.image) {
              this.member_image = '/images/members/' + this.member.image
            }
            console.log(this.member)
          } else {
            params.tid = this.$route.params.tid
            this.team = await AuthorService.getTeam(params)
            this.change_password = true
            this.single_entry = false
            console.log(this.team)
          }
        } catch (error) {
          console.log('There was an error in TeamMemberProfile.vue:', error) // Logs out the error
        }
      }
    }
  },
  beforeCreate: function() {
    document.body.className = 'user'
  },
  async created() {
    this.show()
  }
}
</script>
<style scoped>
.change {
  color: green;
}
</style>
