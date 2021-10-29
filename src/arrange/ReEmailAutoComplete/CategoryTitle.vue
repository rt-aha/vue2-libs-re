<template>
  <p class="cus-select-option">
    {{ title }}
  </p>
</template>

<script>
export default {
  name: 'CusSelectOption',
  props: {
    title: {
      type: String,
      default: 'Cus Title',
    },
  },
};
</script>

<style lang="scss" scoped>
.cus-select-option {
  @include font-style($c-orange, 14px, 700);
  position: relative;

  &::after {
    content: '';
    display: inline-block;
    background-color: $c-orange;
    height: 1px;
    width: 100%;
    @include position(tl, calc(100% + 10px), 0);
  }
}
</style>
