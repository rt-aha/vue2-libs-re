<template>
  <div class="re-tooltip">
    <slot></slot>
    <div class="tooltip-box" :class="[`tooltip-box--direction--${position}`]">
      <component v-if="render" :is="render" v-bind="$attrs" />
      <p v-else class="tooltip-box__content">
        {{ tooltip }}
      </p>
    </div>
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
    render: {
      default: null,
    },
    tooltip: {
      type: String,
      default: 'no content',
    },
  },
};
</script>

<style lang="scss" scoped>
.re-tooltip {
  display: inline-block;
  position: relative;
  width: auto;

  &:hover {
    .tooltip-box {
      /* display: inline-block; */
    }
  }
}

.tooltip-box {
  @include font-style($c-white, 14px);
  @include box-padding(10px);
  /* display: none; */
  position: absolute;
  z-index: 200;
  width: auto;
  background-color: $c-black;
  border-radius: 4px;
  word-wrap: break-word;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
  }

  &--direction {
    &--top {
      top: calc(-100% - 20px);
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
      top: 50%;
      left: calc(100% + 10px);
      transform: translateY(-50%);

      &::before {
        top: 50%;
        left: -8px;
        transform: translateY(-50%);
        border-top: 8px transparent solid;
        border-right: 8px $c-black solid;
        border-bottom: 8px transparent solid;
      }
    }

    &--bottom {
      /* display: inline-block; */
      top: calc(100% + 10px);
      left: 50%;
      width: auto;
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
      top: 50%;
      right: calc(100% + 10px);
      transform: translateY(-50%);

      &::before {
        top: 50%;
        right: -8px;
        transform: translateY(-50%);
        border-left: 8px $c-black solid;
        border-top: 8px transparent solid;
        border-bottom: 8px transparent solid;
      }
    }

    &__content {
      width: auto;
      word-wrap: break-word;
    }
  }
}
</style>
