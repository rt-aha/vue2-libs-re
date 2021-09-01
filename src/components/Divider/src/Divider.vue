<template>
  <re-dev-sheet>
    <re-dev-desc>基本使用</re-dev-desc>
    <div class="re-divider" :style="{ 'margin-top': mt, 'margin-bottom': mb }"></div>
  </re-dev-sheet>
</template>

<script>
export default {
  name: 'ReDivider',
  props: {
    mt: {
      type: String,
      default: '10px',
    },
    mb: {
      type: String,
      default: '10px',
    },
  },
};
</script>

<style lang="scss" scoped>
.re-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
}
</style>
