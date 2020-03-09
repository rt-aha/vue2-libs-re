<template>
  <section class="layout-custom-section">
    <aside class="layout-aside"></aside>
    <div class="layout-main">
      <div class="layout-content">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BaseLayout',
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
