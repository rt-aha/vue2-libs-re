<template>
  <div class="cus-select-option">
    <!-- <p>這是一個自定義組件</p>
    <p>這是一個自定義組件</p>
    <p>這是一個自定義組件</p>
    <p>這是一個自定義組件</p> -->
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
