<template>
  <div class="page-date-time-picker">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-date-time-picker v-model="dateTime" />
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageDateTimePicker',
  data() {
    return {
      dateTime: new Date(),
    };
  },
};
</script>

<style lang="scss"></style>
