<template>
  <div class="view-dividend-list">
    <re-table
      :tableData="tableData"
      :columnsConfig="columnsConfig"
      :maxHeight="500"
      @handlePageInfo="handlePageInfo"
      :pagination="pagination"
    />

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
        total: {
          total: '100',
        },
        pager: {
          totalPage: 6,
          pageIndex: 1,
          pageSize: 10,
          count: 100,
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
        const res = await getDividendListAPI({ params: this.pagination.pager });
        this.tableData = res.data;
        this.pagination.pager = res.pageInfo;
        this.pagination.total.total = res.pageInfo.count;
      } catch (e) {
        console.log('e...', e);
      }
    },
    handlePageInfo(info) {
      console.log('info...', info);

      switch (info.from) {
        case 'page-size':
          console.log('?');
          this.pagination.pager.pageSize = Number(info.pageSize);
          break;
        case 'pager':
          this.pagination.pager.pageIndex = Number(info.pageIndex);
          break;
        case 'to':
          this.pagination.pager.pageIndex = Number(info.pageIndex);
          break;

        default:
          break;
      }

      console.log(this.pagination.pager);

      this.getDividendList();
    },
  },

  created() {
    this.getDividendList();
  },
};
</script>

<style lang="scss" scoped>
</style>
