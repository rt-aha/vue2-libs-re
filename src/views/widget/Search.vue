<template>
  <div class="view-dividend-list">
    <re-card>
      <re-search-filter :labelConfig="labelConfig" :searchConfig="searchConfig" @search="handleSearch">
        <template v-slot:default="{ search }">
          <div class="btn-wrapper">
            <re-button @click="handleSearch(search)">搜尋</re-button>
          </div>
        </template>
      </re-search-filter>
    </re-card>
  </div>
</template>

<script>
import { getDividendListAPI } from '@/api/test';
import RemoveContent from '@/views/stock/RemoveContent.vue';
import searchConfig from '@/config/widget/search';

export default {
  name: 'PageReSearch',
  data() {
    return {
      searchConfig: searchConfig(),

      labelConfig: {
        position: 'top',
        width: '80',
        textAlign: 'left',
      },
      tableData: [],
    };
  },

  methods: {
    handleSearch(data) {
      console.log('handle SEarch', data, typeof data);
      console.log(
        data.reduce((obj, item) => {
          obj[item.prop] = item.value;
          return obj;
        }, {}),
      );
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
