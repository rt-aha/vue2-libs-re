<template>
  <div
    class="free-container"
    :style="`padding: ${paddingValue}; margin: ${marginValue}; background-color: ${bgc}; box-shadow:${shadow}; border:${border}; border-radius:${radius}`"
    :class="{'isInlineBlock': isInlineBlock}"
  >
    <slot></slot>
  </div>
</template>

<script>


export default {
  props: {
    isInlineBlock: {
      type: string,
      defalut: '0 0 0 0'
    },
    isInlineBlock: {
      type: string,
      default: '0 0 0 0'
    },
    padding: {
      type: string,
      default: '0 0 0 0'
    },
    margin: {
      type: string,
      default: '0 0 0 0'
    },
    bgc: {
      type: string,
      default: 'transparent'
    },
    shadow: {
      type: string,
      default: ''
    },
    border: {
      type: string,
      default: ''
    },
    radius: {
      type: string,
      default: ''
    },
  },
  computed: {
    paddingValue() {
      const getPadding = this.padding.split(' ');
      const paddingParam = getPadding[0] + 'px ' + getPadding[1] + 'px ' + getPadding[2] + 'px ' + getPadding[3] + 'px';
      return paddingParam;
    },
    marginValue() {
      const getMargin = this.margin.split(' ');
      const marginParam = getMargin[0] + 'px ' + getMargin[1] + 'px ' + getMargin[2] + 'px ' + getMargin[3] + 'px';
      return marginParam;
    }

  }
}
</script>

<style lang="scss" scoped>
.free-container {
  width: 100%;
  box-sizing: border-box;
}

.isInlineBlock {
  display: inline-block;
}
</style>
