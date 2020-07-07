<template>
  <div>
    <!-- <CusSearch
      :searchConfig="searchConfig"
      @handlSearch="handlSearch"
    > </CusSearch>-->
    <CusTable
      stripe
      :showSummary="true"
      sum-text="合計!"
      :tableData="tpltData"
      :columnConfig="columnConfig"
      :operationConfig="operationConfig"
      @handleOperate="handleOperate"
      @handleJumpPage="handleJumpPage"
      @handleAdjustPageSize="handleAdjustPageSize"
    ></CusTable>
  </div>
</template>

<script>
// import CusSearch from '@/components/custom/CusSearch.vue';
import CusTable from '@/components/customElement/CusTable.vue';
import fakeData from '@/utils/fakeData';
import { columnConfig, operationConfig, searchConfig } from '@/config/tpltConfig';

export default {
  name: 'Table',
  components: {
    // CusSearch,
    CusTable,
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
        summary: {
          genderTotal: 2,
          scoreTotal: 300,
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
    handlSearch(searchParams) {
      console.log('searchParams---', searchParams);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

<style>
.white-space {
  white-space: pre-line;
}
</style>
