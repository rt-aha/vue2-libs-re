<template>
  <div>
    <input v-model="innerValue"
           @input="$emit('input',innerValue)"
           @blur="handleBlur" />
    <p>{{ errMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'TpltInput',
  data() {
    return {
      innerValue: '',
      errMsg: 'errMsg',
    };
  },
  props: {
    value: String
  },
  methods: {
    handleBlur() {
      // 觸發驗證，把現在的值與實例透過mixin傳給wrapper處理
      this.dispatchEvent(this.$parent, 'handleBlur', this.innerValue);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
