<template>
  <div class="re-divider" :style="{'margin-top': margin, 'margin-bottom': margin}">

  </div>
</template>

<script>

export default {
  name: 'ReDivider',
  props: {
    margin: {
      type: String,
      default: '10px',
    },
  },
};
</script>

<style lang="scss" scoped>
.re-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
}
</style>
