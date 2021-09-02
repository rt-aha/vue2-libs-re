<template>
  <div class="page-link">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-link href="https://gitlab.com/">連結文字</re-link>
      <re-link href="https://gitlab.com/" type="red">連結文字</re-link>
      <re-link href="https://gitlab.com/" type="brown">連結文字</re-link>
      <re-link href="https://gitlab.com/" type="green">連結文字</re-link>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>自定義顏色</re-dev-desc>
      <re-link href="https://gitlab.com/" customColor="#f00">連結文字</re-link>
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageLink',
};
</script>
