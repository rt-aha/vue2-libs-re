<template>
  <div class="page-time-picker">
    <re-time-picker v-model="time" />
  </div>
</template>

<script>
export default {
  name: 'PageTimePicker',
  data() {
    return {
      time: new Date(),
    };
  },
};
</script>

<style lang="scss"></style>
