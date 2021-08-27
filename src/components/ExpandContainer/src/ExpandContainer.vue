<template>
  <CollapseTransition>
    <div class="re-expand-container" v-show="visible" v-on-clickaway="handleVisible">
      <div
        class="re-expand-container__content"
        :style="{
          'max-height': maxHeight,
        }"
      >
        <slot></slot>
      </div>
    </div>
  </CollapseTransition>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import CollapseTransition from '@/utils/collapse-transition';

export default {
  name: 'ReExpandContainer',
  components: {
    CollapseTransition,
  },
  directives: {
    onClickaway,
  },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: [String, Number],
      default: '200px',
    },
  },
  methods: {
    handleVisible() {
      this.$emit('update:visible', false);
    },
  },
  computed: {
    width() {
      if (Number.isNaN(Number(this.maxHeight))) {
        return `${this.maxHeight}px`;
      }
      return this.maxHeight;
    },
  },
};
</script>

<style lang="scss">
.re-expand-container {
  @include position(tl, 100%, 0);
  z-index: 100;
  width: 100%;

  &__content {
    height: auto;
    /* max-height: 200px; */
    margin-top: 5px;
    background-color: $c-white;
    box-sizing: border-box;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    overflow: auto;
    box-shadow: 0 0 10px #cdcdcd;
  }
}
</style>
