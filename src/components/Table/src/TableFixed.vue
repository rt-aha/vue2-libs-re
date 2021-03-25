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

<style lang="scss">
.re-table-fixed {
  display: inline-block;
  @include position(tr, 0, 0);
  height: 100%;
  background-color: $c-white;
  border-left: 1px solid $c-lightgrey;
}
</style>
