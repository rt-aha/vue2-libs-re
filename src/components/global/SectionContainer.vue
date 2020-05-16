<template>
  <div class="section-container">
    <slot></slot>
  </div>
</template>

<script>
export default class SectionContainer extends Vue {}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.section-container {
  width: 100%;
  box-sizing: border-box;
  padding: 50px 0 50px 50px;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>