<template>
  <div class="input-wrapper">
    <label class="input-label">{{ $attrs.label }}</label>
    <div class="input-err-wrapper">
      <slot></slot>
      <ErrMsg v-if="$attrs.ruleList"
              :errMsg="errMsg"></ErrMsg>
    </div>
  </div>
</template>

<script>
import ErrMsg from '@/views/demoTplt/ErrMsg.vue';
import { Validator } from '@/utils/validator';

export default {
  name: 'TpltInputWrapper',
  components: {
    ErrMsg
  },
  data() {
    return {
      errMsg: 'this is err msg',
      isPassValidate: false,
    };
  },
  props: {
    func: Function
  },
  methods: {
    execValidate() {
      // 沒有驗證規則就返回
      const args = Array.from(arguments);

      if (typeof args === 'undefined' || args.length === 0) {
        throw new Error('參數至少應有一個驗證的值');
      }

      const validator = new Validator();
      const params = {
        value: args[0],
        inputName: this.$attrs.label,
        ruleList: this.$attrs.ruleList,
      };

      validator.add(params);

      const result = validator.start();

      if (result.errInfo !== '') {
        this.errMsg = result.errInfo;
        this.isPassValidate = false;
      } else {
        this.errMsg = '';
        this.isPassValidate = true;
      }
    },
    handleBlur(args) {

      console.log(args);
      // 驗證
      if (this.$attrs.ruleList) {
        this.execValidate.apply(null, args);
      }

      if (this.func) {
        const execResult = this.func.apply(null, args);
        this.$emit('funcResult', execResult);
      }
    }
  },
  beforeMount() {
    this.$on('handleBlur', this.handleBlur);
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.input-err-wrapper {
  position: relative;
}
</style>
