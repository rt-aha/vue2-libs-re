 <template>
  <div class="re-pagination">
    <!-- <re-pagination-total :totalInfo="100" />
    <re-pagination-page-size :pageSize="[10, 20, 30, 40]" />
    <re-pagination-pager :pageInfo="pageInfo" v-on="$listeners"/>
    <re-pagination-to @handleToPage="handleToPage"/> -->

    <component
      :is="`re-pagination-${comp}`"
      v-for="comp of order"
      :key="comp"
      v-bind="{...$attrs, ...$props}"
      v-on="$listeners"
    />

  </div>
</template>

<script >
export default {
  name: 'RePagination',
  props: {
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
    to: {

    },
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

      pageList = pageList.filter(
        (ele) => ele >= this.firstPage && ele <= this.pageInfo.totalPage,
      );

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

<style lang="scss">
.re-pagination {
  @include flex();
  /* position: fixed;
  bottom: 50px;
  right: 15px; */
  /* text-align: center; */

  > * + * {
    margin-left: 10px;
  }
}

.re-pager-list {
  display: inline-flex;
  /* flex-direction: column; */
}

.re-pager-item {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  background-color: $c-white;
  border-radius: 50%;
  cursor: pointer;

  /* & + & {
    margin-top: 8px;
  } */
}

.page-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include font-style($c-assist, 12px);
}

// 刪節號
.more-sign-bg {
  background-color: transparent;
  cursor: pointer;
}

.more-sign {
  /* writing-mode: vertical-lr; */
}

// 當前頁
.page-index-bg {
  border: 1px solid $c-main;
}

.page-index {
  color: $c-main;
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

.r-arrow {
  width: 30px;
  height: 30px;
  transition: 0.3s;

  &--prev {
    transform: rotate(270deg);
  }

  &--next {
    transform: rotate(90deg);
  }

  &__icon {
    @include position(center);

    &::before,
    &::after {
      content: "";
      width: 6px;
      height: 2px;
      border-radius: 1px;
      background-color: $c-assist;
      display: inline-block;
      position: absolute;
      top: 50%;

      transform: translateY(-50%);
      // transform-origin: 50% 50%;
    }

    &::before {
      transform: rotate(45deg) translateY(-50%);
      left: -2px;
    }

    &::after {
      transform: rotate(-45deg) translateY(-50%);
      right: -2px;
    }
  }
}
</style>
