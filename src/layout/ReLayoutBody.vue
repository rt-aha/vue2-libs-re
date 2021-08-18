<template>
  <div class="re-layout-body">
    <slot></slot>
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  name: 'ReLayoutBody',
};
</script>

<style lang="scss" scoped>
.re-layout-body {
  @include box-padding(15px 15px 0);
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
