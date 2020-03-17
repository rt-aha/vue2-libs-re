<template>
  <div>
    <el-switch v-model="innerValue"
               @change="handleChange"
               active-color="#3CB371"
               inactive-color="#CD5C5C" />

  </div>
</template>

<script>



export default {
  name: 'CusEleSwitch',
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
    handleChange() {
      console.log('handleChange- CusEleSwitch');
    }
    // handleValidate() {
    //   // 觸發驗證，把現在的值與實例透過mixin傳給wrapper處理
    //   this.dispatchEvent(this.$parent, 'handleBlur', this.innerValue);
    // }
  },
  created() {
    // this.$on('handleValidate', this.handleValidate);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>