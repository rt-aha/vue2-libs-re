<template>
  <div class="page-date-time-picker"><re-date-time-picker v-model="dateTime" /></div>
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
