<template>
  <div class="re-badge">
    <slot></slot>
    <div class="badge-box">
      <div class="badge-box__value-cell">
        <span class="badge-box__value-cell__value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReBadge',
  props: {
    value: {
      type: [String, Number],
      default: '12',
    },
  },
};
</script>

<style lang="scss" scoped>

.re-badge {
  position: relative;
  display: inline-block;
}

.badge-box {
  height: 20px;
  min-width: 20px;
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: $c-badge;
  border-radius: 10px;

  &__value-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    @include box-padding(5px);

    &__value {
      display: inline-block;
      @include font-style($c-white, 12px);
    }
  }
}

</style>
