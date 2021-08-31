<template>
  <div class="re-dev-desc">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ReDevDesc',
};
</script>

<style lang="scss" scoped>
.re-dev-desc {
  @include font-style($c-assist, 16px, 300);
  margin-bottom: 10px;
}
</style>
