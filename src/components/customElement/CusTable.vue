<template>
  <div class="table-pagination-wrapper">
    <div class="table-wrapper">
      <ElTable
        ref="cus-table"
        :stripe="stripe"
        :show-summary="showSummary"
        :max-height="height"
        :data="tableData.items || []"
        :row-class-name="rowClassName"
        :empty-text="emptyText"
        :summary-method="summaryMethod"
        @selection-change="handleSelectRow"
        @sort-change="handleSort"
      >
        <!-- 單選時 radioColumnConfig === true -->
        <ElTableColumn
          v-if="useRadio"
          :width="radioColumnConfig.width"
          :align="radioColumnConfig.align"
        >
          <template slot-scope="scope">
            <el-radio
              :class="{ 'inivisble-radio-label': !radioColumnConfig.showLabel }"
              :label="scope.$index"
              v-model="columnRadio"
              @change.native="handleSelectRadio(scope.$index, scope.row)"
            >{{ radioColumnConfig.label }}</el-radio>
          </template>
        </ElTableColumn>

        <!-- 多選時 multiSelectorConfig === true -->
        <ElTableColumn
          v-if="useMultiSelector"
          type="selection"
          :width="multiSelectorConfig.width"
          :align="multiSelectorConfig.align"
        ></ElTableColumn>

        <!-- 主要table設定 -->
        <ElTableColumn
          v-for="(config, index) in columnConfig"
          :key="config.prop"
          :prop="config.prop"
          :label="config.label"
          width="auto"
          :min-width="config.minWidth"
          :sortable="config.sortable"
          :align="config.align"
          :header-align="config.headerAlign"
          :render="config.render"
          :cssStyle="config.cssStyle"
          :fixed="config.fixed"
        >
          <template v-slot="scope">
            <!-- 有自定義(render function) 走這 -->
            <CustomRenderComponent
              v-if="config.render"
              :render="config.render"
              :row="scope.row"
              :index="index"
              :config="config"
            />
            <!-- 不然就照舊 -->
            <span v-else>
              <span
                v-if="config.cssStyle"
                :class="cssClass({ column: scope.row[config.prop], row: scope.row })(config.cssStyle)"
              >{{ scope.row[config.prop] }}</span>
              <span v-else>{{ scope.row[config.prop] }}</span>
            </span>
          </template>
        </ElTableColumn>

        <!-- 操作按鈕 -->
        <ElTableColumn
          v-if="operationConfig !== null"
          :prop="operationConfig.prop"
          :label="operationConfig.label"
          width="auto"
          :min-width="operationConfig.minWidth"
          :align="operationConfig.align"
          :fixed="operationConfig.fixed"
          :header-align="operationConfig.headerAlign"
        >
          <template v-slot="scope">
            <div
              class="operate-same"
              v-for="(operate, index) of operationConfig.operationSetting"
              :key="index"
            >
              <el-button
                round
                type="primary"
                class="operate-icon"
                @click="handleOperate({ operate, row: scope.row })"
              >{{ operate.label }}</el-button>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <div class="pagination-wrapper" v-if="showPagination">
      <el-pagination
        @size-change="handleAdjustPageSize"
        @current-change="handleJumpPage"
        :current-page="tableData.pageInfo.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="tableData.pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.pageInfo.totalCounts"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import CustomRenderComponent from '@/utils/renderFunction';
// import CusElePagination from '@/components/customElement/CusElePagination.vue';
import { cssClass } from '@/utils/getCsshelper';

export default {
  name: 'CusTable',
  components: {
    // CusElePagination,
    CustomRenderComponent,
  },
  props: {
    stripe: {
      type: Boolean,
      default: true,
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Object,
      default: () => {},
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    columnConfig: {
      type: Array,
      default: () => [],
    },
    operationConfig: {
      type: Object,
      default: () => {},
    },
    height: {
      type: String,
      default: 'auto',
    },
    emptyText: {
      type: String,
      default: '無資料',
    },
    useRadio: {
      type: Boolean,
      default: false,
    },
    useMultiSelector: {
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
      cssClass,
    };
  },
  methods: {
    handleJumpPage(targetPage) {
      this.$emit('handleJumpPage', targetPage);
    },
    handleAdjustPageSize(pageSize) {
      this.$emit('handleAdjustPageSize', pageSize);
    },
    handleSelectRadio(rowIndex, rowData) {
      const row = {
        rowIndex,
        rowData,
      };
      this.$emit('handleSelectRadio', row);
    },
    handleSelectRow(selectRows) {
      this.$emit('handleSelectRow', selectRows);
    },
    handleSort(sortInfo) {
      const { order, prop } = sortInfo;
      this.$emit('handleSort', { order, prop });
    },
    handleSelectChange(selection) {
      this.$emit('handleSelectChange', selection);
    },
    handleRadioChange(selection) {
      this.$emit('handleRadioChange', selection);
    },
    handleBtn(row, index, columnConfig) {
      this.$emit('handleBtn', { row, index, columnConfig });
    },
    rowClassName(row, index) {
      if (index === 1) {
        return 'demo-table-info-row';
      } else if (index === 3) {
        return 'demo-table-error-row';
      }
      return '';
    },
    handleOperate(info) {
      this.$emit('handleOperate', info);
    },
    getKeyInfoObj() {
      const obj = {};

      for (const item of this.columnConfig) {
        obj[item.prop] = {
          key: item.prop,
          summary: item.summary,
        };
      }

      return obj;
    },
    summaryMethod({ data }) {
      let sums = []; // 按照順序推入合計欄位

      const cloneColumnConfig = Object.assign([], this.columnConfig);

      // 因為合計是按照陣列排序，所以如果有使用radio或多選checkbox 要多推入空物件讓位置對齊
      if (this.useRadio) {
        cloneColumnConfig.splice(0, 0, {});
      }

      if (this.useMultiSelector) {
        cloneColumnConfig.splice(0, 0, {});
      }

      cloneColumnConfig.forEach((column, index) => {
        // 1.是否有summary
        if (!column.summary) {
          sums[index] = '';
        } else {
          // 2.是否有tabl還是api
          const calcSummaryMethod = column.summary.split('-');
          // 2-1
          if (calcSummaryMethod[0] === 'table') {
            sums[index] = this.summaryByTable(calcSummaryMethod[1], column, data, column.prop);
          }
          // 2-2
          if (calcSummaryMethod[0] === 'api') {
            sums[index] = this.summaryByAPI(column.prop);
          }

          // 避免格式寫錯防雷
          if (calcSummaryMethod[0] !== 'table' && calcSummaryMethod[0] !== 'api') {
            sums[index] = '看到這個表示寫錯了什麼 ... 不可能會走到這個if';
          }
        }
      });

      return sums;
    },

    // 計算當前表格內容總和
    summaryByTable(calcMethod, columnsConfig, tableData, key) {
      const calcMethodStratgey = {
        // 數字加總
        number() {
          const columnNumberArr = tableData.map(item => item[key]);

          let total = 0;

          for (const value of columnNumberArr) {
            total += value;
          }

          return total;
        },
        // 其他合計規則 ... 往下寫方法
      };

      // 檢查是否有對應方法
      const hasMethod = Object.keys(calcMethodStratgey).includes(calcMethod);

      if (hasMethod) {
        return calcMethodStratgey[calcMethod].call(this);
      } else {
        return '';
      }
    },

    // 顯示透過api返回的總和
    summaryByAPI(key) {
      console.log(key);
      // 等接了api再回來寫
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/cusTable.scss';

.table-pagination-wrapper {
  .table-wrapper {
    flex: 1;
    overflow: auto;
  }

  .pagination-wrapper {
    margin-top: 15px;
    text-align: right;
  }
}

.operate-same {
  display: inline-block;

  & + & {
    margin-left: 4px;
  }
}

.img-wrapper {
  width: 100%;
  max-width: 200px;
}

.operate-icon {
  // width: 30px;
  text-align: center;
  display: inline-block;
  vertical-align: bottom;
  cursor: pointer;
  font-size: $fs-16;
}
</style>
