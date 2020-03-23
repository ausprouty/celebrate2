<template>
  <div class="container">
    <div class="image" v-if="this.image">
      <img v-bind:src="this.image" class="member" />
    </div>
    <div class="back" @click="goBack()">
      <img class="back" src="/images/icons/standard/back_48x48.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String
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
div.container {
  width: 100%;
  height: 70px;
}
div.back {
  float: right;
}
div.image {
  float: left;
}
</style>
