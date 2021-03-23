<template>
  <div
    class="re-row"
    :class="{
      're-row--mt': mt,
    }"
    :style="rowStyle"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ReRow',
  props: {
    mt: {
      type: Boolean,
      default: true,
    },
    justifyContent: {
      type: String,
      default: 'flex-start',
    },
    alignItems: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    rowStyle() {
      return {
        'justify-content': this.justifyContent,
        'align-items': this.alignItems,
      };
    },
  },
};
</script>

<style lang="scss">
.re-row {
  display: flex;
  position: relative;

  &--mt {
    margin-top: 10px;
  }
}
</style>
