<template>
  <div>
    <div v-if="!authorized">
      <div id="nav">
        <router-link to="/">
          <img class="nav-icon" alt="Home" src="/images/menu/ribbons/TeamTopRibbon600.png" />
        </router-link>
      </div>
    </div>
    <div v-if="authorized">
      <div class="dropdown">
        <img class="nav-icon" alt="Home" src="/images/menu/ribbons/TeamTopRibbon600.png" />
        <div class="dropdown-content">
          <div v-for="menuItem in menu" :key="menuItem.index" :menuItem="menuItem">
            <div
              v-if="showItem(menuItem.show, leader)"
              class="item"
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
  data() {
    return {
      authorized: false,
      menu: [
        {
          index: 0,
          value: 'Team Progress',
          show: true,
          link: 'teamProgress'
        },
        {
          index: 1,
          value: 'Team Goals',
          show: false,
          link: 'teamGoals'
        },
        {
          index: 2,
          value: 'Team Profile',
          show: false,
          link: 'teamProfile'
        },
        {
          index: 4,
          value: 'Our Team',
          show: true,
          link: 'ourTeam'
        },
        {
          index: 5,
          value: 'Return',
          show: true,
          link: 'myToday'
        },
        {
          index: 6,
          value: 'Logout',
          show: false,
          link: 'logout'
        }
      ]
    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    showItem(show, leader) {
      if (show || leader) {
        return true
      }
      return false
    },
    setNewSelectedOption(selectedOption) {
      this.showMenu = false
      this.$router.push({
        name: selectedOption.link,
        params: {
          tid: this.user.team,
          uid: this.user.uid
        }
      })
    }
  },
  created() {
    this.authorized = this.authorize(
      'team-member',
      null,
      this.$route.params.tid
    )
    this.leader = this.authorize('team', null, this.$route.params.tid)
  }
}
</script>

<style scoped>
/*//https://www.w3schools.com/howto/howto_css_dropdown.asp*/

/* Dropdown Button */
.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: blue;

  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.item {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  color: white;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content .item:hover {
  background-color: red;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>
