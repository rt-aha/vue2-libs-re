<template>
  <div class="re-pagination-to">
   <re-input
   v-model="targetPage"
   @keyup.native.enter="handleEnter"
    type="number">
      <template #suffix>
       頁
      </template>
    </re-input>
  </div>
</template>

<script>
export default {
  name: 'RePaginationTo',
  data() {
    return {
      targetPage: '',
    };
  },
  methods: {
    handleEnter() {
      const value = Number(this.targetPage);
      this.$emit('handleTo', value);

      this.$emit('handlePageInfo', {
        from: 'to',
        pageIndex: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.re-pagination-to {
  width: 70px;
}
</style>
