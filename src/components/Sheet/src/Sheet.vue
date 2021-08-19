<template>
  <div class="re-sheet">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ReSheet',
};
</script>

<style lang="scss">
.re-sheet {
  & + & {
    margin-top: 10px;
  }
}
</style>
