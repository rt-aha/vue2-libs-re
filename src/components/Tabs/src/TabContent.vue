<template>
  <div class="re-tab-pane" v-if="activeTab === $attrs.name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ReTabContent',
  inject: ['currTab'],
  computed: {
    activeTab() {
      return this.currTab();
    },
  },
};
</script>

<style lang="scss" scoped></style>
