<template>
  <div class="view-dividend-list">
    <re-table
      :tableData="tableData"
      :columnsConfig="columnsConfig"
      :maxHeight="500"
      @handlePageInfo="handlePageInfo"
      :pagination="pagination"
      :stripe="true"
    />

    <!-- slot dialog -->
    <re-dialog :visible.sync="dialog.add" footerPosition="center">
      <template #header>
        <re-title type="dialog" :mt="false">新增</re-title>
      </template>
      <template>
        <div class="add-content">
          新增的內容 ... {{ rowData.name }}({{ rowData.symbol }})
        </div>
      </template>
      <template #footer>
        <re-button @click="closeDialog('add')">取消</re-button>
      </template>
    </re-dialog>
    <!-- template dialog -->
    <re-dialog
      dialogTitle="刪除"
      :visible.sync="dialog.remove"
      :template="removeTemplate"
      :data="rowData"
      @close="closeDialog('add')"
    >
    </re-dialog>
  </div>
</template>

<script>
import { getDividendListAPI } from '@/api/test';
import { columnsConfig } from '@/views/stock/dividendListConfig';
import RemoveContent from './RemoveContent.vue';

export default {
  name: 'DividendList',
  data() {
    return {
      removeTemplate: RemoveContent,
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
      dialog: {
        add: false,
        remove: false,
      },
      rowData: {},
    };
  },
  computed: {
    columnsConfig() {
      return columnsConfig(this);
    },
  },
  methods: {
    openDialog(type) {
      this.dialog[type] = true;
    },
    closeDialog(type) {
      this.dialog[type] = false;
    },
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

      this.getDividendList();
    },
    handlClick(type, rowData) {
      this.rowData = rowData;
      switch (type) {
        case 'add':
          this.openDialog('add');
          break;
        case 'remove':
          this.openDialog('remove');
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
.add-content {
  @include box-padding(10px);
  @include font-style($c-assist, 14px);
}
</style>
