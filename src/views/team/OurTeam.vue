<template>
  <div>
    <NavBar />
    <div v-if="!this.authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now
      </p>
    </div>
    <div v-if="this.authorized" class="white">
      <h1>{{ this.team.name }}</h1>
      <UserList v-for="user in users" :key="user.uid" :user="user" />
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/AuthorService.js'
import UserList from '@/components/UserList.vue'
import { authorMixin } from '@/mixins/AuthorMixin.js'
import NavBar from '@/components/TeamNavBar.vue'

export default {
  props: ['tid'],
  components: {
    UserList,
    NavBar
  },

  mixins: [authorMixin],
  data() {
    return {
      authorized: false,
      team: [
        {
          tid: null,
          code: null,
          name: null
        }
      ],
      users: [
        {
          firstname: null,
          lastname: null,
          uid: null,
          image: null
        }
      ]
    }
  },
  async created() {
    this.authorized = this.authorize('register', this.$route.params.tid)
    if (this.authorized) {
      try {
        var params = {}
        params.tid = this.$route.params.tid
        this.team = await AuthorService.getTeam(params)
        this.users = await AuthorService.getMembers(params)
      } catch (error) {
        console.log('There was an error in Team.vue:', error) // Logs out the error
      }
    }
  }
}
</script>
<style scoped>
.white {
  background-color: white;
}
</style>
