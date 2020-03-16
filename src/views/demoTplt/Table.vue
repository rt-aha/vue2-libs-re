<template>
  <div>
    <CustomTable
      stripe
      :showSummary="false"
      :tableData="tpltData"
      :columnConfig="columnConfig"
      :operationConfig="operationConfig"
      @handleOperate="handleOperate"
      @handleJumpPage="handleJumpPage"
      @handleAdjustPageSize="handleAdjustPageSize"
    >
    </CustomTable>
  </div>
</template>

<script>
import CustomTable from '@/components/customElement/CustomTable.vue';
import fakeData from '@/utils/fakeData';
import { columnConfig, operationConfig, searchConfig } from '@/config/tpltConfig';

export default {
  name: 'Table',
  components: {
    CustomTable,
  },
  data() {
    return {
      columnConfig,
      operationConfig,
      searchConfig,
      tpltData: {
        items: fakeData,
        pageInfo: {
          pageIndex: 1,
          pageSize: 10,
          totalCounts: 100,
        },
      },
    };
  },
  methods: {
    handleOperate(info) {
      this.currRowData = info.row;

      if (info.type === 'edit') {
        this.$router.push({ name: 'createEditNews', params: { id: info.row._id } });
      }

      if (info.type === 'delete') {
        this.openDialog('delete');
      }
    },

    handleJumpPage(targetPage) {
      console.log('targetPage---', targetPage);
      // 更新payload api --> 送出api
      // this.payload.pager.pageIndex = targetPage;
      // this.fetchNewsList();
    },

    handleAdjustPageSize(pageSize) {
      console.log('pageSize---', pageSize);
      // 更新payload api --> 送出api
      // this.payload.pager.pageSize = pageSize;
      // this.fetchNewsList();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
