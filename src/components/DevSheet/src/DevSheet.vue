<template>
  <div class="re-dev-sheet">
    <slot />

    <div class="divider" />
  </div>
</template>

<script>
export default {
  name: 'ReDevSheet',
};
</script>

<style lang="scss" scoped>
.re-dev-sheet {
  & + & {
    margin-top: 10px;
  }
}

.divider {
  width: 100%;
  height: 1px;
  margin: 25px 0;
  background-color: #dfdfdf;
}
</style>
