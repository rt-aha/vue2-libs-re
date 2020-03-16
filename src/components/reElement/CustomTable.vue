<template>
  <div class="table-pagination-wrapper">
    <div class="table-wrapper">
      <ElTable
        ref="multipleTable"
        :stripe="$attrs.stripe"
        :max-height="height"
        :show-summary="$attrs.showSummary"
        :data="tableData.items || []"
        :row-class-name="rowClassName"
        @selection-change="handleSelectRow"
        empty-text="無資料"
        :summary-method="summaryMethod"
        @sort-change="handleSort"
      >
        <!-- 如果沒有傳入 radioColumnConfig 這個Prop就不顯示 -->
        <ElTableColumn v-if="useRadio" :width="radioColumnConfig.width" :align="radioColumnConfig.align">
          <template slot-scope="scope">
            <el-radio
              :class="{ 'inivisble-radio-label': !radioColumnConfig.showLabel }"
              :label="scope.$index"
              v-model="columnRadio"
              @change.native="handleSelectRadio(scope.$index, scope.row)"
              >{{ radioColumnConfig.label }}</el-radio
            >
          </template>
        </ElTableColumn>

        <!-- 如果沒有傳入selectorColumnConfig這個Prop就不顯示 -->
        <ElTableColumn
          v-if="selectorColumnConfig"
          type="selection"
          :width="selectorColumnConfig.width"
          :align="selectorColumnConfig.align"
        >
        </ElTableColumn>

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
                :class="cssClass(config.cssStyle, { column: scope.row[config.prop], row: scope.row })"
              >
                {{ scope.row[config.prop] }}</span
              >
              <span v-else>
                {{ scope.row[config.prop] }}
              </span>
            </span>
          </template>
        </ElTableColumn>

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
            <div class="operate-same" v-for="(operate, index) of operationConfig.operationSetting" :key="index">
              <el-button round type="primary" class="operate-icon" @click="handleOperate({ operate, row: scope.row })">
                {{ operate.label }}
              </el-button>
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
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CustomRenderComponent from '@/utils/renderFunction';
import CustomPagination from '@/components/reElement/CustomPagination.vue';
// import { cssClass } from '@/utils/getCsshelper';

export default {
  name: 'CustomTable',
  components: {
    CustomPagination,
    CustomRenderComponent,
  },
  props: {
    tableData: {
      default: {},
    },
    showPagination: {
      type: Boolean,
      default: false,
    },
    columnConfig: {
      default: {},
    },
    operationConfig: {
      default: null,
    },
    height: {
      default: 'auto',
    },
    // radio欄位的設定檔案，如果有傳此值，radio欄位會自動顯示
    useRadio: {
      type: Object,
      default: null,
    },
    selectorColumnConfig: {
      type: Object,
      default: null,
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
    };
  },
  methods: {
    handleJumpPage(targetPage) {
      this.emitEvent('handleJumpPage', targetPage);
    },
    handleAdjustPageSize(pageSize) {
      this.emitEvent('handleAdjustPageSize', pageSize);
    },
    judgeAuth(authCode) {
      // 無條件一定顯示的操作
      if (authCode === 'has') {
        return true;
      }

      if (this.hasAuth[authCode]) {
        return true;
      } else {
        return false;
      }
    },
    handleSelectRadio(rowIndex, rowData) {
      const row = {
        rowIndex,
        rowData,
      };

      this.emitEvent('handleSelectRadio', row);
    },
    handleSelectRow(selectRows) {
      this.emitEvent('handleSelectRow', selectRows);
    },
    emitEvent(eventName, emitData) {
      this.$emit(eventName, emitData);
    },
    handleSort(sortInfo) {
      const { order, prop } = sortInfo;
      this.emitEvent('handleSort', { order, prop });
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
    summaryMethod({ columns, data }) {
      // columns 設定檔物件的陣列
      // data 每一個row資料的陣列

      let sums = {};

      columns.forEach((column, index) => {
        //取出當前欄位的key
        const { key, summary } = column;

        // 1.是否有summary
        if (!summary) {
          sums[key] = {
            key,
            value: '',
          };
        } else {
          // 2.是否有tabl還是api
          const calcSummaryMethod = summary.split('-');
          // 2-1
          if (calcSummaryMethod[0] === 'table') {
            sums[key] = this.summaryByTable(calcSummaryMethod[1], column, data, key);
          }
          // 2-2
          if (calcSummaryMethod[0] === 'api') {
            sums[key] = this.summaryByAPI(key);
          }

          // 避免格式寫錯防雷
          if (calcSummaryMethod[0] !== 'table' && calcSummaryMethod[0] !== 'api') {
            sums[key] = {
              key,
              value: '不可能會走到這個if!',
            };
          }
        }
      });
      return sums;
    },
    handleSelectChange(selection) {
      this.$emit('handleSelectChange', selection);
    },
    handleRadioChange(selection) {
      this.$emit('handleRadioChange', selection);
    },
    handleBtn(row, index, columnConfig) {
      this.$emit('handleBtn', { row, index });
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

          return {
            key,
            value: total,
          };
        },

        // 其他合計規則 ... 往下寫方法
      };

      // 檢查是否有對應方法
      const hasMethod = Object.keys(calcMethodStratgey).includes(calcMethod);

      if (hasMethod) {
        return calcMethodStratgey[calcMethod].call(this);
      } else {
        return {
          key,
          value: '???',
        };
      }
    },

    // 顯示透過api返回的總和
    summaryByAPI(key) {
      // 等接了api再回來寫
      return {
        key,
        value: 'summaryByAPI',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

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
