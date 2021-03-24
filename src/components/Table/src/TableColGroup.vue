<template>
  <colgroup class="comp-table-col-group">
   <col v-for="col of tableColumns"
        :key="col.prop"
        :width="col.width || '150'"
        :style="{
          ...col.cssStyle,
        }">
  </colgroup>
</template>

<script>
export default {
  name: 'ReTableColGroup',
  props: {
    tableColumns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
