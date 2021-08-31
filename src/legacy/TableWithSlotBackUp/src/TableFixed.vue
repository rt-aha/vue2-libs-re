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
  @include position(tr, 0, 0px);
  height: 100%;
  z-index: 10000;
  overflow: hidden;
  box-sizing: border-box;
  background-color: rgba(#3cb371, 0.5);
  box-shadow: -3px 0px 5px $c-lightgrey;
}
</style>
