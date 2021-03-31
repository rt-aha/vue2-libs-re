<template>
  <div>
   <re-input v-model="targetPage" @keyup.native.enter="handleEnter" type="number"/>
  </div>
</template>

<script>
export default {
  name: 'RePaginationToPage',
  data() {
    return {
      targetPage: '',
    };
  },
  methods: {
    handleEnter() {
      this.$emit('handleToPage');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
