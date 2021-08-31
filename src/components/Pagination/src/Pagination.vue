<template>
  <div class="re-pagination">
    <!-- <re-pagination-total :totalInfo="100" />
    <re-pagination-page-size :pageSize="[10, 20, 30, 40]" />
    <re-pagination-pager :pageInfo="pageInfo" v-on="$listeners"/>
    <re-pagination-to @handleToPage="handleToPage"/> -->

    <component
      :is="`re-pagination-${comp}`"
      v-for="comp of pagination.order"
      :key="comp"
      v-bind="{ ...$attrs, ...$props, ...$props.pagination }"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'RePagination',
  props: {
    pagination: {
      type: Object,
      default: () => ({
        pager: {
          totalPage: 6,
          pageIndex: 1,
          pageSize: 10,
        },
        order: ['pager'],
        total: {
          total: '100',
        },
        pageSize: [10, 20, 30, 40, 50],
        to: {},
      }),
    },
    size: {
      type: String,
      default: 'default',
      validator: (val) => ['small', 'default'].includes(val),
    },
    pageInfo: {
      type: Object,
      default: () => ({}),
    },
    order: {
      type: Array,
      default: () => ['pager'],
    },
    // total設定
    total: {
      type: [Object, String, Number],
      default: () => ({
        total: '100',
      }),
    },
    // pageSize設定
    pageSize: {
      type: [Array],
      default: () => [10, 20, 30, 40, 50],
    },
    to: {},
  },
  data() {
    return {
      // pageInfo: {},
      firstPage: 1,
    };
  },
  computed: {
    // 渲染頁數
    pageList() {
      // 如果小於6 直接返回
      if (this.pageInfo.totalPage <= 6) {
        const pageList = [];
        for (let i = 1; i <= this.pageInfo.totalPage; i += 1) {
          pageList.push(i);
        }
        return pageList;
      }

      let pageList = [
        this.pageInfo.pageIndex - 2,
        this.pageInfo.pageIndex - 1,
        this.pageInfo.pageIndex,
        this.pageInfo.pageIndex + 1,
        this.pageInfo.pageIndex + 2,
      ];

      pageList = pageList.filter((ele) => ele >= this.firstPage && ele <= this.pageInfo.totalPage);

      // 補1
      if (this.pageInfo.pageIndex - 2 - this.firstPage === 1) {
        pageList.splice(0, 0, 1);
      }

      // 補... 和 1
      if (this.pageInfo.pageIndex - 2 - this.firstPage > 1) {
        pageList.splice(0, 0, '⋯');
        pageList.splice(0, 0, 1);
      }

      // 補最大頁數
      if (this.pageInfo.totalPage - (this.pageInfo.pageIndex + 2) >= 1) {
        pageList.push(this.pageInfo.totalPage);
      }

      // 補最大頁數...
      if (this.pageInfo.totalPage - (this.pageInfo.pageIndex + 2) > 1) {
        pageList.splice(-1, 0, '⋯');
      }

      return pageList;
    },
  },

  methods: {
    handleJumpPage(operate, page) {
      // 唯一的string是刪節號，直接返回
      if (typeof page === 'string') {
        return;
      }

      let targetPage = 0;
      if (operate === 'prev') {
        targetPage = this.pageInfo.pageIndex - 1;
      }

      if (operate === 'next') {
        targetPage = this.pageInfo.pageIndex + 1;
      }

      if (operate === 'jump') {
        targetPage = page;
      }

      this.$emit('handleJumpPage', targetPage);
    },
    handleToPage() {
      console.log('handleToPage...');
    },
  },
};
</script>

<style lang="scss" scoped>
.re-pagination {
  @include flex();

  > * + * {
    margin-left: 10px;
  }
}
</style>
