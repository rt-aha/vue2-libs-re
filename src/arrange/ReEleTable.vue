<template>
  <div
    class="table-wrapper"
    :class="{
      'table-wrapper--no-margin': noMargin,
      'table-wrapper--align-top': alignTop,
      'table-wrapper--higher-z-index': higherZIndex,
      'table-wrapper--no-hover-effect': noHoverEffect,
    }"
    v-if="isShowEmptyText"
  >
    <el-table
      ref="multipleTable"
      :max-height="height"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
      :header-cell-class-name="headerCellClassName"
      :empty-text="emptyText"
    >
      <!-- multiSelectorConfig === true -->
      <el-table-column
        v-if="useMultiSelector"
        type="selection"
        :width="multiSelectorConfig.width"
        :align="multiSelectorConfig.align"
      >
      </el-table-column>

      <!-- 主要table設定 -->
      <el-table-column v-for="col in columnsConfig" v-bind="col" :key="col.prop">
        <template slot-scope="scope">
          <!-- 有自定義(render function) 走這 -->
          {{ scope.prop }}
          <span v-if="col.render">
            <component :is="col.render()" v-bind="{ ...col, row: scope.row }" v-on="$listeners" />
          </span>
          <span v-else>
            {{ formatter(scope.row[col.prop], tableData, col) }}
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="test"></div> -->
  </div>
</template>

<script>
export default {
  name: 'ReEleTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnsConfig: {
      type: Array,
      default: () => [],
    },
    height: {
      default: 'auto',
    },
    useRadio: {
      type: Boolean,
      default: false,
    },
    useMultiSelector: {
      type: Boolean,
      default: false,
    },
    tableRowClassName: {
      type: Function,
      default: () => {},
    },
    headerCellClassName: {
      type: Function,
      default: () => {},
    },
    noMargin: {
      type: Boolean,
      default: false,
    },
    alignTop: {
      type: Boolean,
      default: false,
    },
    /**
     * 無資料時，是否顯示提示
     * false: 無資料時，不顯示此 table
     * true: 無資料時，仍顯示有 table 但中間會提示無資料 */
    showEmptyText: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: '無資料',
    },
    useInfiniteScroll: {
      type: Boolean,
      default: false,
    },
    pageMeta: {
      type: Object,
      default: () => ({}),
    },
    higherZIndex: {
      type: Boolean,
      default: true,
    },
    // 為 true 時，滑鼠移到 row 上不會有底色凸顯效果
    noHoverEffect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedRadio: '',
      radioColumnConfig: {
        align: 'center',
        width: '80',
        label: 'text',
        showLabel: false,
      },
      multiSelectorConfig: {
        align: 'center',
        width: '80',
      },
      multipleSelection: [],
    };
  },
  computed: {
    isShowEmptyText() {
      if (this.showEmptyText) {
        return true;
      }

      return this.tableData && this.tableData.length > 0;
    },
  },
  methods: {
    formatter(data, rowData, col) {
      if (col.formatter) {
        return col.formatter(data, rowData, col);
      }

      return data;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      this.$emit('handleSelectionChange', val);
    },
    handleInfiniteScroll() {
      const ele = document.querySelector('.el-table__body-wrapper');

      ele.addEventListener('scroll', () => {
        // 距離底部小於 100 就打 api
        if (ele.scrollHeight - (ele.scrollTop + ele.offsetHeight) < 100) {
          const nextPage = Number(this.$route.query.page) + 1;

          // mobile 無限滾動，若已經在最後一頁，就不搜尋
          if (nextPage <= this.pageMeta.last_page) {
            this.$emit('handlePage', nextPage);
          }
        }
      });
    },
  },
  mounted() {
    if (this.useInfiniteScroll) {
      this.handleInfiniteScroll();
    }
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  margin-top: 35px;
  position: relative;

  &--no-margin {
    margin-top: 0;
  }

  &--higher-z-index {
    z-index: 10;
  }

  &--no-hover-effect {
    tr {
      pointer-events: none;
    }
  }

  .el-table th,
  .el-table td {
    vertical-align: top;
  }

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    right: -1px; // 因為有 1px 所以往右推用 overflow-x 隱藏
    width: 1px; // 0px box-shadow 不生效
    height: 100%;
    background-color: transparent;
    box-shadow: 0 0 10px rgb(0 0 0 / 50%);
  }
}
</style>

<style lang="scss">
.table-wrapper {
  &--align-top {
    .el-table th,
    .el-table td {
      vertical-align: top;
    }
  }
}
.table-wrapper {
  &--no-hover-effect {
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: transparent;
    }
  }
}
</style>
