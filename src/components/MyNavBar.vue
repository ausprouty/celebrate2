<template>
  <div>
    <div v-if="!authorized">
      <div id="nav">
        <router-link to="/">
          <img class="nav-icon" alt="Home" src="/images/menu/ribbons/MyTopRibbon600.png" />
        </router-link>
      </div>
    </div>
    <div v-if="authorized">
      <div class="dropdown">
        <img class="nav-icon" alt="Home" src="/images/menu/ribbons/MyTopRibbon600.png" />
        <div class="dropdown-content">
          <div v-for="menuItem in menu" :key="menuItem.index" :menuItem="menuItem">
            <div
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

export default {
  computed: mapState(['user']),

  data() {
    return {
      authorized: true,
      menu: [
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
          value: 'My Progress',
          show: false,
          link: 'myProgress'
        },
        {
          index: 3,
          value: 'My Goals',
          show: true,
          link: 'myGoals'
        },
        
        {
          index: 4,
          value: 'My Profile',
          show: true,
          link: 'myProfile'
        },
        {
          index: 5,
          value: 'Our Team',
          show: true,
          link: 'ourTeam'
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
    setNewSelectedOption(selectedOption) {
      this.showMenu = false
      this.$router.push({
        name: selectedOption.link,
        params: {
          uid: this.user.uid,
          tid: this.user.team
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
  background-color: red;

  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.item {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  color:white;
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
  background-color:darkblue;
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
