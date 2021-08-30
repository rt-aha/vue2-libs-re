<template>
  <div class="page-tree">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-tree :treeList="treeList" />
    </re-dev-sheet>
  </div>
</template>

<script>
import { treeList } from '@/views/data/tableTestConfig';

export default {
  name: 'PageTree',
  data() {
    return {
      treeList,
    };
  },
};
</script>

<style lang="scss"></style>
