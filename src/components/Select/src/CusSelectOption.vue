<template>
  <div class="cus-select-option">
    <div>start</div>
    <div>end</div>
  </div>
</template>

<script>
export default {
  name: 'CusSelectOption',
};
</script>

<style lang="scss" scoped>
.cus-select-option {
  @include flex(space-between);
}
</style>
