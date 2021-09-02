<template>
  <div class="page-row">
    <re-dev-sheet>
      <re-dev-desc>說明</re-dev-desc>
      當作 flex 使用，可以設定 justifyContent, alignItems, flexDirection props
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-row justifyContent="space-between">
        <p>start</p>
        <p>center</p>
        <p>end</p>
      </re-row>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-row justifyContent="space-between" alignItems="center">
        <p>start</p>
        <p class="high-element">end</p>
      </re-row>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-row alignItems="flex-start" flexDirection="column">
        <p>start</p>
        <p>end</p>
      </re-row>
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageRow',
};
</script>

<style lang="scss" scoped>
.high-element {
  height: 30px;
  line-height: 30px;
  background-color: #ccc;
}
</style>
