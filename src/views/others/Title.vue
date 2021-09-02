<template>
  <div class="page-title">
    <re-dev-sheet>
      <re-dev-desc>說明</re-dev-desc>
      新增一個 type 在組件中，並設定相同名字的 class 在組件中即可使用
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-title type="app">系統標題</re-title>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-title type="demo">demo 使用標題</re-title>
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-title type="dialog">彈窗標題</re-title>
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
};
</script>

<style lang="scss" scoped></style>
