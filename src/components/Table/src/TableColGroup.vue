<template>
  <colgroup class="comp-table-col-group">
   <col v-for="col of columnsConfig"
        :key="col.prop"
        :width="columnsWidthMapping[col.prop] || '150'"
        :style="{
          ...col.cssStyle,
        }">
        <!-- :width="col.width || '150'" -->
  </colgroup>
</template>

<script>
export default {
  name: 'ReTableColGroup',
  props: {
    columnsConfig: {
      type: Array,
      default: () => [],
    },
    isFixedColumn: {
      type: Boolean,
      default: false,
    },
    columnsWidthMapping: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
