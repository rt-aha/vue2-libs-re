<template>
  <ul class="r-tree">
    <re-tree-item v-for="tree of treeList" :key="tree.label" :treeItem="tree" />
  </ul>
</template>

<script>

export default {
  name: 'ReTree',
  props: {
    treeList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
