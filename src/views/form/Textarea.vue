<template>
  <div class="page-textarea">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-textarea v-model="textarea1" countLimit="5" rows="5" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-textarea v-model="textarea2" />
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageTextarea',
  data() {
    return {
      textarea1: '111',
      textarea2: '222',
    };
  },
};
</script>

<style lang="scss" scoped></style>
