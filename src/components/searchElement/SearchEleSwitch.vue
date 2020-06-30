<template>
  <div>
    <el-switch
      v-model="innerValue"
      @change="handleSwitchChange"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchEleSwitch',
  data() {
    return {
      innerValue: '',
      errMsg: 'errMsg',
    };
  },
  props: {
    value: String,
  },
  methods: {
    handleSwitchChange(value) {
      console.log('handleSwitchChange...CusEleSwitch');
      this.$emit('handleSwitchChange', value);
    },
  },
  created() {
    // this.$on('handleValidate', this.handleValidate);
  },
};
</script>

<style lang="scss" scoped>
</style>
