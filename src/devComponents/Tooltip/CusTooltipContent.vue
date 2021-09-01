<template>
  <div class="cus-tooltip-content">
    <p class="cus-tooltip-content__text">一段很長很長的字</p>
  </div>
</template>

<script>
export default {
  name: 'CusTooltipContent',
};
</script>

<style lang="scss" scoped>
.cus-tooltip-content {
  display: inline-block;
  width: auto;

  &__text {
    display: inline-block;
    width: auto;
    word-wrap: break-word;
  }
}
</style>
