<template>
  <div id="nav" v-on:click="goBack()">
    <img class="nav-icon" alt="Home" src="/images/menu/ribbons/TopRibbon600.png">
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
img.nav-icon {
  width: 95%;
  max-width: 650px;
}
</style>
