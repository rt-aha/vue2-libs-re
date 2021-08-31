<template>
  <div
    class="re-card"
    :class="[
      {
        're-card--border': border,
      },
    ]"
    :style="{ padding: pd }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ReCard',
  props: {
    pd: {
      type: String,
      default: '10px',
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.re-card {
  margin-bottom: 30px;

  &--border {
    border: 1px solid $c-lightgrey;
    border-radius: 4px;
  }
}
</style>
