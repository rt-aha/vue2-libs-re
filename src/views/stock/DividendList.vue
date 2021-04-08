<template>
  <div class="view-dividend-list">
    <re-table
      :tableData="tableData"
      :columnsConfig="columnsConfig"
      :maxHeight="500"
      @handlePageInfo="handlePageInfo"
      :pagination="pagination"
    >

    </re-table>
  </div>
</template>

<script>
import { getDividendListAPI } from '@/api/test';
import { columnsConfig } from '@/views/stock/dividendListConfig';

export default {
  name: 'DividendList',
  data() {
    return {
      tableData: [],
      // columnsConfig: [],
      pagination: {
        order: ['total', 'page-size', 'pager', 'to'],
        pageSize: [10, 50, 100],
        pager: {
          totalPage: 6,
          pageIndex: 1,
          pageSize: 10,
        },
      },
    };
  },
  computed: {
    columnsConfig() {
      return columnsConfig();
    },
  },
  methods: {
    async getDividendList() {
      try {
        const data = await getDividendListAPI();
        this.tableData = data;
      } catch (e) {
        console.log('e...', e);
      }
    },
    handlePageInfo(info) {
      console.log('info...', info);

      switch (info.from) {
        case 'pageSize':
          this.pagination.pager.pageSize = info.pageSize;
          break;
        case 'pager':
          this.pagination.pager.pageIndex = info.pageIndex;
          break;
        case 'to':
          this.pagination.pager.pageIndex = info.pageIndex;
          break;

        default:
          break;
      }
    },
  },

  created() {
    this.getDividendList();
  },
};
</script>

<style lang="scss" scoped>
</style>
