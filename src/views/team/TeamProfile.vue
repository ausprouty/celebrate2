<template>
  <div class="white">
    <NavBar />
    <div v-if="!this.authorized" class="not_authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now
      </p>
    </div>
    <div v-if="this.authorized">
      <h2 v-if="team.name" class="center">Update {{ team.name }}</h2>
      <h2 v-if="!team.name" class="center">New Team</h2>
      <div v-if="this.team_image">
        <img v-bind:src="this.team_image" class="team" />
      </div>

      <form @submit.prevent="saveForm">
        <BaseInput
          v-model="$v.team.name.$model"
          label="Team Name"
          type="text"
          placeholder
          class="field"
          :class="{ error: $v.team.name.$error }"
          @mousedown="$v.team.name.$touch()"
        />
        <template v-if="$v.team.name.$error">
          <p v-if="!$v.team.name.required" class="errorMessage">Team Name is required</p>
        </template>
        <br/><br/>
        <BaseInput
          v-model="$v.team.code.$model"
          label="Code"
          type="text"
          placeholder
          class="field"
          :class="{ error: $v.team.code.$error }"
          @mousedown="$v.team.code.$touch()"
        />
        <template v-if="$v.team.code.$error">
          <p v-if="!$v.team.code.required" class="errorMessage">Code is required</p>
        </template>

        <br />
        <button class="button green" id="update" @click="saveForm">Update</button>
        <button class="button red" id="delete"  @click="deleteForm">Delete</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/TeamNavBar.vue'

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
      team: {
        tid: null,
        name: null,
        code: null,
        game:null
      },
      team_image: null,
      submitted: false,
      wrong: null,
      registered: true
    }
  },
  computed: mapState(['user']),
  validations: {
    team: {
      name: { required },
      code: { required },
    }
  },
  methods: {
    async saveForm() {
      try {
        this.disableButton('update')
        this.disableButton('delete')
        var params = this.team
        params.authorizer = this.user.uid
        console.log (params)
        await AuthorService.updateTeamProfile(params)
        this.show()
      } catch (error) {
        console.log('Update There was an error ', error) //
      }
    },

    async deleteForm() {
      try {
        this.disableButton('update')
        this.disableButton('delete')
        var params = this.team
        params.authorizer = this.user.uid
        let res = await AuthorService.deleteTeam(params)
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
      this.authorized = this.authorize('global', null, this.$route.params.tid)
      if (this.authorized) {
        try {
          var params = {}
          params.tid = this.$route.params.tid
          this.team = await AuthorService.getTeam(params)
          if (this.team.image) {
            this.team_image = this.team.image
          }

          console.log(this.team)
        } catch (error) {
          console.log('There was an error in TeamProfile.vue:', error) // Logs out the error
        }
      }
    }
  },
  beforeCreate: function() {
    document.body.className = 'team'
  },
  async created() {
    this.show()
  }
}
</script>
<style scoped>
h2{
  color:#2d9593;
}

</style>
