<template>
  <div id="nav">
    <div v-on:click="toggleMenu()">
      <img class="nav-icon" alt="Home" src="/images/menu/ribbons/TopRibbon600.png" />
    </div>
    <div v-if="showMenu">
      <div v-for="menuItem in this.menu" :key="menuItem.link" :menuItem="menuItem">
        <div class="menu-card -shadow" v-if="menuItem.show">
          <div
            class="float-left"
            style="cursor:pointer"
            @click="setNewSelectedOption(menuItem.link)"
          >{{ menuItem.value }}</div>
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
  data() {
    return {
      showMenu: false,
      authorized: false,
      administrator: false,
      menu: [
        {
          value: 'Login',
          link: 'login',
          index: 0,
          show: true
        },
        {
          value: 'Logout',
          link: 'logout',
          index: 1,
          show: false
        }
      ]
    }
  },
  created() {
    var scope = 'group'

    this.authorized = this.authorize('read', scope)
    this.administrator = this.authorize('register', scope)
    console.log('I finished authorization')

    if (this.authorized) {
      this.menu[0].show = false
      this.menu[1].show = true
    }
    if (this.administrator) {
      this.menu[0].show = false
      this.menu[1].show = true
    }
    if (!this.authorized) {
      this.menu[0].show = true
      this.menu[1].show = false
    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    toggleMenu() {
      console.log('tried to toggle')
      if (this.showMenu) {
        this.showMenu = false
      } else {
        this.showMenu = true
      }
    },
    setNewSelectedOption(selectedOption) {
      switch (selectedOption) {
        case 'login':
          this.$router.push({
            name: 'login'
          })
          break
        case 'logout':
          this.user = null
          this.$router.push({
            name: 'login'
          })
          break
        default:
          console.log('Can not find route in NavBarAdmin')
        // code block
      }
    }
  }
}
</script>

<style></style>
