<template>
  <a :style="{ color: textColor }" class="re-link" v-bind="$attrs" :target="target"><slot></slot></a>
</template>

<script>
export default {
  name: 'ReLink',
  props: {
    target: {
      type: String,
      default: '_blank',
    },
    type: {
      type: String,
      default: 'default',
      validator: (val) => ['default', 'red', 'brown', 'green'].includes(val),
    },
    customColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    textColor() {
      if (this.customColor) {
        return this.customColor;
      }

      const typeColor = {
        default: '#1e90ff',
        red: '#cd5c5c',
        brown: '#cd853f',
        green: '#4caf50',
      };

      return typeColor[this.type];
    },
  },
};
</script>

<style lang="scss" scoped>
.re-link {
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
}
</style>
