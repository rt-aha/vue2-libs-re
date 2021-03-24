<template>
  <thead class="re-table-header" ref="tableHeader">
    <tr class="re-table-header__tr">
      <td class="re-table-header__tr__td"
        v-for="col of tableColumns"
        :key="col.prop"
        :style="{
          ...col.cssStyle,
        }"
      >
        {{ col.label }}
      </td>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'ReTableHeader',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnConfig: {
      type: Array,
      default: () => [],
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    // tableHeaderHight() {
    //   if (!this.$refs.tableHeader.clientHeight) return 0;
    //   return this.$refs.tableHeader.clientHeight;
    // },
  },

  mounted() {
    // this.getTableHeaderHeight();
  },
  watch: {
    tableHeaderHight: {
      // handler() { this.$emit('setTableHeaderHeight', this.tableHeaderHeight); },
    },

  },
};
</script>

<style lang="scss">

.re-table-header {
  // display: block;

  &__tr {
      border-bottom: 1px solid $c-lightgrey;
    &__td {
      @include box-padding(10px);
      border-right: 1px solid $c-lightgrey;
      @include font-style($c-assist, 14px);

      &:last-child {
        border-right: 0px transparent;
      }
    }
  }
}

</style>
