<template>
  <div class="page-auto-input">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-auto-input @change="handleChange" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>尺寸：大</re-dev-desc>
      <re-auto-input @change="handleChange" size="large" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>尺寸：小</re-dev-desc>
      <re-auto-input @change="handleChange" size="small" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>自訂輸入框數量</re-dev-desc>
      <re-auto-input @change="handleChange" count="8" />
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageAutoInput',
  methods: {
    handleChange(val) {
      console.log('value ...', val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
