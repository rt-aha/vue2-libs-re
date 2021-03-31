<template>
  <div class="re-table-label">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'ReTabLabel',
  methods: {
    getSlots() {
      console.log('this.$slots', this.$slots);
    },
  },
  mounted() {
    this.getSlots();
  },
};
</script>

<style lang="scss" scoped>
</style>
