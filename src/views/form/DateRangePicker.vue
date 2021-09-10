<template>
  <div class="page-date-range-picker">
    <re-date-range-picker v-model="dateValue" />
  </div>
</template>

<script>
export default {
  name: 'PageDateRangePicker',
  data() {
    return {
      dateValue: [new Date(), new Date(2021, 8, 20)],
    };
  },
};
</script>
