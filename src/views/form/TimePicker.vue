<template>
  <div class="page-time-picker">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-time-picker v-model="time" />
    </re-dev-sheet>
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

<style lang="scss" scoped></style>
