<template>
  <div class="page-date-picker">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-date-picker v-model="dateValue" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>禁用某日期之前</re-dev-desc>
      <re-date-picker v-model="dateValue" :notBeforeDate="notBeforeDate" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>禁用某日期之後</re-dev-desc>
      <re-date-picker v-model="dateValue" :notAfterDate="notAfterDate" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>同時禁用某日期之前、之後</re-dev-desc>
      <re-date-picker v-model="dateValue" :notBeforeDate="notBeforeDate" :notAfterDate="notAfterDate" />
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageDatePicker',
  data() {
    return {
      dateValue: new Date(),
      notBeforeDate: new Date(2021, 8, 5), // 2021/9/5
      notAfterDate: new Date(2021, 8, 25), // 2021/9/25
    };
  },
};
</script>
