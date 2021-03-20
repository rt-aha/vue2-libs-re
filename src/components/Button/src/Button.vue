<template>
  <button
    class="re-button"
    @click="handleClick"
    :disabled="disabled"
    :class="[
      `re-button--${type}`,
      `re-button--${size}`,
      {
        're-button--disabled': disabled,
        're-button--round': round,
      },
    ]"
  >
    <!-- btn2 -->
    <span class="re-button__prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </span>
    <span class="re-button__content">
      <slot></slot>
    </span>
    <span class="re-button__suffix" v-if="$slots.suffix">
      <slot name="suffix">3</slot>
    </span>
    <span class="re-button__loading" v-if="isLoading">
      <span
        class="re-button__loading__icon"
        :class="{
          're-button__loading__icon--main-color': ['border', 'plain'].includes(type),
        }"
      >4</span>
    </span>
  </button>
</template>

<script>
export default {
  name: 're-button',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      console.log('click !');
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss">
.re-button {
  @include box-padding(10px 16px);
  @include set-btn-default();
  @include font-style($c-white, "14px");
  display: inline-flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  & + & {
    margin-left: 8px;
  }

  &--small {
    @include box-padding(6px 12px);
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
      @include cus-border($c-white, 50%, 1px);
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
