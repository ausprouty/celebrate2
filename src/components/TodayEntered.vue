<template>
  <div>
    <p>Already Entered:</p>
    <div v-for="(today, todayid) in this.item.entered" :key="todayid" :item="today" class="progress">
      <p class="prayer">{{ today.comment }} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style scoped>
.prayer {
  color: purple;
}
</style>
