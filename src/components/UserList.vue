<template>
  <div class="app-link" v-on:click="showPage(user)">
    <div class="shadow-card -shadow">
      <img v-bind:src="appDir.members + this.image" class="member" />

      <div class="card-names">
        <span class="card-name">{{ user.firstname }} {{ user.lastname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    user: Object
  },

  data: function() {
    return {
      image: 'blank.png'
    }
  },
  computed: mapState(['appDir']),
  methods: {
    showPage: function(user) {
      console.log('user')
      console.log(user)
      this.$router.push({
        name: 'user',
        params: {
          uid: this.user.uid
        }
      })
    }
  },
  created() {
    this.image = this.user.image
  }
}
</script>
<style scoped>
<style scoped > 

div.break {
  display: inline;
}

.shadow-card {
  background-color: #d2bcbc;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
  text-align: left;
  transition: all 0.2s linear;
  width: 95%;
}
div.card-names {
  float: right;
  font-size: 18px;
  vertical-align: top;
  width: 70%;
  line-height: 60px;
}
.card-name {
  font-weight: bold;
  line-height: 20px;
}

</style>
