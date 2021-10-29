<template>
  <button
    class="ei-button"
    :class="[
      `ei-button--${color}--${type}`,
      `ei-button--size--${size}`,
      { 'ei-button--margin-left-8': marginLeft8, 'ei-button--disabled': disabled },
    ]"
    @click.prevent="handleClick"
  >
    <span class="ei-button__text"><slot /></span>
    <div v-if="showMoreIcon" class="expand-down" :class="{ 'expand-down--active': showMore }">
      <img class="expand-down__icon" src="@/assets/images/e-receipt/arrow-down.svg" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'EiButton',
  props: {
    color: {
      type: String,
      default: 'orange',
      validator(val) {
        return ['orange', 'blue', 'grey', 'light-grey'].indexOf(val) > -1;
      },
    },
    type: {
      type: String,
      default: 'default', // 實心
      validator(val) {
        return ['default', 'border'].indexOf(val) > -1;
      },
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'small', 'tiny'].indexOf(val) > -1;
      },
    },
    marginLeft8: {
      type: Boolean,
      default: true,
    },
    showMoreIcon: {
      type: Boolean,
      default: false,
    },
    showMore: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      if (!this.disabled) {
        this.$emit('click', e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ei-button {
  flex: 1;
  @include flex(center);

  border-radius: 2px;

  & + & {
    margin-left: 20px;
  }

  &--margin-left-8 {
    & + & {
      margin-left: 8px;
    }
  }

  &--orange {
    &--default {
      border: 1px solid $c-orange;
      background-color: $c-orange;
      @include font-style($c-white, 16px);
    }

    &--border {
      border: 1px solid $c-orange;
      background-color: transparent;
      @include font-style($c-orange, 16px);
    }
  }

  &--blue {
    &--default {
      border: 1px solid $c-blue;
      background-color: $c-blue;
      @include font-style($c-white, 16px);
    }

    &--border {
      border: 1px solid $c-blue;
      background-color: transparent;
      @include font-style($c-blue, 16px);
    }
  }

  &--grey {
    &--default {
      border: 1px solid $c-ei-text1;
      background-color: $c-ei-text1;
      @include font-style($c-white, 16px);
    }

    &--border {
      border: 1px solid $c-ei-text1;
      background-color: transparent;
      @include font-style($c-ei-text1, 16px);
    }
  }

  &--light-grey {
    &--default {
      border: 1px solid $c-ei-grey3;
      background-color: $c-ei-grey3;
      @include font-style($c-white, 16px);
    }

    &--border {
      border: 1px solid $c-ei-grey3;
      background-color: transparent;
      @include font-style($c-ei-text1, 16px);
    }
  }

  &--size {
    &--default {
      height: 48px;
    }

    &--small {
      height: 40px;
      font-size: 14px;
    }

    &--tiny {
      height: 32px;
      @include box-padding(6px 16px);
      font-size: 14px;
    }
  }

  &--disabled {
    border: 1px solid $c-blue;
    background-color: transparent;
    @include font-style($c-blue, 14px);
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.expand-down {
  width: 20px;
  height: 20px;
  transform: rotate(360deg);
  transition: 0.4s;

  &__icon {
    width: 20px;
  }

  &--active {
    transform: rotate(180deg);
  }
}
</style>
