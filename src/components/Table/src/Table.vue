<template>
  <div class="re-table">
    <div class="re-table__wrapper">
      <table class="table" :style="{ width: tableWidth + 'px' }">
        <re-table-header :tableData="tableData" :tableColumns="tableColumns" />
        <re-table-col-group :tableColumns="tableColumns" />
        <re-table-body
          :tableData="tableData"
          :tableColumns="tableColumns"
          :stripe="stripe"
          :rowColor="rowColor"
          :maxHeight="maxHeight"
          :scopedSlotList="scopedSlotList"
        >
          <!-- <template> -->
            <!-- value: scope.data.value,
                rowData: scope.data.rowData,
                col: scope.data.col, -->
          <span
            :slot="col.prop"
            slot-scope="scope"
            v-for="col of tableColumns"
            :key="col.prop"
          >
            <slot
              :name="col.prop"
              :data="{
                ...scope.data
              }"
            ></slot>
          </span>
          <!-- </template> -->
        </re-table-body>
      </table>
      <re-table-fixed>
        <table class="table" :style="{ width: tableWidth + 'px' }">
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
            :isFixedColumn="true"
          >
          </re-table-body>
        </table>
      </re-table-fixed>
      <div><slot name="sss"></slot></div>
      <!-- <slot></slot> -->
      <!-- <div class="hidden-table-column"><slot></slot></div> -->
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
    tableColumns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableWidth: 0,
      // tableColumns: [],
      tableFixedColumns: [],
      tableHeaderHeight: 0,
      scopedSlotList: [],
    };
  },
  computed: {},
  methods: {
    getSettingPropsFromTableColumn() {
      this.tableColumns = this.$children
        .filter((ele) => {
          const cols = ele.$options.name === 'ReTableColumn';
          return cols;
        })
        .map((ele) => {
          if (ele.$attrs.fixed === 'right') {
            return {
              isEmptyRow: true,
              ...ele.$attrs,
            };
          }
          return {
            ...ele.$attrs,
          };
        });
    },
    calcTableWidth() {
      this.tableWidth = this.tableColumns
        .map((ele) => ele.width || '150')
        .reduce((acc, ele) => {
          acc += Number(ele);
          return acc;
        }, 0);
    },
    getFixedTableColumns() {
      this.tableFixedColumns = this.tableColumns
        .filter((ele) => ele.fixed === 'right')
        .map((ele) => ({
          ...ele,
        }));
    },
    calcFixedTableWidth() {
      this.tableWidth = this.tableColumns
        .filter((ele) => ele.fixed === 'right')
        .map((ele) => ele.width || '150')
        .reduce((acc, ele) => {
          acc += Number(ele);
          return acc;
        }, 0);
    },
  },

  mounted() {
    // this.getSettingPropsFromTableColumn();
    // this.calcTableWidth();
    this.getFixedTableColumns();
    this.calcFixedTableWidth();
    console.log('this...', this.$slots);
    console.log('$scopedSlots --table', this.$scopedSlots);
    this.scopedSlotList = Object.keys(this.$scopedSlots);
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
