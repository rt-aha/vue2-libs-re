<template>
  <div class="page-date-picker">
    <re-date-picker v-model="dateValue" />
  </div>
</template>

<script>
export default {
  name: 'PageDatePicker',
  data() {
    return {
      dateValue: new Date(),
    };
  },
};
</script>
