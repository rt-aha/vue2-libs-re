<template>
  <div class="custom-pagination">
    <ul
      class="custom-pager-list"
      v-if="pageInfo.totalPage !== 1"
    >

      <li
        v-show="pageInfo.pageIndex !== 1 || pageInfo.totalPage === 1"
        class="custom-pager-item pager-jump-bg"
        @click="handleJumpPage('prev')"
      >

        <i class="el-icon-arrow-down page-number icon-jump"></i>

      </li>

      <li
        class="custom-pager-item"
        :class="[{'more-sign-bg': typeof item !== 'number'},{'page-index-bg': pageInfo.pageIndex === item}]"
        v-for="(item,index) of pageList"
        :key="index"
        @click="handleJumpPage('jump', item)"
      >
        <span
          class="page-number"
          :class="[{'more-sign': typeof item !== 'number'}, {'page-index': pageInfo.pageIndex === item}]"
        >{{ item}}</span>
      </li>

      <li
        v-show="pageInfo.pageIndex !== pageInfo.totalPage && pageInfo.totalPage > 1"
        class="custom-pager-item pager-jump-bg"
        @click="handleJumpPage('next')"
      >
        <i class="el-icon-arrow-up page-number icon-jump"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pageInfo: {},
  },
  data() {
    return {
      firstPage: 1,
    };
  },
  computed: {
    pageList() {
      // 如果小於6 直接返回
      if (this.pageInfo.totalPage <= 6) {
        let pageList = [];
        for (let i = 1; i <= this.pageInfo.totalPage; i++) {
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

      pageList = pageList.filter(item => {
        return item >= this.firstPage && item <= this.pageInfo.totalPage;
      });

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
    handleJumpPage(operate, page = 0) {
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
  },
};
</script>

<style lang="scss" scoped>
.custom-pagination {
  position: fixed;
  bottom: 50px;
  right: 15px;
  text-align: center;
}

.custom-pager-list {
  display: inline-flex;
  flex-direction: column;
}

.custom-pager-item {
  display: inline-block;
  width: 24px;
  height: 24px;
  position: relative;
  background-color: $c-white;
  border-radius: 50%;
  cursor: pointer;

  & + & {
    margin-top: 8px;
  }
}

.page-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include font-style($c-assist1, $fs-12, $fw-500);
}

// 刪節號
.more-sign-bg {
  background-color: transparent;
  cursor: pointer;
}

.more-sign {
  writing-mode: vertical-lr;
}

// 當前頁
.page-index-bg {
  background-color: $c-main3;
}

.page-index {
  color: $c-main1;
}

// 前一頁 後一頁
.pager-jump-bg {
  background-color: transparent;
}

.page-jump {
  display: inline-block;
  width: 20px;
  vertical-align: bottom;
}
</style>