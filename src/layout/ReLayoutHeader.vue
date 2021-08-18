<template>
  <div class="re-layout-header">{{ title }}</div>
</template>

<script>
export default {
  name: 'ReLayoutHeader',
  props: {
    title: {
      type: String,
      default: 'ReHeader',
    },
  },
};
</script>

<style lang="scss" scoped>
.re-layout-header {
  @include box-padding(10px 15px);
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
</style>
