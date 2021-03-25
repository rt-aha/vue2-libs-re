<template>
  <div class="re-table">
    <div class="re-table__wrapper" ref="tableWrapper">
      <table class="table" :style="{ width: fullTableWidthValue }">
        <re-table-header
          :tableData="tableData"
          :columnsConfig="reOrderColumnConfig"
          :hasFixedColumn="hasFixedColumn"
          @setColumnsWidthMapping="setColumnsWidthMapping"
        />
        <re-table-col-group :columnsConfig="reOrderColumnConfig"/>
        <re-table-body
          :tableData="tableData"
          :columnsConfig="reOrderColumnConfig"
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
            v-for="col of columnsConfig"
            :key="col.prop"
          >
            <slot
              :name="col.prop"
              :data="{
                ...scope.data,
              }"
            ></slot>
          </span>
          <!-- </template> -->
        </re-table-body>
      </table>
      <re-table-fixed v-if="tableContentWidth > fullTableWidth">
        <table class="table" :style="{ width: fixedTableWidth + 'px' }">
          <re-table-header
            :tableData="tableData"
            :columnsConfig="tableFixedColumns"
          />
          <re-table-col-group
            :columnsConfig="tableFixedColumns"
            :columnsWidthMapping="columnsWidthMapping"
            :isFixedColumn="true"
          />
          <re-table-body
            :tableData="tableData"
            :columnsConfig="tableFixedColumns"
            :stripe="stripe"
            :rowColor="rowColor"
            :maxHeight="maxHeight"
            :isFixedColumn="true"
            ref="tableBody"
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
import { cloneDeep, debounce } from 'lodash';
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
    columnsConfig: {
      type: Array,
      default: () => [],
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
      columnsWidthMapping: {},
    };
  },
  computed: {},
  methods: {
    setColumnsWidthMapping(val) {
      this.columnsWidthMapping = val;
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

      // 若有固定欄位且未設定監聽器才執行
      // if (columns.length > 0 && this.isSetResizeListener === false) {
      //   window.addEventListener('resize', () => {
      //     this.showFixedColumnDebounce();
      //   });

      //   this.isSetResizeListener = true;
      // }
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
      this.fullTableWidth = this.$refs.tableWrapper.clientWidth;
    },
    setScopedSlotList() {
      this.scopedSlotList = Object.keys(this.$scopedSlots);
    },
    // eslint-disable-next-line
    showFixedColumnDebounce: debounce(function () {
      this.isShowFixedColumn();
    }, 500),
  },
  mounted() {
    /**
     * 1. 取得table寬
     * 2. 取得table內欄位總和
     * 3. 取得固定欄位及固定欄位的寬
     * 4. 設定使用scoped-slot的prop // 似乎有anti-design?
     */
    this.getFullTableWidth();
    this.calcTableWidth();
    this.getFixedTableColumns();
    this.calcFixedTableWidth();
    this.setScopedSlotList();
    window.addEventListener('resize', () => {
      this.showFixedColumnDebounce();
    });
  },
  created() {},
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
