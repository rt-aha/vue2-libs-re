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
    }
  ]"
  >
    <span class="re-button__prefix" v-if="$slots.prefix"
      ><slot name="prefix"></slot
    ></span>
    <span class="re-button__content"><slot></slot></span>
    <span class="re-button__suffix" v-if="$slots.suffix"
      ><slot name="suffix"></slot
    ></span>
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
    },
    size: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: true,
    },
    // isLoading: {
    //   type: Boolean,
    //   default: false,
    // },
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
  // @include flex();
  display: inline-flex;
  align-items: center;

  &:hover {
    opacity: .8;
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
}
</style>
