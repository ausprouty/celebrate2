<template>
  <div id="nav">
    <router-link to="/">
      <img class="nav-icon" alt="Home" src="/images/menu/ribbons/MyTopRibbon600.png" />
    </router-link>

    <div class="container">
      <div id="my_menu" class="dropdown-content">
        <div v-for="menuItem in my_menu" :key="menuItem.index" :menuItem="menuItem">
          <div
            class="item"
            style="cursor:pointer"
            @click="setNewSelectedOption(menuItem)"
          >{{ menuItem.value }}</div>
        </div>
      </div>
      <div id="team_menu" class="dropdown-content">
        <div v-for="menuItem in team_menu" :key="menuItem.index" :menuItem="menuItem">
          <div
            class="item"
            style="cursor:pointer"
            @click="setNewSelectedOption(menuItem)"
          >{{ menuItem.value }}</div>
        </div>
      </div>
      <div class="back hand float" @click="goBack()">
        <img class="icon hand" src="/images/icons/standard/back_48x48.png" />
      </div>
      <div class="hand pad float" @hover="showMyMenu()">
        <img class="icon hand" src="/images/icons/standard/person_48x48.png" />
      </div>

      <div class="team float pad" @click="showTeamMenu()">
        <img class="icon hand" src="/images/icons/standard/group_48x48.png" />
      </div>
      <div class="my float pad">
        <img class="member hand" v-bind:src="appDir.members + image" />
      </div>
      <div class="breadcrumb float pad">{{ this.breadcrumb }}</div>

      <div class="time float pad" v-if="time">{{ time }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['user', 'my', 'appDir']),
  props: {
    image: String,
    time: String,
    breadcrumb: String
  },
  data() {
    return {
      authorized: true,
      my_menu: [
        {
          index: 0,
          value: 'Today',
          show: true,
          link: 'myToday'
        },
        {
          index: 1,
          value: "Let's Pray",
          show: true,
          link: 'myPrayers'
        },
        {
          index: 2,
          value: 'My Disciples',
          show: true,
          link: 'myDisciples'
        },
        {
          index: 3,
          value: 'My Month',
          show: true,
          link: 'myMonth'
        },
        {
          index: 4,
          value: 'My Goals',
          show: true,
          link: 'myGoals'
        },
        {
          index: 5,
          value: 'My Year',
          show: true,
          link: 'myYear'
        },

        {
          index: 6,
          value: 'My Profile',
          show: true,
          link: 'myProfile'
        },
        {
          index: 7,
          value: 'Our Team',
          show: true,
          link: 'ourTeam'
        },
        {
          index: 8,
          value: 'Logout',
          show: true,
          link: 'logout'
        }
      ],
      team_menu: [
        {
          index: 0,
          value: 'Our Team',
          show: true,
          link: 'ourTeam'
        },
        {
          index: 1,
          value: 'Monthly Progress',
          show: true,
          link: 'teamMonth'
        },
        {
          index: 2,
          value: 'Yearly Progress',
          show: true,
          link: 'teamYear'
        },
        {
          index: 3,
          value: 'Team Goals',
          show: false,
          link: 'teamGoals'
        },
        {
          index: 4,
          value: 'Team Profile',
          show: true,
          link: 'teamProfile'
        },

        {
          index: 5,
          value: 'My Today',
          show: true,
          link: 'myToday'
        }
      ]
    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    showMyMenu() {
      document.getElementById('my_menu').style.display = 'block'
    },
    showTeamMenu() {
      document.getElementById('team_menu').style.display = 'block'
    },
    setNewSelectedOption(selectedOption) {
      this.showMenu = false
      this.$router.push({
        name: selectedOption.link,
        params: {
          uid: this.$route.params.uid,
          tid: this.$route.params.tid
        }
      })
    }
  },
  created() {
    this.authorized = true
  }
}
</script>
<style scoped>
div.float {
  display: inline;
}
.pad {
  padding-left: 30px;
}
.breadcrumb,
.time {
  font-weight: bold;
  font-size: 12px;
  padding-bottom: 20px;
}

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
