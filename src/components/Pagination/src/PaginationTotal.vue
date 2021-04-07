<template>
  <div class="re-pagination-total">
    <span class="re-pagination-total__total">{{
      total.preText || "總共"
    }}</span>
    <span class="re-pagination-total__count"> {{
      total.total || total
    }} </span>
    <span class="re-pagination-total__unit">{{
      total.suffText || "筆"
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'RePaginationTotal',
  props: {
    total: {
      type: [Object, String, Number],
      default: () => ({
        total: '0',
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.re-pagination-total {
  &__total {
    @include font-style($c-assist, 14px);
  }

  &__count {
    @include font-style($c-assist, 14px);
  }

  &__unit {
    @include font-style($c-assist, 14px);
  }
}
</style>
