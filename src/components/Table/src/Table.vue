<template>
  <div class="re-table">
    <div class="re-table-wrapper">
      <div
        class="re-table-wrapper__normal"
        ref="normalTable"
        @scroll="(e) => handleTableScroll(e, 'fixedTable')"
        :style="{
          height: `${maxHeight ? maxHeight + 'px' : 'auto'}`,
        }"
      >
        <div class="re-table-wrapper__normal__header">
          <table class="table" :style="{ width: fullTableWidthValue }">
            <re-table-col-group :columnsConfig="reOrderColumnConfig" :columnsWidthMapping="columnsWidthMapping" />
            <re-table-header
              :tableData="tableData"
              :columnsConfig="reOrderColumnConfig"
              :hasFixedColumn="hasFixedColumn"
            />
          </table>
        </div>
        <div class="re-table-wrapper__normal__content">
          <table class="table" :style="{ width: fullTableWidthValue }">
            <re-table-col-group :columnsConfig="reOrderColumnConfig" :columnsWidthMapping="columnsWidthMapping" />

            <re-table-body
              :tableData="tableData"
              :columnsConfig="reOrderColumnConfig"
              :stripe="stripe"
              :rowColor="rowColor"
              :maxHeight="maxHeight"
              :scopedSlotList="scopedSlotList"
            >
            </re-table-body>
          </table>
        </div>
      </div>

      <div
        class="re-table-wrapper__fixed"
        v-if="tableContentWidth > fullTableWidth"
        ref="fixedTable"
        :style="{ width: `${fixedTableWidth}px`, height: `${maxHeight ? maxHeight + 'px' : 'auto'}` }"
        @scroll="(e) => handleTableScroll(e, 'normalTable')"
      >
        <div class="re-table-wrapper__fixed__content">
          <div class="re-table-wrapper__fixed__header">
            <table class="table" :style="{ width: fullTableWidthValue }">
              <re-table-col-group
                :columnsConfig="reOrderColumnConfig"
                :columnsWidthMapping="columnsWidthMapping"
                :isFixedColumn="true"
              />
              <re-table-header
                :tableData="tableData"
                :columnsConfig="reOrderColumnConfig"
                :hasFixedColumn="hasFixedColumn"
                :isFixedColumn="true"
              />
            </table>
          </div>
          <div class="re-table-wrapper__fixed__content">
            <table class="table" :style="{ width: fullTableWidthValue }">
              <re-table-col-group
                :columnsConfig="reOrderColumnConfig"
                :columnsWidthMapping="columnsWidthMapping"
                :isFixedColumn="true"
              />

              <re-table-body
                :tableData="tableData"
                :columnsConfig="reOrderColumnConfig"
                :stripe="stripe"
                :rowColor="rowColor"
                :maxHeight="maxHeight"
                :scopedSlotList="scopedSlotList"
                :isFixedColumn="true"
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'ReTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    // columnConfig: {
    //   type: Array,
    //   default: () => [],
    // },
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
    columnsConfig: {
      type: Array,
      default: () => [],
    },
    pagination: {
      // type: Object,
      // default: () => ({}),
      default: null,
    },
  },
  data() {
    return {
      fullTableWidthValue: '',
      fullTableWidth: 0,
      tableContentWidth: 0,
      reOrderColumnConfig: [],
      fixedTableWidth: 0,
      tableFixedColumns: [],
      tableHeaderHeight: 0,
      scopedSlotList: [],
      isSetResizeListener: false,
      hasFixedColumn: false,
      // columnsWidthMapping: {},
    };
  },
  computed: {
    columnsWidthMapping() {
      return this.columnsConfig.reduce((obj, ele) => {
        obj[ele.prop] = ele.width ? ele.width : 150;

        return obj;
      }, {});
    },
  },
  methods: {
    handleTableScroll(e, refName) {
      const scrollPostion = e.target.scrollTop;
      this.$refs[refName].scrollTop = scrollPostion;
    },
    handlePageInfo(info) {
      console.log('info...', info);
    },
    calcReOrderColumnConfig() {
      const emptyTableColumn = this.columnsConfig
        .filter((ele) => ele.fixed)
        .map((ele) => ({
          isEmptyRow: true,
          ...ele,
        }));

      if (emptyTableColumn.length) {
        this.emptyTableColumn = true;
      }

      const columns = this.columnsConfig.filter((ele) => !ele.fixed);

      this.reOrderColumnConfig = [...columns, ...emptyTableColumn];
    },

    isShowFixedColumn() {
      this.getFullTableWidth();

      if (this.fullTableWidth > this.tableContentWidth) {
        this.fullTableWidthValue = '100%';
        this.reOrderColumnConfig = this.columnsConfig;
        return;
      }
      this.fullTableWidthValue = `${this.tableContentWidth}px`;
      this.calcReOrderColumnConfig();
    },
    calcTableWidth() {
      this.tableContentWidth = this.columnsConfig
        .map((ele) => ele.width || '150')
        .reduce((acc, ele) => {
          acc += Number(ele);
          return acc;
        }, 0);

      this.isShowFixedColumn();
    },
    getFixedTableColumns() {
      this.tableFixedColumns = this.columnsConfig
        .filter((ele) => ele.fixed === 'right')
        .map((ele) => ({
          ...ele,
        }));
    },
    calcFixedTableWidth() {
      this.fixedTableWidth = this.columnsConfig
        .filter((ele) => ele.fixed === 'right')
        .map((ele) => ele.width || '150')
        .reduce((acc, ele) => {
          acc += Number(ele);
          return acc;
        }, 0);
    },
    getFullTableWidth() {
      this.fullTableWidth = this.$refs.normalTable.clientWidth;
    },
    // eslint-disable-next-line
    showFixedColumnDebounce: debounce(function () {
      this.isShowFixedColumn();
    }, 500),
  },
  mounted() {
    /**
     * 1. ??????table???
     * 2. ??????table???????????????
     * 3. ???????????????????????????????????????
     */
    this.getFullTableWidth();
    this.calcTableWidth();
    this.getFixedTableColumns();
    this.calcFixedTableWidth();
    window.addEventListener('resize', this.showFixedColumnDebounce);
  },
  created() {
    // this.setColumnsWidthMapping();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.showFixedColumnDebounce);
  },
};
</script>

<style lang="scss" scoped>
/* .re-table {
} */

.re-table-wrapper {
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  &__normal {
    /* height: 500px; */
    position: relative;
    overflow: auto;

    &__header {
      position: sticky;
      top: 0;
      z-index: 99;
      background-color: $c-white;
    }

    &__content {
      position: relative;
    }
  }

  &__fixed {
    @include position(tr, 0, 0);
    z-index: 99;
    height: 500px;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
      width: 0;
    }

    &__header {
      position: sticky;
      top: 0;
      z-index: 99;
      background-color: $c-white;
    }

    &__content {
      position: relative;
      height: 400px;
    }
  }
}

.table {
  table-layout: fixed;
  word-break: break-all;
}
</style>
