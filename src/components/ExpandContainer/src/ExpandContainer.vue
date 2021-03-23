<template>
  <div
    class="re-expand-container"
    v-show="visible"
    v-on-clickaway="handleVisible"
    :style="{
      'max-width': `${maxWidth}px`
    }"
  >
    <div class="re-expand-container__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: 'ReExpandContainer',
  directives: {
    onClickaway,
  },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    maxWidth: {
      type: [String, Number],
      default: 200,
    },
  },
  methods: {
    handleVisible() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style lang="scss">
.re-expand-container {
  @include position(tl, calc(100%), 0);
  z-index: 100;

  &__content {
    background-color: $c-white;
    margin-top: 5px;
    box-sizing: border-box;
    border: 1px solid $c-main;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
