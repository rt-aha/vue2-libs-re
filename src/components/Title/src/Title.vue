<template>
  <p
    class="re-title"
    :class="[
      `re-title__${type}`,
      {
        're-title--mt': mt,
        're-title--inline': inline
      }
    ]"
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
      default: true,
    },
    type: {
      // required: true,
      type: String,
      default: 'demo',
      validator: (value) => ['demo'].includes(value),
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.re-title {
  &__demo {
    @include font-style($c-assist, 18px, 300);
    margin-top: 0px;
    margin-bottom: 10px;
  }

  &--mt {
    margin-top: 25px;
  }

  &--inline {
    display: inline-block;
  }
}
</style>
