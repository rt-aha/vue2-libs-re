<template>
  <div class="input-wrapper">
    <label class="input-label">{{ $attrs.label }}</label>
    <div class="input-err-wrapper">
      <slot></slot>
      <ErrMsg v-if="$attrs.ruleList"
              :errMsg="errMsg">
      </ErrMsg>
      <ErrMsg v-if="$attrs.ruleListWithMsg"
              :errMsg="errMsg"></ErrMsg>
    </div>
  </div>
</template>

<script>
import ErrMsg from '@/components/demoTplt/ErrMsg.vue';
import { validator } from '@/utils/validator';

export default {
  name: 'CusItemWrapper',
  components: {
    ErrMsg,
  },
  data() {
    return {
      errMsg: 'this is err msg',
      isPassValidate: false,
    };
  },
  props: {
    func: Function,
  },
  methods: {
    validateValue() {
      // 沒有驗證規則就返回
      const args = Array.from(arguments);

      if (typeof args === 'undefined' || args.length === 0) {
        throw new Error('參數至少應有一個驗證的值');
      }

      //  {規則, 規則參數, 錯誤提示},值, 標籤, 其他資訊
      const params = {
        ruleListAndErrMsg: this.$attrs.ruleListWithMsg,
        checkValue: args[0],
        label: this.$attrs.label,
        extraInfo: this.$attrs.extraInfo || {}
      };



      validator.add(params);

      const result = validator.start();



      if (result.isPass) {
        this.errMsg = '';
        this.isPassValidate = true;
      } else {
        this.errMsg = result.errInfo;
        this.isPassValidate = false;
      }
    },
    /**
     * args: 要驗證的值
     */
    execValidate(args) {
      this.validateValue.apply(null, args);
    },
    execFunc() {
      const result = this.func.apply(null);
      this.$emit('funcResult', result);
    },
    handleBlur(args) {
      // 驗證
      if (this.$attrs.ruleListWithMsg) {
        this.execValidate(args);
      }

      // 如果有傳入function
      if (this.func) {
        this.execFunc;
      }
    },
  },


  beforeMount() {
    this.$on('handleBlur', this.handleBlur);
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.input-err-wrapper {
  position: relative;
}
</style>
