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
    flexDirection: {
      type: String,
      default: 'row',
    },
  },
  computed: {
    rowStyle() {
      return {
        'flex-direction': this.flexDirection,
        'justify-content': this.justifyContent,
        'align-items': this.alignItems,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.re-row {
  display: flex;
  position: relative;

  &--mt {
    margin-top: 10px;
  }
}
</style>
