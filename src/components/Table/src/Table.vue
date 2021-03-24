<template>
  <div class="re-table">
    <div class="re-table__wrapper">
      <table class="table" :style="{width: tableWidth + 'px'}">
        <re-table-header
          :tableData="tableData"
          :tableColumns="tableColumns"
        />
        <re-table-col-group :tableColumns="tableColumns" />
        <re-table-body
          :tableData="tableData"
          :tableColumns="tableColumns"
          :stripe="stripe"
          :rowColor="rowColor"
          :maxHeight="maxHeight"
        />
      </table>
      <re-table-fixed>
        <table class="table" :style="{width: tableWidth + 'px'}">
        <re-table-header
          :tableData="tableData"
          :tableColumns="tableFixedColumns"
        />
        <re-table-col-group :tableColumns="tableFixedColumns" />
        <re-table-body
          :tableData="tableData"
          :tableColumns="tableFixedColumns"
          :stripe="stripe"
          :rowColor="rowColor"
          :maxHeight="maxHeight"
        />
      </table>
      </re-table-fixed>
      <div class="hidden-table-column"><slot></slot></div>
    </div>

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
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    fixed: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableWidth: 0,
      tableColumns: [],
      tableFixedColumns: [],
      tableHeaderHeight: 0,
    };
  },
  computed: {},
  methods: {
    getSettingPropsFromTableColumn() {
      this.tableColumns = this.$children
        .filter((ele) => ele.$options.name === 'ReTableColumn')
        .map((ele) => ({
          ...ele.$attrs,
        }));
    },
    calcTableWidth() {
      this.tableWidth = this.tableColumns
        .map((ele) => ele.width || '150')
        .reduce((acc, ele) => {
          acc += Number(ele);
          return acc;
        }, 0);

      console.log('tableWidth', this.tableWidth);
    },
    getFixedTableColumns() {
      this.tableFixedColumns = this.$children
        .filter((ele) => ele.$options.name === 'ReTableColumn' && ele.$attrs.fixed === 'right')
        .map((ele) => ({
          ...ele.$attrs,
        }));
    },
    calcFixedTableWidth() {
      this.tableWidth = this.tableFixedColumns
        .map((ele) => ele.width || '150')
        .reduce((acc, ele) => {
          acc += Number(ele);
          return acc;
        }, 0);

      console.log('tableWidth', this.tableWidth);
    },
  },

  mounted() {
    this.getSettingPropsFromTableColumn();
    this.calcTableWidth();
    this.getFixedTableColumns();
    this.calcFixedTableWidth();
  },
};
</script>

<style lang="scss">
.re-table {
  display: block;
  border: 1px solid $c-lightgrey;
  /* @include cus-radius(0, 0, 4px, 4px); */
  // overflow: hidden;
  // width: 200px;
  width: 100%;
  // overflow: auto;
  position: relative;

  &__wrapper {
    width: 100%;
  overflow: auto;

  }

}

.table {
  // width: auto;
  // width: 500px;
  width: 100%;
  // overflow: hidden;
  table-layout: fixed;
  word-wrap: break-word;

}

.hidden-table-column {
  display: none;
}

</style>
