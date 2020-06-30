<template>
  <div>
    <el-select
      v-model="innerValue"
      @input="$emit('input', innerValue);"
      @change="handleValidate"
      :placeholder="selectorConfig.placeholder"
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
  name: 'CusEleSelector',
  props: {
    value: {
      default: ''
    },
    selectorConfig: {
      type: Object,
      default() { return { placeholder: '請輸入', options: [] }; }
    }
  },
  data() {
    return {
      innerValue: '',
      errMsg: 'errMsg',
    };
  },
  methods: {
    handleValidate() {
      // 觸發驗證，把現在的值與實例透過mixin傳給wrapper處理
      this.dispatchEvent(this.$parent, 'handleBlur', this.innerValue);

    },

  },
  computed: {
    allOptions() {


      let defaultOptions = [
        {
          label: '請選擇',
          value: null,
          disabled: true,
        },
      ];

      if (this.selectorConfig.options) {
        defaultOptions = [...defaultOptions, ...this.selectorConfig.options];
      }

      return defaultOptions;
    }

  },
  created() {
    this.$on('handleValidate', this.handleValidate);
  }
}
</script>

<style lang="scss" scoped>
</style>