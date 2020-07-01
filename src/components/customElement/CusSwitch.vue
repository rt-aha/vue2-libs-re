<template>
  <div>
    <el-switch
      v-model="innerValue"
      @change="triggerValidate"
    />
  </div>
</template>

<script>
export default {
  name: 'CusSwitch',
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
        };
      }
    },
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