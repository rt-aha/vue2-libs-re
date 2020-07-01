<template>
  <div>
    <el-select
      v-model="innerValue"
      @input="$emit('input', innerValue);"
      @change="triggerValidate"
      :placeholder="inputConfig.placeholder"
    >
      <el-option
        v-for="item in allOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CusSelector',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    inputConfig: {
      type: Object,
      default() { return { placeholder: '請輸入', options: [] }; }
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
    allOptions() {
      let defaultOptions = [
        {
          label: '請選擇',
          value: null,
          disabled: true,
        },
      ];

      if (this.inputConfig.options) {
        defaultOptions = [...defaultOptions, ...this.inputConfig.options];
      }
      return defaultOptions;
    }
  },
  methods: {
    triggerValidate() {
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