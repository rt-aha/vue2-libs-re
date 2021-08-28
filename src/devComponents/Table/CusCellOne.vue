<template>
  <div class="comp-cus-cell-one">
    <!-- {{ rowData.date }}, {{ rowData.eps }} -->
    <p>Date: {{ rowData.date }}</p>
    <p>EPS: {{ rowData.eps }}</p>
  </div>
</template>

<script>
export default {
  name: 'CusCell1',
  props: {
    rowData: {
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.comp-cus-cell-one {
  display: inline-block;
}
</style>
