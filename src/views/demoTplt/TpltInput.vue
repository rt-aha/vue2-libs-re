<template>
  <div>
    <input v-model="inputValue" />
    <p>{{ errMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'TpltInput',
  data() {
    return {
      inputValue: 'inputValue',
      errMsg: 'errMsg',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
