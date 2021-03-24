<template>
  <div class="re-table">
    <table>
      <re-table-header
        :tableData="tableData"
        :columnConfig="columnConfig"
        :tableColumns="tableColumns"
      />
      <re-table-body
        :tableData="tableData"
        :columnConfig="columnConfig"
        :tableColumns="tableColumns"
        :stripe="stripe"
        :rowColor="rowColor"
      />
    </table>
    <div class="hidden-table-column"><slot></slot></div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { v4 as uuid } from 'uuid';

export default {
  name: 'ReTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnConfig: {
      type: Array,
      default: () => [],
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    rowCss: {
      type: Function,
      default: () => ({}),
    },
    rowColor: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableColumns: [],
    };
  },
  methods: {},
  mounted() {
    this.tableColumns = this.$children
      .filter((ele) => ele.$options.name === 'ReTableColumn')
      .map((ele) => ({
        ...ele.$attrs,
      }));
  },
};
</script>

<style lang="scss">

.re-table {
  display: inline-table;
  border: 1px solid $c-lightgrey;
  /* @include cus-radius(0, 0, 4px, 4px); */
  overflow: hidden;
}

.hidden-table-column {
  display: none;
}
</style>
