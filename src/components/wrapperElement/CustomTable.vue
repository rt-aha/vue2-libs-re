<template>
  <div class="table-pagination-wrapper">
    <div class="table-wrapper">
      <ElTable ref="multipleTable"
               :stripe="$attrs.stripe"
               :max-height="height"
               :show-summary="$attrs.showSummary"
               :data="tableData.items || []"
               :row-class-name="rowClassName"
               @selection-change="handleSelectRow"
               empty-text="無資料"
               :summary-method="summaryMethod"
               @sort-change="handleSort">
        <!-- 如果沒有傳入 radioColumnConfig 這個Prop就不顯示 -->
        <ElTableColumn v-if="useRadio"
                       :width="radioColumnConfig.width"
                       :align="radioColumnConfig.align">
          <template slot-scope="scope">
            <el-radio :class="{ 'inivisble-radio-label': !radioColumnConfig.showLabel }"
                      :label="scope.$index"
                      v-model="columnRadio"
                      @change.native="handleSelectRadio(scope.$index, scope.row)">{{ radioColumnConfig.label }}</el-radio>
          </template>
        </ElTableColumn>

        <!-- 如果沒有傳入selectorColumnConfig這個Prop就不顯示 -->
        <ElTableColumn v-if="selectorColumnConfig"
                       type="selection"
                       :width="selectorColumnConfig.width"
                       :align="selectorColumnConfig.align">
        </ElTableColumn>

        <!-- 主要table設定 -->
        <ElTableColumn v-for="(config, index) in columnConfig"
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
                       :fixed="config.fixed">
          <template v-slot="scope">
            <!-- 有自定義(render function) 走這 -->
            <CustomRenderComponent v-if="config.render"
                                   :render="config.render"
                                   :row="scope.row"
                                   :index="index"
                                   :config="config" />
            <!-- 不然就照舊 -->
            <span v-else>
              <span v-if="config.cssStyle"
                    :class="cssClass(config.cssStyle, {column:scope.row[config.prop], row: scope.row})">
                {{ scope.row[config.prop] }}</span>
              <span v-else>
                {{ scope.row[config.prop] }}
              </span>
            </span>
          </template>
        </ElTableColumn>

        <ElTableColumn v-if="operationConfig !== null"
                       :prop="operationConfig.prop"
                       :label="operationConfig.label"
                       width="auto"
                       :min-width="operationConfig.minWidth"
                       :align="operationConfig.align"
                       :fixed="operationConfig.fixed"
                       :header-align="operationConfig.headerAlign">
          <template v-slot="scope">
            <div class="operate-same"
                 v-for="(item, index) of operationConfig.operationSetting"
                 :key="index">

              <el-button type="warning"
                         plain
                         round
                         icon="el-icon-document"
                         class="operate-icon"
                         @click="handleOperate({type:item.icon, row: scope.row})">
              </el-button>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <div class="pagination-wrapper"
         v-if="showPagination">
      <el-pagination @size-change="handleAdjustPageSize"
                     @current-change="handleJumpPage"
                     :current-page="tableData.pageInfo.pageIndex"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="tableData.pageInfo.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.pageInfo.totalCounts">
      </el-pagination>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CustomRenderComponent from '@/utils/renderFunction.ts';
import CustomPagination from '@/components/custom/CustomPagination.vue';
import { cssClass } from '@/utils/getCsshelper';

@Component({
  components: {
    CustomPagination,
    CustomRenderComponent,
  },
})
export default class CustomTable extends Vue {
  @(namespace('userStore').Getter)
  public hasAuth: any;

  @Prop({ default: () => true })
  public showPagination: boolean;

  @Prop({ default: () => {} })
  public tableData: any;

  @Prop({ default: () => {} })
  public columnConfig: any;

  @Prop({ default: () => null })
  public operationConfig: any;

  @Prop({ default: () => 'auto' })
  public height: any;

  // radio欄位的設定檔案，如果有傳此值，radio欄位會自動顯示
  @Prop({ default: () => null })
  public useRadio: object;

  // selector欄位的設定檔案，如果有傳此值，selector欄位會自動顯示
  @Prop({ default: () => null })
  public selectorColumnConfig: object;

  public cssClass: any = cssClass;

  public selectedRadio: string = '';
  public radioColumnConfig: any = {
    align: 'center',
    width: '80',
    label: 'text',
    showLabel: false,
  };

  //   跳頁
  public handleJumpPage(targetPage: number) {
    this.emitEvent('handleJumpPage', targetPage);
  }

  public handleAdjustPageSize(pageSize: number) {
    this.emitEvent('handleAdjustPageSize', pageSize);
  }

  public judgeAuth(authCode: string): boolean {
    // 無條件一定顯示的操作
    if (authCode === 'has') {
      return true;
    }

    if (this.hasAuth[authCode]) {
      return true;
    } else {
      return false;
    }
  }

  // 當radio值改變時觸發的change事件
  public handleSelectRadio(rowIndex: number, rowData: any) {
    const row = {
      rowIndex,
      rowData,
    };

    this.emitEvent('handleSelectRadio', row);
  }

  // 當selector值改變時觸發的change事件
  public handleSelectRow(selectRows: any[]) {
    this.emitEvent('handleSelectRow', selectRows);
  }

  // 統一處理emit事件
  public emitEvent(eventName: string, emitData: any) {
    this.$emit(eventName, emitData);
  }

  public handleSort(sortInfo: any) {
    const { order, prop }: { order: string; prop: string } = sortInfo;
    this.emitEvent('handleSort', { order, prop });
  }

  public rowClassName(row: any, index: number) {
    if (index === 1) {
      return 'demo-table-info-row';
    } else if (index === 3) {
      return 'demo-table-error-row';
    }
    return '';
  }

  public handleOperate(info: any) {
    console.log(222);
    this.$emit('handleOperate', info);
  }

  // 自定義總計，這個function有點複雜 ... 要遍歷整個table
  // 1. 判斷該欄位設定檔有沒有summary，沒有直接返回 ''
  // 2. 如果有summary, 是table現有資料計算合計(2-1)，還是api返回的總計(2-2)
  // 2-1. 'table-[funcName]'，只計算當前表格內容總和
  // 2-1-1. 判斷使用哪種計算合計方式[funcName]，有特別的就寫方法到calcMethodStratgey裡面
  // 2-2. 'api'，顯示透過api返回的總和
  // 2-2-1. 根據API返回格式作相應處理(還沒寫) ---2019/11/2
  public summaryMethod({ columns, data }: { columns: any; data: any }) {
    // columns 設定檔物件的陣列
    // data 每一個row資料的陣列

    let sums: any = {};

    columns.forEach((column: any, index: number) => {
      //取出當前欄位的key
      const { key, summary }: { key: string; summary: string | undefined } = column;

      // 1.是否有summary
      if (!summary) {
        sums[key] = {
          key,
          value: '',
        };
      } else {
        // 2.是否有tabl還是api
        const calcSummaryMethod: string[] = summary.split('-');
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
  }

  // 計算當前表格內容總和
  public summaryByTable(calcMethod: string, columnsConfig: any, tableData: any, key: string) {
    const calcMethodStratgey: any = {
      // 數字加總
      number() {
        const columnNumberArr = tableData.map((item: any) => item[key]);

        let total: number = 0;

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
    const hasMethod: boolean = Object.keys(calcMethodStratgey).includes(calcMethod);

    if (hasMethod) {
      return calcMethodStratgey[calcMethod].call(this);
    } else {
      return {
        key,
        value: '???',
      };
    }
  }

  // 顯示透過api返回的總和
  public summaryByAPI(key: string) {
    // 等接了api再回來寫

    return {
      key,
      value: 'summaryByAPI',
    };
  }

  @Emit('handleSelectChange')
  public handleSelectChange(selection: any) {
    return selection;
  }

  @Emit('handleRadioChange')
  public handleRadioChange(row: any, index: number) {
    return { row, index };
  }

  @Emit('handleBtn')
  public handleBtn(row: any, index: number, columnConfig: any) {
    console.log(row, index, columnConfig);
    return { row, index };
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.table-pagination-wrapper {
  // position: relative;
  // // width: 100%;
  // display: flex;

  .table-wrapper {
    flex: 1;
    overflow: auto;
  }

  .pagination-wrapper {
    margin-top: 15px;
    text-align: right;
    // flex: none;
    // width: 50px;
  }
}

/deep/ .el-table {
  display: flex;
  flex-direction: column;

  .el-table__body-wrapper {
    height: 300px;
    flex: 1;
    overflow: auto;
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

// button
/deep/ .el-button.is-round {
  // width: 30px;
  padding: 0 0;

  > i {
    padding: 12px 12px;
  }
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
