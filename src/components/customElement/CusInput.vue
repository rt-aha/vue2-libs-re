<template>
  <div class="cus-input">
    <el-input
      class="cus-input__field"
      v-model="innerValue"
      @input="$emit('input', innerValue)"
      @blur="triggerValidate"
      :placeholder="inputConfig.placeholder"
      :type="$attrs.type || 'text'"
      :disabled="$attrs.disabled"
    />
    <!-- :class="{'err-status': errMsg !== ''}" -->
  </div>
</template>

<script>
export default {
  name: 'CusInput',
  // inject: ['errMsgText'],
  data() {
    return {
      default: {
        data: ''
      },
      innerValue: '',
      identification: 'cus-input',
      errMsgText: '123',
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    inputConfig: {
      type: Object,
      default() {
        return {
          defaultValue: '',
          placeholder: '請輸入'
        };
      }
    },
  },
  computed: {
    errMsg() {
      return this.errMsgText();
    },
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
  mounted() {
    console.log('this.$parent', this.$parent);
  },
  watch: {
    value: {
      handler: 'setValue',
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
