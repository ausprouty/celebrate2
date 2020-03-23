<template>
  <div class="container">
    <div class="image" v-if="this.image">
      <img v-bind:src="this.image" class="member" />
    </div>
    <div class="time" v-if="this.time">{{ this.time }}</div>
    <div class="back" @click="goBack()">
      <img class="icon" src="/images/icons/standard/back_48x48.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    time: String
  },

  methods: {
    goBack() {
      window.history.back()
    }
  },
  created() {}
}
</script>

<style scoped>
.container {
  display: flex;
}
.container > div {
  flex: 1; /*grow*/
}
img.icon {
  width: 48px;
}
.time{
  padding-top:20px;
}
div.back {
  text-align: right;
}
</style>
