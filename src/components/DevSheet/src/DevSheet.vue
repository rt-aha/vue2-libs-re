<template>
  <div class="re-dev-sheet">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ReDevSheet',
};
</script>

<style lang="scss">
.re-dev-sheet {
  & + & {
    margin-top: 10px;
  }
}
</style>
