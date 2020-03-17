<template>
  <div>
    <el-date-picker v-model="innerValue"
                    @input="$emit('input', innerValue);"
                    @change="handleChange" />
  </div>
</template>

<script>


export default {
  name: 'CusEleDatePicker',
  data() {
    return {
      innerValue: '',
      errMsg: 'errMsg',


    };
  },
  props: {
    value: {
      default: ''
    },
    config: {
      type: Object,
      default() { return { placeholder: '請輸入', options: '' }; }
    }
  },
  methods: {
    handleValidate() {
      // 觸發驗證，把現在的值與實例透過mixin傳給wrapper處理
      this.dispatchEvent(this.$parent, 'handleBlur', this.innerValue);
    },
    handleChange() {
      console.log('handleChange-CusEleDatePicker');
    }
  },
  computed: {},
  created() {
    this.innerValue = this.config.defaultValue;
    this.$on('handleValidate', this.handleValidate);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>