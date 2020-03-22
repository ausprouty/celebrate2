<template>
  <div class="container">
    <div class="back" @click="goBack()">Go Back</div>
    <div v-if="this.image">
      <img v-bind:src="this.image" class="member" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: Object
  },
  methods: {
    goBack() {
      window.history.back()
    }
  },
  created() {}
}
</script>

<style scoped></style>
