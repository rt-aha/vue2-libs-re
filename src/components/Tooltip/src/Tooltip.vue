<template>
  <div class="re-tooltip">
    <slot></slot>
    <div class="tooltip-box" :class="[`tooltip-box--direction--${position}`]">tooltip</div>
  </div>
</template>

<script>
export default {
  name: 'ReTooltip',
  props: {
    position: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right', 'top', 'bottom'].includes(val),
    },
  },
};
</script>

<style lang="scss" scoped>
.re-tooltip {
  display: inline-block;
  position: relative;

  &:hover {
    .tooltip-box {
      display: inline-block;
    }
  }
}

.tooltip-box {
  display: none;
  position: absolute;
  width: auto;
  @include font-style($c-white, 14px);
  background-color: $c-black;
  @include box-padding(10px);
  border-radius: 4px;
  z-index: 200;

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 0;
    height: 0;
  }

  &--direction {
    &--top {
      top: calc(-100% - 10px);
      left: 50%;
      transform: translateX(-50%);

      &::before {
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-top: 8px $c-black solid;
        border-left: 8px transparent solid;
        border-right: 8px transparent solid;
      }
    }

    &--right {
      left: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%);

      &::before {
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        border-top: 8px transparent solid;
        border-right: 8px $c-black solid;
        border-bottom: 8px transparent solid;
      }
    }

    &--bottom {
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);

      &::before {
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-bottom: 8px $c-black solid;
        border-left: 8px transparent solid;
        border-right: 8px transparent solid;
      }
    }

    &--left {
      right: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%);

      &::before {
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        border-left: 8px $c-black solid;
        border-top: 8px transparent solid;
        border-bottom: 8px transparent solid;
      }
    }
  }
}
</style>
