<template>
  <li  class="re-select-option re-select__option__list__item" :data-option-value="value">
    <span class="re-select-option__item">{{ label }}</span>
  </li>
</template>

<script>
export default {
  name: 'ReSelectOption',
  props: {
    value: {
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>

.re-select-option {
  display: inline-block;
  width: 100%;
  /* background-color: #efefef; */
  @include box-padding(10px);
  cursor: pointer;
  color: $c-assist;
  @include font-style($c-assist, 14px);
  /* transition: .4s; */

  &:hover {
    /* background-color: $c-main; */
    /* color: $c-white; */
    color: $c-main;
    @include font-style($c-main, 14px, 700)
  }
}
</style>
