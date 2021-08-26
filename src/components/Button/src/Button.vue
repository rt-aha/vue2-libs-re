<template>
  <button
    class="re-button"
    @click="handleClick"
    :disabled="disabled || isLoading"
    :class="[
      `re-button--${type}`,
      `re-button--size--${size}`,
      `re-button--round--${round}`,
      {
        're-button--disabled': disabled || isLoading,
      },
    ]"
    :style="setExtraStyle"
  >
    <span class="re-button__prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </span>
    <span class="re-button__content" :class="[{ 're-button__content--circle': extra === 'circle' }]">
      <slot></slot>
    </span>
    <span class="re-button__suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </span>
    <span class="re-button__loading" v-if="isLoading">
      <span
        class="re-button__loading__icon"
        :class="{
          're-button__loading__icon--main-color': ['border', 'plain'].includes(type),
        }"
      ></span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ReButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'border', 'plain', 'circle'].indexOf(val) > -1;
      },
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default', 'large'].indexOf(val) > -1;
      },
    },
    round: {
      type: String,
      default: 'default',
      validator(val) {
        return ['none', 'default', 'round'].indexOf(val) > -1;
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    extra: {
      type: String,
      default: '',
    },
    bgColor: {
      default: '',
      validator: (val) => {
        if (val) {
          const colorCodeRegExp = /^#[A-F0-9]{6}$/;
          return colorCodeRegExp.test(val);
        }

        return true;
      },
    },
  },
  computed: {
    setExtraStyle() {
      let extraStyles = {};

      if (this.bgColor) {
        extraStyles['background-color'] = this.bgColor;
      }

      if (this.extra === 'circle') {
        let wh = 36;
        switch (this.size) {
          case 'small':
            wh = 32;
            break;
          case 'large':
            wh = 40;
            break;
          default:
            wh = 36;
            break;
        }

        extraStyles = {
          ...extraStyles,
          width: `${wh}px`,
          height: `${wh}px`,
          'border-radius': `${wh / 2}px`,
        };
      }

      return extraStyles;
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss">
.re-button {
  @include box-padding(8px 16px);
  @include set-btn-default();
  @include font-style($c-white, 14px);
  display: inline-block;
  /* align-items: center; */
  position: relative;
  border: 0;

  &:hover {
    opacity: 0.8;
  }

  & + & {
    margin-left: 8px;
  }

  &--size {
    &--small {
      height: 32px;
    }

    &--default {
      height: 36px;
    }

    &--large {
      height: 40px;
    }
  }

  &--round {
    border-radius: 4px;

    &--none {
      border-radius: 0;
    }

    &--default {
      border-radius: 4px;
    }

    &--round {
      border-radius: 50px; // 只是寫一個很大的數字
    }
  }

  &--default {
    // border: 1px solid $c-main;
    background-color: $c-main;
  }

  &--border {
    color: $c-main;
    border: 1px solid $c-main;
  }

  &--plain {
    color: $c-main;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__prefix {
    display: inline-block;
    margin-right: 4px;
  }

  &__content {
    display: inline-block;

    &--circle {
      @include position(center);
    }
  }

  &__suffix {
    display: inline-block;
    margin-left: 4px;
  }

  &__loading {
    &__icon {
      display: inline-block;
      box-sizing: border-box;
      width: 10px;
      height: 10px;
      margin-left: 4px;
      border: 1px solid $c-white;
      border-left-color: transparent;
      border-radius: 50%;
      animation: btn-loading 2s linear infinite;

      &--main-color {
        border-color: $c-assist;
        border-left-color: transparent;
      }
    }
  }
}

@keyframes btn-loading {
  from {
    transform: rotate(0deg);
  }

  from {
    transform: rotate(360deg);
  }
}
</style>
