<template>
  <div class="page-input-list">
    <re-input-list v-model="fruitList" />
  </div>
</template>

<script>
export default {
  name: 'PageInputList',
  data() {
    return {
      fruitList: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
