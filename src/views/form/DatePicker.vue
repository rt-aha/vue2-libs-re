<template>
  <div class="page-date-picker">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-date-picker v-model="dateValue" />
    </re-dev-sheet>
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
