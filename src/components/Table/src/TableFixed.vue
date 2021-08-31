<template>
  <div class="re-table-fixed">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ReTableFixed',
};
</script>

<style lang="scss" scoped>
.re-table-fixed {
  @include position(tr, 0, 0);
  z-index: 99;
  height: 100%;
  background-color: rgba(#3cb371, 0.5);
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: -3px 0 5px $c-lightgrey;
}
</style>
