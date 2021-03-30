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
    :style="isCircle"
  >
    <span class="re-button__prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </span>
    <span class="re-button__content" :class="[{'re-button__content--circle': extra === 'circle'}]">
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
  },
  computed: {
    isCircle() {
      console.log(this.type === 'circle' ? '1' : '2');
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

        return {
          width: `${wh}px`,
          height: `${wh}px`,
          'border-radius': `${wh / 2}px`,
        };
      }

      return {};
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
  display: inline-flex;
  align-items: center;
  position: relative;

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
    &--none {
      border-radius: 0px;
    }

    &--default {
      border-radius: 4px;
    }

    &--round {
      border-radius: 50px; // 只是寫一個很大的數字
    }
  }

  &--default {
    border: 1px solid $c-main;
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
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--round {
    border-radius: 4px;
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
      margin-left: 4px;
      box-sizing: border-box;
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 1px solid $c-white;
      border-radius: 50%;
      border-left-color: transparent;
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
