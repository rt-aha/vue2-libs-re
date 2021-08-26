<template>
  <div class="re-expand-container" v-show="visible" v-on-clickaway="handleVisible">
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
  width: 100%;
  @include position(tl, calc(100%), 0);
  z-index: 100;

  &__content {
    background-color: $c-white;
    margin-top: 5px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 10px;
    border: 2px solid $c-orange;
  }
}
</style>
