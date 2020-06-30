<template>
  <div>
    <el-input
      v-model="innerValue"
      @input="$emit('input', innerValue)"
      @blur="handleValidate"
      :type="$attrs.type"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchEleInput',
  data() {
    return {
      innerValue: '',
      errMsg: 'errMsg',
    };
  },
  props: {
    value: String,
    inputConfig: {
      type: Object,
      default() {
        return {
          defaultValue: '123',
          placeholder: '請輸入',
        };
      },
    },
  },
  methods: {
    handleValidate() {
      // 搜尋暫時不需要
      // this.dispatchEvent(this.$parent, 'handleBlur', this.innerValue);
    },
  },
  created() {
    this.innerValue = this.inputConfig.defaultValue;
    // this.$on('handleValidate', this.handleValidate);
  },
};
</script>

<style lang="scss" scoped>
</style>
