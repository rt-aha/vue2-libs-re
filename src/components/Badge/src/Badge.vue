<template>
  <div class="re-badge" :class="{ 're-badge--position': position !== '' }">
    <div class="re-badge__content" :class="{ 're-badge__content--position--left': position === 'left' }">
      <slot></slot>
    </div>
    <div
      class="badge-box"
      :class="[`badge-box--color-type--${colorType}`, `badge-box--position--${position}`, { 'badge-box--dot': dot }]"
    >
      <div class="badge-box__value-cell" :class="{ 'badge-box__value-cell--dot': dot }">
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
    colorType: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'brown', 'green', 'red'].indexOf(val) > -1;
      },
    },
    position: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'left', 'right'].indexOf(val) > -1;
      },
    },
    dot: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.re-badge {
  display: inline-block;
  position: relative;

  // position === left or position === right
  &--position {
    display: inline-flex;
    align-items: center;
  }

  &__content {
    &--position {
      &--left {
        order: 2;
      }
    }
  }
}

.badge-box {
  @include position(tr, -10px, 0);
  transform: translateX(50%);
  min-width: 20px;
  height: 20px;
  border-radius: 10px;

  &--dot {
    @include circle(8px);
    top: 0;
    transform: translate(50%, -50%);
    min-width: 8px;
  }

  &--color-type {
    &--default {
      background-color: $c-badge--default;
    }

    &--brown {
      background-color: $c-badge--brown;
    }

    &--green {
      background-color: $c-badge--green;
    }

    &--red {
      background-color: $c-badge--red;
    }
  }

  &--position {
    &--right {
      position: static;
      transform: translateX(0);
      width: auto;
      margin-left: 10px;
    }

    &--left {
      order: 1;
      position: static;
      transform: translateX(0);
      margin-right: 10px;
    }
  }

  &__value-cell {
    @include box-padding(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    &--dot {
      display: none;
    }

    &__value {
      @include font-style($c-white, 12px);
      display: inline-block;
    }
  }
}
</style>
