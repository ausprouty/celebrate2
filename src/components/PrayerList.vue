<template>
  <div class="app-link" v-on:click="showPage(user)">
    <div class="shadow-card -shadow">
      <img v-bind:src="appDir.members + item.image" class="member" />

      <div class="prayer">
        <span class="card-name">{{ item.prayer }}</span>
        <span class="card-date">({{ item.month }}/{{ item.year }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    item: Object
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
    this.image = this.item.image
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
div.prayer {
  float: right;
  font-size: 18px;
  vertical-align: top;
  width: 80%;
  line-height:1;
}
.card-name {
  font-weight:normal;
  line-height: 20px;
}
.card-date{
  padding-left:10px;
  font-size: 10pt;
  color: grey
}
</style>
