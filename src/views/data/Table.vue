<template>
  <div class="view-table-list">
    <re-table
      :tableData="tableData"
      :columnsConfig="columnsConfig"
      :maxHeight="400"
      @handlePageInfo="handlePageInfo"
      :stripe="true"
    />

    <!-- :pagination="pagination" -->
  </div>
</template>

<script>
import { getDividendListAPI } from '@/api/test';
import { columnsConfig } from './tableTestConfig';

export default {
  name: 'PageReTable',
  data() {
    return {
      // searchConfig: searchConfig(),
      // labelConfig: {
      //   position: 'top',
      //   width: '80',
      //   textAlign: 'left',
      // },
      tableData: [],
      // columnsConfig: [],
      // pagination: {
      //   order: ['total', 'page-size', 'pager', 'to'],
      //   pageSize: [10, 50, 100],
      //   total: {
      //     total: '100',
      //   },
      //   pager: {
      //     totalPage: 6,
      //     pageIndex: 1,
      //     pageSize: 10,
      //     count: 100,
      //   },
      // },
    };
  },
  computed: {
    columnsConfig() {
      return columnsConfig(this);
    },
  },
  methods: {
    async getDividendList() {
      try {
        const res = await getDividendListAPI({});
        this.tableData = res.data;
        // this.pagination.pager = res.pageInfo;
        // this.pagination.total.total = res.pageInfo.count;
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

      this.getDividendList();
    },
    testHandleClick(type, rowData) {
      console.log('testHandleClick func...');
      console.log('type', type);
      console.log('rowData', rowData);
    },
  },

  created() {
    this.getDividendList();
  },
};
</script>

<style lang="scss" scoped>
.add-content {
  @include box-padding(10px);
  @include font-style($c-assist, 14px);
}

.btn-wrapper {
  @include flex(flex-end);
}
</style>
