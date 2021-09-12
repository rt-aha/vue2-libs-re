<template>
  <p
    class="re-title"
    :class="[
      `re-title__${type}`,
      {
        're-title--mt': mt,
        're-title--inline': inline,
      },
    ]"
    @click="$emit('click')"
  >
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'ReTitle',
  props: {
    mt: {
      type: Boolean,
      default: false,
    },
    type: {
      // required: true,
      type: String,
      default: 'demo',
      validator: (value) => ['app', 'demo', 'dialog'].includes(value),
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.re-title {
  &__app {
    @include font-style($c-main, 48px, 700);
  }

  &__demo {
    @include font-style($c-main, 24px, 400);
    margin-bottom: 10px;
  }

  &__dialog {
    @include font-style($c-assist, 18px, 300);
  }

  &--mt {
    margin-top: 25px;
  }

  &--inline {
    display: inline-block;
  }
}
</style>
