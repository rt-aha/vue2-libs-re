<template>
  <div>
    <el-date-picker
      v-model="innerValue"
      @input="$emit('input', innerValue);"
      @change="triggerValidate"
      type="date"
      placeholder="選擇日期"
    />
  </div>
</template>

<script>


export default {
  name: 'CusDatePicker',
  props: {
    value: {
      default: ''
    },
    inputConfig: {
      type: Object,
      default() { return {}; }
    }
  },
  data() {
    return {
      innerValue: '',
      errMsgText: 'errMsg',
      identification: 'cus-input',
    };
  },
  computed: {
    errMsg() {
      return this.errMsgText();
    },
  },
  methods: {
    triggerValidate() {
      // this.$emit('input', this.innerValue);
      this.$parent.handleValidate([this.innerValue]);
    },
    setValue() {
      this.innerValue = this.value;
    }
  },
  created() {
    // 父層v-model 優先度高於inputConfig.defaultValue
    this.innerValue = this.inputConfig.defaultValue;
    if (this.value || this.value === '') {
      this.setValue();
    }
  },
  watch: {
    value: {
      handler: 'setValue',
    }
  }
}
</script>

<style lang="scss" scoped>
</style>