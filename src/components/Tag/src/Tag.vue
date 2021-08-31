<template>
  <div class="re-tag" :class="[`re-tag--size--${size}`, `re-tag--type--${type}`, `re-tag--round--${round}`]">
    <span class="re-tag__text"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'ReTags',
  props: {
    size: {
      type: String,
      default: 'default',
      validator: (val) => ['small', 'default', 'large'].includes(val),
    },
    type: {
      type: String,
      default: 'default',
      validator: (val) => ['default', 'fill', 'plain', 'border'].includes(val),
    },
    round: {
      type: String,
      default: 'default',
      validator(val) {
        return ['none', 'default', 'round'].indexOf(val) > -1;
      },
    },
    remove: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.re-tag {
  margin: 5px 5px 5px 0;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid rgba($c-main, 0.7);
  background-color: rgba($c-main, 0.2);
  @include box-padding(5px 10px);
  @include inline-flex();
  height: 36px;
  @include font-style($c-main, 12px);

  &--size {
    &--small {
      height: 32px;
    }

    &--large {
      height: 40px;
      @include box-padding(10px);
    }
  }

  &--type {
    &--fill {
      background-color: $c-main;
      color: $c-white;
    }

    &--plain {
      background-color: transparent;
      border: 0px transparent;
    }

    &--border {
      background-color: transparent;
    }
  }

  &--round {
    &--none {
      border-radius: 0px;
    }

    &--round {
      border-radius: 20px;
    }
  }

  &__text {
  }
}
</style>
