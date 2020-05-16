<template>
  <div>
    <el-date-picker v-model="innerValue" @change="handleValidate" type="date" placeholder="選擇日期" />
  </div>
</template>

<script>
export default {
  name: 'SearchEleDatePicker',
  props: {
    value: {
      type: String,
      default: '',
    },
    datePickerConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      innerValue: '',
      errMsg: 'errMsg',
    };
  },
  methods: {
    handleValidate() {
      // 搜尋暫時不需要
      // this.dispatchEvent(this.$parent, 'handleBlur', this.innerValue);
    },
  },
  created() {
    this.innerValue = this.datePickerConfig.defaultValue;
    // this.$on('handleValidate', this.handleValidate);
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
