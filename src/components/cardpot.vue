<template>
  <div>
    <div v-if="!authorized">
      <div id="nav">
        <router-link to="/">
          <img class="nav-icon" alt="Home" src="/images/menu/ribbons/TopRibbon600.png" />
        </router-link>
      </div>
    </div>
    <div v-if="authorized">
      <div v-on:click="toggleMenu()">
        <img class="nav-icon" alt="Home" src="/images/menu/ribbons/TopRibbon600.png" />
      </div>
      <div v-if="showMenu">
        <div v-for="menuItem in this.menu" :key="menuItem.index" :menuItem="menuItem">
          <div class="menu-card -shadow" v-if="menuItem.show">
            <div
              class="float-left"
              style="cursor:pointer"
              @click="setNewSelectedOption(menuItem)"
            >{{ menuItem.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { authorMixin } from '@/mixins/AuthorMixin.js'
export default {
  computed: mapState(['user']),
  mixins: [authorMixin],
  created() {
    this.authorized = this.authorize('read', this.$route.params.country_code)
  },
  data() {
    return {
      authorized: false,
      showMenu: false,
      menu: [
        {
          index: 0,
          value: 'Today',
          show: true,
          link: 'myToday',
          params: {
            uid: this.user.uid,
            tid: this.user.tid
          }
        },
        {
          index: 1,
          value: "Let's Pray",
          show: true,
          link: 'myPrayer',
          params: {
            uid: this.user.uid,
            tid: this.user.tid
          }
        },
        {
          index: 2,
          value: 'My Progress',
          show: false,
          link: 'myProgress',
          params: {
            uid: this.user.uid,
            tid: this.user.tid
          }
        },
        {
          index: 3,
          value: 'My Goals',
          show: true,
          link: 'myGoals',
          params: {
            uid: this.user.uid,
            tid: this.user.tid
          }
        },
        {
          index: 4,
          value: 'Our Team',
          show: true,
          link: 'ourTeam',
          params: {
            uid: this.user.uid,
            tid: this.user.tid
          }
        },
        {
          index: 5,
          value: 'My Profile',
          show: true,
          link: 'myProfile',
          params: {
            uid: this.user.uid,
            tid: this.user.tid
          }
        },
        {
          index: 6,
          value: 'Logout',
          show: false,
          link: 'logout',
          params: {
            uid: this.user.uid,
            tid: this.user.tid
          }
        }
      ]
    }
  },

  methods: {
    goBack() {
      window.history.back()
    },
    toggleMenu() {
      console.log('tried to toggle this')
      if (this.showMenu) {
        this.showMenu = false
        console.log('toggle off')
      } else {
        console.log('toggle on')
        this.showMenu = true
      }
    },
    setNewSelectedOption(selectedOption) {
      this.showMenu = false
      this.$router.push({
        name: selectedOption.name,
        params: selectedOption.params
      })
    }
  }
}
</script>

<style></style>
